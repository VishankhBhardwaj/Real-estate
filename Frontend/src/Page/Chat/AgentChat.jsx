import React, { useState, useEffect } from 'react';
import styles from './AgentChat.module.css';
import socket from '../../socket';
import { API_BASE_URL } from '../../config';

const AgentChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/chat/conversations`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (data.conversations) {
          setConversations(data.conversations);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    if (!selectedConversation) return;

    socket.connect();
    socket.emit('join_room', selectedConversation._id);

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/chat/conversation/${selectedConversation._id}/messages`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('receive_message', handleMessage);

    return () => {
      socket.emit('leave_room', selectedConversation._id);
      socket.off('receive_message', handleMessage);
    };
  }, [selectedConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    socket.emit('send_message', {
      conversationId: selectedConversation._id,
      text: newMessage.trim()
    });

    setNewMessage('');
  };

  return (
    <div className={styles.agentPortal}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Agent Inbox</h2>
        </div>

        <div className={styles.conversationsList}>
          {conversations.length === 0 ? (
            <div className={styles.emptyInbox}>No conversations</div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv._id}
                className={`${styles.conversationItem} ${
                  selectedConversation?._id === conv._id ? styles.active : ''
                }`}
                onClick={() => setSelectedConversation(conv)}
              >
                <div className={styles.buyerInitials}>
                  {conv.buyer?.name ? conv.buyer.name[0].toUpperCase() : 'B'}
                </div>
                <div className={styles.conversationDetails}>
                  <div className={styles.buyerName}>{conv.buyer?.name || 'Buyer'}</div>
                  <div className={styles.propertyBadge}>
                    {conv.property?.name || conv.property?.title || 'Property'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.chatMain}>
        {selectedConversation ? (
          <>
            <div className={styles.chatHeader}>
              <h3>{selectedConversation.buyer?.name || 'Buyer'}</h3>
            </div>

            <div className={styles.messagesContainer}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`${styles.messageRow} ${
                    msg.senderType === 'agent' ? styles.agentRow : styles.buyerRow
                  }`}
                >
                  <div
                    className={`${styles.messageBubble} ${
                      msg.senderType === 'agent' ? styles.agentBubble : styles.buyerBubble
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form className={styles.inputContainer} onSubmit={handleSendMessage}>
              <input
                type="text"
                className={styles.inputField}
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className={styles.sendButton}>
                Send
              </button>
            </form>
          </>
        ) : (
          <div className={styles.noSelection}>
            <h3>Select a conversation to start chatting</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentChat;
