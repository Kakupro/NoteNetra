import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../firebase';
import { collection, query, where, onSnapshot, getDocs, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card'; // Corrected import path and named import
import Button from '../../../components/ui/Button'; // Corrected import path and default import
import Input from '../../../components/ui/Input'; // Corrected import path and default import
import AppIcon from '../../../components/AppIcon';
import { serverTimestamp } from 'firebase/firestore';

const PrivateChatList = () => {
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Fetch all users to enable starting new chats
    const usersQuery = query(collection(db, 'users'));
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).filter(u => u.id !== user.uid)); // Filter out the current user
    });

    // Fetch existing private chats for the current user
    const chatsQuery = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', user.uid)
    );
    const unsubscribeChats = onSnapshot(chatsQuery, (snapshot) => {
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => {
      unsubscribeUsers();
      unsubscribeChats();
    };
  }, [user]);

  const handleStartChat = async (targetUserId) => {
    if (!user) return;

    const participants = [user.uid, targetUserId].sort(); // Ensure consistent order
    const existingChatQuery = query(
      collection(db, 'chats'),
      where('participants', '==', participants)
    );

    const querySnapshot = await getDocs(existingChatQuery);

    let chatId;
    if (!querySnapshot.empty) {
      chatId = querySnapshot.docs[0].id;
    } else {
      // Create a new chat
      const newChatRef = await addDoc(collection(db, 'chats'), {
        participants: participants,
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(), // Initialize with creation time
        lastMessageText: '',
      });
      chatId = newChatRef.id;
    }

    navigate(`/dashboard/private-chat/${chatId}`);
  };

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.displayName && u.displayName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="text-2xl font-bold mb-4">Private Messages</h2>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search users by email or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u) => (
            <Card key={u.id} className="p-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{u.displayName || u.email}</p>
                <p className="text-sm text-muted-foreground">{u.email}</p> {/* Keep email for clarity here */}
              </div>
              <Button onClick={() => handleStartChat(u.id)}>Chat</Button>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No users found or no existing chats.</p>
        )}

        {chats.length > 0 && (
          <>
            <h3 className="text-xl font-bold mt-6 mb-3">Your Chats</h3>
            {chats.map((chat) => {
              const otherParticipantId = chat.participants.find(pId => pId !== user.uid);
              const otherParticipant = users.find(u => u.id === otherParticipantId);
              return (
                <Card key={chat.id} className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{otherParticipant?.displayName || otherParticipant?.email || 'Unknown User'}</p>
                    <p className="text-sm text-muted-foreground">Last message: {chat.lastMessageText || 'No messages yet'}</p> {/* Use lastMessageText, which stores senderName */}
                  </div>
                  <Button onClick={() => handleStartChat(chat.id)}>Open Chat</Button> {/* This will open the existing chat */}
                </Card>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default PrivateChatList;
