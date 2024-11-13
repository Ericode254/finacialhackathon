"use client"
import React, { useState } from 'react';
import './thinking.css'; 
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined';
import Box from '@mui/material/Box';
import ChatMessages from '../../components/ChatMessage';
import ChatInput from '../../components/ChatInput';
import axios from 'axios';

const suggestions = [
  "What's the latest news?",
  "Tell me a joke.",
  "How can I invest wisely?",
  "What are some good books to read?",
];

const Chat = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function submitNewMessage() {
    if (!newMessage.trim()) return; // Don't send if message is empty
    setIsLoading(true);
    setMessages(prevMessages => [...prevMessages, { role: 'user', content: newMessage }]);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/chat/send_chat/",
        { message: newMessage },
        {
          headers: {
            Authorization: `Token a01f62ad50e3b6396af09169b66ec073162a8bb6`,
            'Content-Type': 'application/json',
          },
        }
      );

      const assistantReply = response.data.response;
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: assistantReply }]);
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: "Error: Unable to get a response from the server." }]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setNewMessage(suggestion);
  };

  const LoadingDots = () => (
    <div className="loading-dots">
      <div className="dot blue"></div>
      <div className="dot green"></div>
      <div className="dot blue"></div>
      <div className="dot green"></div>
    </div>
  );

  return (
    <div className='h-screen flex bg-slate-600'>
      <aside className='sidebar'>
        <h3>Suggestions</h3>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              <button onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className='chat-container'>
        <div className='align-center'>
          <AssistantOutlinedIcon />
          <Box component="section" sx={{ p: 2 }}>
            <h1> Welcome to Finac.AI</h1>
          </Box>
          <h2>Your AI Chat Assistant</h2>
          <div>
            {messages.length === 0 && (
              <div>{/* Chatbot welcome message */}</div>
            )}
            <ChatMessages messages={messages} isLoading={isLoading} />
            
            {isLoading && <LoadingDots />}
            
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              isLoading={isLoading}
              submitNewMessage={submitNewMessage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
