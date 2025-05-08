import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';

import {
  getDatabase,
  ref,
  set,
  get,
  update,
  onChildAdded,
  onChildChanged,
  push,
  onValue,
  off,
} from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ChatBot.css';
import { Bot, Send, X } from 'lucide-react';

interface Message {
  id?: string;
  text: string;
  userId: string;
  userName: string;
  timestamp: number;
  sent: boolean;
  delivered: boolean;
  read: boolean;
}

interface ChatMessageProps {
  message: Message;
  isOutgoing: boolean;
}

const firebaseConfig = {
  apiKey: "AIzaSyCm4Qo5meFtFkln30MKcWe14nW8xomYM1Q",
  authDomain: "chatsdk-fc270.firebaseapp.com",
  databaseURL: "https://chatsdk-fc270-default-rtdb.firebaseio.com",
  projectId: "chatsdk-fc270",
  storageBucket: "chatsdk-fc270.appspot.com",
  messagingSenderId: "433350862938",
  appId: "1:433350862938:web:b6d64372ac7736b21c1063",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

interface SignInFormProps {
  onSubmit: (phoneNumber: string, password: string) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const password = "Abc123@@"; // Default password for all users

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.match(/^\d{11}$/)) {
      setError('Please enter a valid 11-digit phone number');
      return;
    }
    onSubmit(phoneNumber, password);
  };

  return (
    <div className="signin-form">
      <h3>Enter your phone number to chat</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setError('');
          }}
          placeholder="Enter 11 digit phone number"
          maxLength={11}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Start Chat</button>
      </form>
    </div>
  );
};

