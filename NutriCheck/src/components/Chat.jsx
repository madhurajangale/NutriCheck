import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import '../styles/chat.css';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import SendIcon from '@mui/icons-material/Send';

const socket = io('http://localhost:5001'); 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [productName, setProductName] = useState('');
  const [review, setReview] = useState('');
  const[message,setMessage]=useState('');
  const [username, setUsername] = useState('');
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null); 

  useEffect(() => {
    if (window.location.pathname === '/adminhome/chat') {
      setUsername('Admin');
    } else {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/user/profile/${user}`);
          if (response.status === 200) {
            setUsername(response.data.data.username);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    fetch('http://localhost:5001/messages')
      .then(res => res.json())
      .then(data => setMessages(data));

    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    if (!username || !input || !productName || !review) return;
    const message = { 
      username, 
      text: input, 
      product_name: productName,
      review: review,
      timestamp: new Date().toISOString() 
    };
    setMessages(prevMessages => [...prevMessages, message]);
    fetch('http://localhost:5001/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    }).catch(error => console.error("Error:", error));
    setInput('');
    setProductName('');
    setReview('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1 style={{ fontSize: '20px', color: 'rgb(6 79 86)' }}>NutriCheck Community Chat</h1>
      </div>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.username === 'Admin' ? 'admin-message' : msg.username === username ? 'my-message' : 'other-message'
            }`}
          >
            <div className="message-box">
              <strong>{msg.username}:</strong> {msg.text}
              <div><strong>Product Name:</strong> {msg.product_name}</div>
              <div><strong>Review:</strong> {msg.review}</div>
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="product-name-input"
          />
          <textarea
            placeholder="Enter review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="review-input"
          ></textarea>
          <input
            type="text"
            placeholder="Enter your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="message-input"
          />
          <button onClick={sendMessage} className="send-button"><SendIcon /></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
