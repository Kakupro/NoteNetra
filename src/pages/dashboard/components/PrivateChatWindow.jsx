import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../../../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import AppIcon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

const PrivateChatWindow = () => {
  const { chatId } = useParams(); // Get chat ID from URL parameters
  const [user] = useAuthState(auth);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [allUsers, setAllUsers] = useState({}); // To store user profiles by UID

  useEffect(() => {
    if (!user || !chatId) return;

    // Fetch all users once to map UIDs to display names
    const fetchAllUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = {};
      usersSnapshot.forEach(doc => {
        usersData[doc.id] = doc.data();
      });
      setAllUsers(usersData);
    };
    fetchAllUsers();

    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe();
  }, [user, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user || !chatId) return;

    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      text: newMessage,
      senderId: user.uid,
      senderName: user.displayName || user.email, // Use displayName, fallback to email
      timestamp: serverTimestamp(),
    });

    // Update parent chat document with last message info
    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
      lastMessageAt: serverTimestamp(),
      lastMessageText: newMessage,
    });

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <header className="bg-card p-4 border-b border-border flex items-center justify-between">
        <h1 className="text-xl font-bold">Private Chat</h1>
        {/* You might want to display the other participant's name/email here */}
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const senderProfile = allUsers[msg.senderId];
          const senderDisplayName = senderProfile?.displayName || senderProfile?.email || msg.senderName || 'Unknown User';
          return (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs p-3 rounded-lg ${msg.senderId === user?.uid ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              <p className="font-medium text-sm">{senderDisplayName}</p> {/* Display senderDisplayName */}
              <p className="text-base">{msg.text}</p>
              <span className="text-xs opacity-75 block mt-1">
                {msg.timestamp?.toDate().toLocaleString()}
              </span>
            </div>
          </div>
        )})}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-card p-4 border-t border-border">
        <form onSubmit={sendMessage} className="flex space-x-2 items-end">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            disabled={!user || !chatId}
          />
          <Button type="submit" disabled={!user || !chatId || newMessage.trim() === ''}>
            <AppIcon name="Send" className="mr-2" />
            Send
          </Button>
        </form>
      </footer>
    </div>
  );
};

export default PrivateChatWindow;
