import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, getDocs, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import AppIcon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const CommunityChat = () => {
  const [user] = useAuthState(auth);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const [showPopupMenu, setShowPopupMenu] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedMessageSenderId, setSelectedMessageSenderId] = useState(null);
  const [allUsers, setAllUsers] = useState({}); // To store user profiles by UID

  useEffect(() => {
    if (!user) return;

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

    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user) return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      senderId: user.uid,
      senderName: user.displayName || user.email, // Use displayName, fallback to email
      timestamp: serverTimestamp(),
    });

    setNewMessage('');
  };

  const handleMessageClick = (e, senderId) => {
    if (senderId === user?.uid) {
      console.log("Clicked on your own message, not showing popup.");
      return;
    }

    e.stopPropagation(); // Prevent the popup from being hidden immediately by the document click listener

    console.log("Message clicked. Sender ID:", senderId);
    setSelectedMessageSenderId(senderId);
    setPopupPosition({ x: e.clientX, y: e.clientY });
    setShowPopupMenu(true);
  };

  const handlePersonalMessage = async (targetSenderId) => {
    console.log("Attempting to message personally. Selected Sender ID:", targetSenderId);
    if (!user || !targetSenderId) {
      console.log("Cannot message personally: user or selectedMessageSenderId is missing.", { user, targetSenderId });
      return;
    }

    try {
      const participants = [user.uid, targetSenderId].sort();
      console.log("Participants for private chat:", participants);
      const existingChatQuery = query(
        collection(db, 'chats'),
        where('participants', '==', participants)
      );

      const querySnapshot = await getDocs(existingChatQuery);
      console.log("Existing chat query snapshot:", querySnapshot.empty ? "No existing chat." : querySnapshot.docs[0].id);

      let chatId;
      if (!querySnapshot.empty) {
        chatId = querySnapshot.docs[0].id;
      } else {
        console.log("Creating new chat...");
        const newChatRef = await addDoc(collection(db, 'chats'), {
          participants: participants,
          createdAt: serverTimestamp(),
          lastMessageAt: serverTimestamp(),
          lastMessageText: '',
        });
        chatId = newChatRef.id;
        console.log("New chat created with ID:", chatId);
      }

      setShowPopupMenu(false);
      console.log("Navigating to private chat:", `/dashboard/private-chat/${chatId}`);
      navigate(`/dashboard/private-chat/${chatId}`);
    } catch (error) {
      console.error("Error in handlePersonalMessage:", error);
      alert("Could not start private chat: " + error.message);
    }
  };

  const handleViewProfile = (targetSenderId) => {
    console.log("Attempting to view profile. Selected Sender ID:", targetSenderId);
    if (!targetSenderId) {
      console.log("Cannot view profile: selectedMessageSenderId is missing.");
      return;
    }
    setShowPopupMenu(false);
    console.log("Navigating to user profile:", `/dashboard/user-profile/${targetSenderId}`);
    navigate(`/dashboard/user-profile/${targetSenderId}`);
  };

  // Close popup menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showPopupMenu) {
        console.log("Click outside detected, closing popup.");
        setShowPopupMenu(false);
      }
    };
    if (showPopupMenu) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPopupMenu]);


  return (
    <div className="flex flex-col h-full bg-background text-foreground relative"> {/* Added relative for popup positioning */}
      {/* Remove the header as DashboardPage will provide the layout */}
      {/*
      <header className="bg-card p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <AppIcon name="ArrowLeft" size={20} />
          </Button>
          <h1 className="text-xl font-bold">Community Chat</h1>
        </div>
        {user && (
          <div className="text-sm text-muted-foreground">
            Logged in as: <span className="font-medium">{user.displayName || user.email}</span>
          </div>
        )}
      </header>
      */}

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const senderProfile = allUsers[msg.senderId];
          const senderDisplayName = senderProfile?.displayName || senderProfile?.email || msg.senderName || 'Unknown User';
          return (
          <div
            key={msg.id}
            className={`relative flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}
            onClick={(e) => handleMessageClick(e, msg.senderId)} // Added onClick
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
            className=""
            disabled={!user}
          />
          <Button type="submit" disabled={!user || newMessage.trim() === ''}>
            <AppIcon name="Send" className="mr-2" />
            Send
          </Button>
        </form>
      </footer>

      {showPopupMenu && (
        <div
          className="absolute bg-card border border-border rounded-md shadow-lg p-2 z-50"
          style={{ top: popupPosition.y, left: popupPosition.x }}
          onMouseDown={(e) => e.stopPropagation()} // Prevent closing when clicking inside popup
        >
          <Button variant="ghost" className="w-full justify-start" onClick={() => handlePersonalMessage(selectedMessageSenderId)}>
            Message Personally
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => handleViewProfile(selectedMessageSenderId)}>
            View Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommunityChat;