const ChatBot: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');
  const [adminUid, setAdminUid] = useState<string>('');
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  
  const chatboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const getAdminUid = async () => {
      const adminPhoneNumber = "03333279656";
      try {
        const adminUid = await getUidByPhoneNumber(adminPhoneNumber);
        setAdminUid(adminUid || '');
      } catch (error) {
        console.error("Error fetching admin UID:", error);
      }
    };

    getAdminUid();
  }, []);

  const getUidByPhoneNumber = async (phoneNumber: string): Promise<string | null> => {
    try {
      const userRef = ref(database, `users/${phoneNumber}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        return snapshot.val().uid;
      }
      return null;
    } catch (error) {
      console.error("Error fetching UID:", error);
      return null;
    }
  };

  const createChatId = (userId1: string, userId2: string): string => {
    return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
  };

  const createChat = async (currentUserId: string, targetUserId: string): Promise<string> => {
    const chatId = createChatId(currentUserId, targetUserId);
    const chatRef = ref(database, `chats/${chatId}`);
    const snapshot = await get(chatRef);

    if (!snapshot.exists()) {
      const participants = [
        { userId: currentUserId, isTyping: false },
        { userId: targetUserId, isTyping: false },
      ];

      await set(chatRef, {
        participants,
        messages: [],
      });

      const userChatsUpdate = {
        lastMessage: "",
        timestamp: Date.now(),
        participants,
      };

      await Promise.all([
        update(ref(database, `userChats/${currentUserId}/${chatId}`), userChatsUpdate),
        update(ref(database, `userChats/${targetUserId}/${chatId}`), userChatsUpdate),
      ]);
    }

    setupChatListeners(chatId);
    return chatId;
  };

  const setupChatListeners = (chatId: string) => {
    const messagesRef = ref(database, `chats/${chatId}/messages`);
    
    onChildAdded(messagesRef, (snapshot) => {
      const newMessage = formatMessage(snapshot);
      if (newMessage) {
        setMessages(prev => [...prev, newMessage]);
        if (newMessage.userId !== auth.currentUser?.uid) {
          handleIncomingMessage(newMessage);
        }
      }
    });

    onChildChanged(messagesRef, (snapshot) => {
      const updatedMessage = formatMessage(snapshot);
      if (updatedMessage) {
        setMessages(prev => 
          prev.map(msg => msg.id === updatedMessage.id ? updatedMessage : msg)
        );
      }
    });
  };

  const formatMessage = (snapshot: any): Message | null => {
    const message = snapshot.val();
    if (!message) return null;

    return {
      id: snapshot.key,
      text: message.text,
      userId: message.userId,
      userName: message.userName,
      timestamp: message.timestamp,
      sent: message.sent,
      delivered: message.delivered || false,
      read: message.read || false,
    };
  };

  const handleIncomingMessage = (message: Message) => {
    if (!showChat) {
      setUnreadCount(prev => prev + 1);
      playNotificationSound();
    }
    if (!message.delivered) {
      sendDeliveryReceipt(chatId, message.id!);
    }
  };

  const playNotificationSound = () => {
    const sound = new Audio("/assets/chatbot-notification.mp3");
    sound.play().catch(error => console.error("Error playing sound:", error));
  };

  const sendDeliveryReceipt = async (chatId: string, messageId: string) => {
    try {
      await update(ref(database, `chats/${chatId}/messages/${messageId}`), {
        delivered: true,
      });
    } catch (error) {
      console.error("Error sending delivery receipt:", error);
    }
  };

  const sendReadReceipt = async (chatId: string, messageId: string) => {
    try {
      await update(ref(database, `chats/${chatId}/messages/${messageId}`), {
        read: true,
      });
    } catch (error) {
      console.error("Error sending read receipt:", error);
    }
  };

  const addUserToDatabase = async (user: any, phoneNumber: string) => {
    const { uid, displayName, email, photoURL } = user;
    const userRef = ref(database, `users/${phoneNumber}`);
    try {
      await set(userRef, {
        username: displayName || "Anonymous",
        email: email || "",
        profilePicture: photoURL || "",
        status: "online",
        lastSeen: null,
        uid,
        pushToken: null,
      });
    } catch (error) {
      console.error("Error adding user to database:", error);
    }
  };

  const handleSignup = async (phoneNumber: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        `${phoneNumber}@example.com`,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: phoneNumber });
      await addUserToDatabase(user, phoneNumber);
      setIsSignedIn(true);
      const newChatId = await createChat(user.uid, adminUid);
      setChatId(newChatId);
      toast.success("Signup successful!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSignIn = async (phoneNumber: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        `${phoneNumber}@example.com`,
        password
      );
      setIsSignedIn(true);
      const newChatId = await createChat(userCredential.user.uid, adminUid);
      setChatId(newChatId);
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || !auth.currentUser) return;

    const messageData = {
      text,
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName,
      timestamp: Date.now(),
      sent: true,
      delivered: false,
      read: false,
    };

    try {
      await push(ref(database, `chats/${chatId}/messages`), messageData);
      setUserMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    sendTypingStatus(true);

    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStatus(false);
    }, 2000);
  };

  const sendTypingStatus = async (isTyping: boolean) => {
    if (!auth.currentUser || !chatId) return;

    try {
      const participantsRef = ref(database, `chats/${chatId}/participants`);
      const snapshot = await get(participantsRef);
      
      if (snapshot.exists()) {
        const participants = snapshot.val();
        const updatedParticipants = participants.map((p: any) => ({
          ...p,
          isTyping: p.userId === auth.currentUser?.uid ? isTyping : p.isTyping
        }));
        
        await set(participantsRef, updatedParticipants);
      }
    } catch (error) {
      console.error("Error updating typing status:", error);
    }
  };

  const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOutgoing }) => (
    <div className={`chat-message ${isOutgoing ? 'outgoing' : 'incoming'}`}>
      <div className="message-content">
        <p>{message.text}</p>
        {isOutgoing && (
          <span className="status">
            {message.read ? '✓✓' : message.delivered ? '✓✓' : '✓'}
          </span>
        )}
        <span className="timestamp">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );

  useEffect(() => {
    if (showChat) {
      setUnreadCount(0);
      messages.forEach(msg => {
        if (!msg.read && msg.userId !== auth.currentUser?.uid) {
          sendReadReceipt(chatId, msg.id!);
        }
      });
    }
  }, [showChat, messages]);
  const [showSignInForm, setShowSignInForm] = useState<boolean>(true);

  const handleUserAuth = async (phoneNumber: string, password: string) => {
    try {
      const existingUid = await getUidByPhoneNumber(phoneNumber);
      if (existingUid) {
        await handleSignIn(phoneNumber, password);
      } else {
        await handleSignup(phoneNumber, password);
      }
      setShowSignInForm(false);
      setIsSignedIn(true);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };
  useEffect(() => {
    return () => {
      if (chatId) {
        const messagesRef = ref(database, `chats/${chatId}/messages`);
        off(messagesRef);
      }
    };
  }, [chatId]);

  return (
    <div className={`chatbot-container ${showChat ? 'show' : ''}`}>
      <button 
        className="chatbot-toggler"
        onClick={() => setShowChat(!showChat)}
      >
        <span className="material-symbols-outlined">
          {showChat ? <X className='text-white'/> : <Bot className='text-white'/>}
        </span>
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>

      <div className="chatbot">
        <header>
          <h2>Chatbot</h2>
          {isTyping && <div className="typing-indicator">Typing...</div>}
        </header>

        <div className="chatbox" ref={chatboxRef}>
          {!isSignedIn && showSignInForm ? (
            <SignInForm onSubmit={handleUserAuth} />
          ) : (
            messages.map((msg, index) => (
              <ChatMessage
                key={msg.id || index}
                message={msg}
                isOutgoing={msg.userId === auth.currentUser?.uid}
              />
            ))
          )}
        </div>

        <div className="chat-input items-center">
          <textarea
            ref={inputRef}
            rows={1}
            value={userMessage}
            onChange={(e) => {
              setUserMessage(e.target.value);
              handleTyping();
            }}
            placeholder={isSignedIn ? "Enter a message..." : "Please sign in to chat"}
            disabled={!isSignedIn}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(userMessage);
              }
            }}
          />
          {/* <button 
            onClick={() => sendMessage(userMessage)}
            disabled={!isSignedIn || !userMessage.trim()}
          >
            <span className="material-symbols-outlined"><Send/></span>
          </button> */}
        </div>
      </div>
    </div>
  );

};

export default ChatBot;