import React, { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { Button } from './ui/button';
import { Bot, MessageCircle, User, Clock } from 'lucide-react';

const RealTimeChat = ({ 
  productName, 
  phoneNumber,
  salesmanId,
  messages,
  onSendPendingMessage, // Changed from onSendMessage to match your existing function
  onNewMessage  // Add this prop
}) => {
  const [lastReadMessage, setLastReadMessage] = useState(0);
  const messagesEndRef = useRef(null);
  const messageObserver = useRef(null);

  const WS_URL = `wss://${window.location.host}/ws/${salesmanId}/${productName}`;
  console.log('Attempting WebSocket connection to:', WS_URL);
  
  const { sendMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established', {
        url: WS_URL,
        salesmanId,
        productName
      });
      sendReadStatus(lastReadMessage);
    },
    onError: (error) => {
      console.error('WebSocket connection error:', error);
    },
    onClose: (event) => {
      console.log('WebSocket connection closed:', event);
    },
    onMessage: (event) => {
      console.log('WebSocket message received:', JSON.parse(event.data));
      const update = JSON.parse(event.data);
      onNewMessage(update);  // Call the parent's handler
      handleNewMessage(update);
    },
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000
  });

  useEffect(() => {
    // Set up Intersection Observer for read tracking
    messageObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageNumber = parseInt(entry.target.dataset.messageNumber);
            updateReadStatus(messageNumber);
          }
        });
      },
      { threshold: 0.5 }
    );

    return () => {
      if (messageObserver.current) {
        messageObserver.current.disconnect();
      }
    };
  }, [productName, phoneNumber]);

  useEffect(() => {
    // Observe new messages
    const elements = document.querySelectorAll('[data-message-number]');
    elements.forEach((element) => {
      if (messageObserver.current) {
        messageObserver.current.observe(element);
      }
    });
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageIcon = (source, type) => {
    if (type === 'audio') return <Clock size={16} className="ml-2 mt-1 flex-shrink-0 text-gray-300" />;
    if (source === 'ai') return <Bot size={16} className="ml-2 mt-1 flex-shrink-0 text-gray-300" />;
    if (source === 'template') return <MessageCircle size={16} className="ml-2 mt-1 flex-shrink-0 text-gray-300" />;
    return null;
  };

  const handleNewMessage = (update) => {
    // This will be handled by your existing message state management
    // Just need to handle read status
    updateReadStatus(update.message_number);
  };

  const updateReadStatus = (messageNumber) => {
    if (messageNumber > lastReadMessage) {
      setLastReadMessage(messageNumber);
      sendReadStatus(messageNumber);
    }
  };

  const sendReadStatus = (messageNumber = lastReadMessage) => {
    const update = {
      user_id: parseInt(phoneNumber),
      product_name: productName,       // Send productName instead of to_phone_number
      last_read_message_number: messageNumber,
      salesman_id: salesmanId
    };
    sendMessage(JSON.stringify(update));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-grow p-6 overflow-y-auto">
      {messages.length === 0 ? (
        <p className="text-gray-400">No messages yet.</p>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            data-message-number={msg.message_number}
            className={`mb-4 flex ${msg.source === 'lead' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[70%] ${msg.source === 'lead' ? 'order-1' : 'order-2'}`}>
              <div className={`inline-block p-2 rounded-lg ${
                msg.source === 'lead' ? 'bg-gray-700 text-white' : 'bg-purple-600 text-white'
              }`}>
                <div className="flex flex-wrap items-start">
                  <span className="break-words">{msg.message_content || 'No content'}</span>
                  {getMessageIcon(msg.source, msg.message_type)}
                </div>
              </div>
              <div className={`flex justify-between items-center mt-1 ${
                msg.source === 'lead' ? 'flex-row' : 'flex-row-reverse'
              }`}>
                <p className="text-xs text-gray-400">
                  {`${msg.source.charAt(0).toUpperCase() + msg.source.slice(1)} | ${msg.message_type.charAt(0).toUpperCase() + msg.message_type.slice(1)}`}
                </p>
                <p className="text-xs text-gray-400">{formatTimestamp(msg.timestamp)}</p>
              </div>
              {msg.message_status === 'sending' && (
                <Button 
                  onClick={() => onSendPendingMessage(msg.id, msg.message_content)}
                  className="mt-2 text-xs bg-green-500 hover:bg-green-600"
                >
                  Send Now
                </Button>
              )}
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default RealTimeChat;