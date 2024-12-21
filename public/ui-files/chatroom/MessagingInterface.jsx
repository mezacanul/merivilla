import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import LSMSideTab from './LSMSideTab';
import RealTimeChat from './RealTimeChat';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import WhatsappTemplateMessage from './whatsappTemplateRelated/WhatsappTemplateMessage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Send, Clock, Bot, ChevronLeft, ChevronRight, Phone, FileText, X, Info, MessageSquare } from 'lucide-react';





// Status Indicator stays outside the main component as it's a pure presentational component
const StatusIndicator = ({ status, className = "", onClick }) => {
  if (status === 'None') return null;
  
  const colorMap = {
    'Review': 'bg-orange-500',
    'Anomaly': 'bg-red-500',
    'Booked': 'bg-purple-500'
  };

  return (
    <div 
      className={`w-2 h-2 rounded-full ${colorMap[status]} ${className} cursor-pointer`} 
      onClick={onClick}
    />
  );
};

const MessagingInterface = () => {
  // 1. Hooks and state declarations
  const navigate = useNavigate(); 
  const location = useLocation();

  // State declarations grouped by related functionality
  // Basic state
  const [productName, setProductName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState(null);

  // UI state
  const [inputMessage, setInputMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showSideTab, setShowSideTab] = useState(true);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [activeButtons, setActiveButtons] = useState({
    call: false,
    notes: false,
    optOut: false,
    info: false
  });

  // Message and thread state
  const [messages, setMessages] = useState([]);
  const [threadStatus, setThreadStatus] = useState('None');
  const [leadName, setLeadName] = useState('');
  const [productDetails, setProductDetails] = useState(null);

  // Metrics state
  const [interest, setInterest] = useState(0);
  const [stage, setStage] = useState(1);
  const [lead_origin, setLeadOrigin] = useState('Other');

  // 2. Memoized values
  const calculateThreadStatus = useMemo(() => {
    const statuses = messages.map(msg => msg.status_details);
    if (statuses.includes('Anomaly')) return 'Anomaly';
    if (statuses.includes('Review')) return 'Review';
    if (statuses.includes('Booked')) return 'Booked';
    return 'None';
  }, [messages]);

  // 3. Callback functions
  const handleNewMessage = useCallback((newMessage) => {
    setMessages(prevMessages => {
      const exists = prevMessages.some(msg => 
        msg.message_number === newMessage.message_number && 
        msg.user_id.toString() === newMessage.user_id.toString()
      );

      if (!exists) {
        return [...prevMessages, {
          id: Date.now(),
          user_id: parseInt(phoneNumber),
          message_number: newMessage.message_number,
          message_content: newMessage.message_content,
          timestamp: newMessage.timestamp,
          message_status: newMessage.status,
          message_type: newMessage.message_type,
          source: newMessage.source,
          status_details: newMessage.status_details,
          to_phone_number: productName
        }].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      }
      return prevMessages;
    });
  }, [phoneNumber, productName]);

  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim() || !isConfigured) return;
  
    // Declare tempMessage outside try block so it's accessible in catch block
    const tempMessage = {
      id: Date.now(),
      user_id: parseInt(phoneNumber),
      message_content: inputMessage,
      timestamp: new Date().toISOString(),
      message_status: 'sent',
      message_type: 'text',
      source: 'salesman',
      to_phone_number: productName
    };
  
    try {
      // Add message to UI immediately
      setMessages(prev => [...prev, tempMessage]);
      
      // Clear input right away for better UX
      const messageToSend = inputMessage;
      setInputMessage('');
  
      const response = await fetch('/api/messaging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          productName, 
          phoneNumber, 
          content: messageToSend,
          status_details: 'None',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
      // Now tempMessage is accessible here
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id 
          ? { ...msg, message_status: 'failed' }
          : msg
      ));
    }
  }, [inputMessage, isConfigured, phoneNumber, productName]);

  const fetchProductDetails = useCallback(async () => {
    if (!productName) return;
    try {
      const url = `/api/product-details?productName=${productName}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch product details');
      const data = await response.json();
      setProductDetails(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError('Failed to fetch product details');
    }
  }, [productName]);

  const fetchMessages = useCallback(async () => {
    if (!productName || !phoneNumber) return;
    try {
      const url = `/api/messaging?productName=${productName}&phoneNumber=${phoneNumber}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      if (data.status === 'success') {
        const receivedMessages = data.data.messages.map(msg => ({
          ...msg, 
          status: msg.status_details || 'None'
        }));
        setMessages(receivedMessages);
        if (receivedMessages.length > 0 && receivedMessages[0].name) {
          setLeadName(receivedMessages[0].name);
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages');
    }
  }, [productName, phoneNumber]);

  const fetchMetricsData = useCallback(async () => {
    if (!productName || !phoneNumber) return;
    try {
      const response = await fetch(`/api/metrics?productName=${productName}&phoneNumber=${phoneNumber}`);
      if (!response.ok) throw new Error('Failed to fetch metrics data');
      const data = await response.json();
      setInterest(data.current_interest);
      setStage(data.current_stage);
      setLeadOrigin(data.lead_origin || 'Other');
    } catch (error) {
      console.error('Error fetching metrics:', error);
      setError('Failed to fetch metrics');
    }
  }, [productName, phoneNumber]);

  const handleSendPendingMessage = useCallback(async (messageId, content) => {
    try {
      const response = await fetch('/api/send-pending-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messageId,
          productName, 
          phoneNumber, 
          content 
        }),
      });

      if (!response.ok) throw new Error('Failed to send pending message');
      await fetchMessages();
    } catch (error) {
      console.error('Error sending pending message:', error);
      setError('Failed to send pending message');
    }
  }, [productName, phoneNumber, fetchMessages]);

  // const getMessageIcon = useCallback((sender, type) => {
  //   if (type === 'audio') return <Mic size={16} className="ml-2 mt-1 flex-shrink-0 text-gray-300" />;
  //   if (sender === 'ai') return <Bot size={16} className="ml-2 mt-1 flex-shrink-0 text-gray-300" />;
  //   if (sender === 'template') return <Coins size={16} className="ml-2 mt-1 flex-shrink-0 text-gray-300" />;
  //   return null;
  // }, []); // No dependencies needed as it doesn't use any external values

  useEffect(() => {
    if (location.state && location.state.productName && location.state.phoneNumber) {
      console.log("Configuring with:", location.state, {
        productName: location.state.productName,
        leadPhoneNumber: location.state.phoneNumber
      });
      
      setProductName(location.state.productName);
      setPhoneNumber(location.state.phoneNumber);
      setIsConfigured(true); // Add this to automatically configure
    }
  }, [location]);

  useEffect(() => {
    if (isConfigured) {
      Promise.all([
        fetchMessages(),
        fetchProductDetails(),
        fetchMetricsData()
      ]);
    }
  }, [isConfigured, fetchMessages, fetchProductDetails, fetchMetricsData]);

  useEffect(() => {
    setThreadStatus(calculateThreadStatus);
  }, [calculateThreadStatus]);

  // 5. Render logic/return statement follows after all the hooks
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }


  
  const handleConfigSubmit = (e) => {
    e.preventDefault();
    if (productName && phoneNumber) {
      setIsConfigured(true);
      //setIsAutoConfigured(false);
      fetchProductDetails();
      fetchMessages();
    }
  };
 
  const handleInputClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };


  // New function to handle status click
  const handleStatusClick = (id) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === id ? { ...msg, status_details: 'None' } : msg
      )
    );
  };
  // New function to toggle action buttons
  const toggleButton = (button) => {
    setActiveButtons(prev => ({ ...prev, [button]: !prev[button] }));
  };
  // New function to get button class based on active state
  const getButtonClass = (button) => {
    const baseClass = "w-8 h-8 rounded-full transition-colors duration-200 flex items-center justify-center ";
    if ((button === 'call' || button === 'optOut') && activeButtons[button]) {
      return baseClass + "bg-red-600 hover:bg-red-700";
    } else if ((button === 'notes' || button === 'info') && activeButtons[button]) {
      return baseClass + "bg-purple-600 hover:bg-purple-700";
    } else {
      return baseClass + "bg-gray-700 hover:bg-gray-600";
    }
  };












  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!isConfigured) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <form onSubmit={handleConfigSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Configure Messaging</h2>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="productName">Product Name</label>
            <Select value={productName} onValueChange={(value) => setProductName(value)}>
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white z-50">
                <SelectItem value="product1">Product 1</SelectItem>
                <SelectItem value="product2">Product 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="phoneNumber">Phone Number</label>
            <Input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-gray-700 border-gray-600 text-white"
              placeholder="Enter phone number"
            />
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Start Messaging
          </Button>
        </form>
      </div>
    );
  }

  return (
      <div className="relative flex h-screen max-w-7xl mx-auto bg-gradient-to-b from-purple-900 to-black shadow-lg">
        {/* LSM Side Tab */}
        {showSideTab && (
          <LSMSideTab 
            interest={interest}
            stage={stage}
            lead_origin={lead_origin}
            phoneNumber={phoneNumber}
            productName={productName}
          />
        )}

      {/* Main Content */}
      <div className={`flex-grow flex flex-col transition-all duration-300 ${showSideTab ? 'ml-72' : 'ml-0'}`}>
        {/* Header */}
        <div className="bg-gray-800 p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-white mr-2">{leadName}</h2>
                <StatusIndicator status={threadStatus} className="ml-2" />
              </div>
              <p className="text-sm text-gray-400">Product: {productName}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-purple-400">{productName}</p>
              {productDetails && productDetails.data && (
                <p className="text-sm text-gray-400">
                  Created: {new Date(productDetails.data.createdAt).toLocaleDateString()}
                </p>
              )}
              <div className="flex space-x-2 mt-2">
                <button className={getButtonClass('call')} onClick={() => toggleButton('call')}>
                  <Phone size={16} className="text-white" />
                </button>
                <button className={getButtonClass('notes')} onClick={() => toggleButton('notes')}>
                  <FileText size={16} className="text-white" />
                </button>
                <button className={getButtonClass('optOut')} onClick={() => toggleButton('optOut')}>
                  <X size={16} className="text-white" />
                </button>
                <button className={getButtonClass('info')} onClick={() => toggleButton('info')}>
                  <Info size={16} className="text-white" />
                </button>
                {/* Toggle side tab button */}
                <button 
                  onClick={() => setShowSideTab(!showSideTab)} 
                  className="bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  {showSideTab ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
                {/* "View All Chats" button */}
                <Button 
                  onClick={() => navigate(`/all-chats/${encodeURIComponent(productName)}`)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  View All Chats
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Message area */}
        {/* <div className="flex-grow p-6 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-gray-400">No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.source === 'lead' ? 'justify-start' : 'justify-end'}`}>
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
                      {capitalize(msg.source)} | {capitalize(msg.message_type)}
                    </p>
                    <p className="text-xs text-gray-400">{formatTimestamp(msg.timestamp)}</p>
                  </div>
                  {msg.message_status === 'sending' && (
                    <Button 
                      onClick={() => handleSendPendingMessage(msg.id, msg.message_content)}
                      className="mt-2 text-xs bg-green-500 hover:bg-green-600"
                    >
                      Send Now
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div> */}
        <RealTimeChat 
          productName={productName} 
          phoneNumber={phoneNumber}
          salesmanId="temp-id-123"
          messages={messages}
          onSendPendingMessage={handleSendPendingMessage}
          onNewMessage={handleNewMessage}
          // getMessageIcon={getMessageIcon}
        />

        {/* Input area */}
        <div className="bg-gray-800 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            {/* Time display */}
            <div className="flex items-center text-gray-400">
              <Clock size={16} className="mr-1" />
              <span className="text-sm font-medium">00:00</span>
            </div>

            {/* NEW: Template Dialog */}
            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
              <DialogTrigger asChild>
                <button 
                  className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full"
                  title="Send template message"
                >
                  <MessageSquare className="text-gray-300" size={16} />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700">
                <WhatsappTemplateMessage 
                  phoneNumber={phoneNumber}
                  productName={productName}
                  onMessageSent={() => {
                    setShowTemplateDialog(false);
                    fetchMessages();
                  }}
                />
              </DialogContent>
            </Dialog>

            {/* Message input and send button */}
            <div className="flex-grow flex items-center">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onClick={handleInputClick}
                  className="pr-10 bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-r-none"
                  placeholder="Type a message..."
                />
                {!isEditing && <Bot size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
              </div>
              <Button onClick={sendMessage} className="bg-purple-600 hover:bg-purple-700 text-white rounded-l-none px-4 py-2 h-full transition-colors duration-200">
                <Send size={18} />
              </Button>
            </div>

            {/* Go to chat link */}
            <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
              Go to Chat <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingInterface;