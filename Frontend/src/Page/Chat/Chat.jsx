import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Chat.module.css';
import socket from '../../socket'
const Chat = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState(null);
  useEffect(() => {
    const setupConversation = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/conversation",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              agentId
            })
          }
        );
        const data = await response.json();
        if (response.ok) {
          setConversationId(
            data.conversation._id
          );
        } else {
          console.error(
            data.message
          );
        }
      } catch (error) {
        console.error(
          "Conversation error:",
          error
        );
      }
    }
    if (agentId) {
      setupConversation()
    }
  }, [agentId]);
  useEffect(() => {

    const fetchAgent = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/agents/${agentId}`
        );

        if (response.ok) {
          const data = await response.json();
          setAgent(data);
        }

      } catch (error) {
        console.error("Agent fetch error:", error);
      }
    };

    if (agentId) {
      fetchAgent();
    }

  }, [agentId]);
  useEffect(() => {
    if (!conversationId) return;
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/conversation/${conversationId}/messages`, {
          credentials: "include"
        });
        const data = await response.json();
        if (response.ok) {
          setMessages(data.messages);
        } else {
          console.error(
            data.message
          );
        }
      } catch (error) {
        console.error(
          "Fetch messages error:",
          error
        );
      }
    }
    fetchMessages();
  }, [conversationId]);
  useEffect(() => {
    if (!conversationId) return;
    socket.connect();
    socket.emit("join_room", conversationId);
    const handleReceiveMessage = (message) => {
      setMessages((prev) => [
        ...prev, message
      ]);
    };
    socket.on(
      "receive_message", handleReceiveMessage
    );
    return () => {
      socket.emit(
        "leave_room",
        conversationId
      );
      socket.off(
        "receive_message",
        handleReceiveMessage
      )
    }
  }, [conversationId]);
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const text = newMessage.trim();
    if (!text) return;
    if (!conversationId) return;
    socket.emit(
      "send_message",
      {
        conversationId,
        text
      },
      (response) => {
        if (response.success) {
          console.log("Message sent successfully");
        } else {
          console.error(
            response.message
          );
        }
      }
    );
    setNewMessage("");
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        <div className={styles.chatHeader}>
          <div className={styles.agentInfo}>
            {agent?.profileImage ? (
              <img src={agent.profileImage} alt={agent?.name || 'Agent'} className={styles.agentAvatar} />
            ) : (
              <div className={styles.agentAvatar}></div>
            )}
            <div className={styles.agentDetails}>
              <h3>{agent?.name || 'Agent Chat'}</h3>
              <p className={styles.agentRole}>{agent?.role || 'Real Estate Specialist'}</p>
            </div>
          </div>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            Back
          </button>
        </div>

        <div className={styles.messagesArea}>
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <h4>No messages yet</h4>
              <p>Start a conversation with {agent?.name || 'the agent'}</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`${styles.messageBubble} ${msg.senderType === 'buyer' ? styles.messageSent : styles.messageReceived
                  }`}
              >
                <span>{msg.text}</span>
                {msg.createdAt && (
                  <span className={styles.messageTime}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        <form className={styles.inputArea} onSubmit={handleSendMessage}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className={styles.sendBtn}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
