import React, { useState, useEffect, useRef } from 'react';
import styles from './Chatbot.module.css';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Mic, 
  MicOff, 
  Copy, 
  Check, 
  ExternalLink, 
  Bed, 
  Bath, 
  MapPin, 
  Building2, 
  ChevronRight 
} from 'lucide-react';
import { BACKEND_URL } from '../../config';

const STARTER_PROMPTS = [
  { label: '3 BHK in Gurgaon', query: 'Show me 3 BHK properties in Gurgaon' },
  { label: 'Under 1 Crore', query: 'Properties under 1 crore' },
  { label: 'Luxury Delhi Homes', query: 'Show 3 to 4 bedroom luxury properties in Delhi' },
  { label: '2 BHK with 2 Baths', query: 'Find 2 bedroom properties with 2 bathrooms' }
];

const formatPrice = (val) => {
  if (!val && val !== 0) return '';
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  } else if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [propertiesCache, setPropertiesCache] = useState({});

  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: "Hello! I'm your Luxury Estates AI Assistant. I can help you search luxury properties, compare prices, and explore listings by location, budget, and bedrooms.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      propertyIds: []
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const speechRecognitionRef = useRef(null);

  // Scroll to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpenAi = () => setIsOpen(true);
    window.addEventListener('open-luxury-ai', handleOpenAi);
    return () => window.removeEventListener('open-luxury-ai', handleOpenAi);
  }, []);


  const fetchPropertyDetails = async (idList) => {
    if (!idList || idList.length === 0) return;
    const uncachedIds = idList.filter((id) => !propertiesCache[id]);
    if (uncachedIds.length === 0) return;

    try {
    
      const res = await fetch(`${BACKEND_URL}/api/properties`);
      if (res.ok) {
        const allProps = await res.json();
        if (Array.isArray(allProps)) {
          const map = {};
          allProps.forEach((p) => {
            map[p._id] = p;
          });
          setPropertiesCache((prev) => ({ ...prev, ...map }));
        }
      }
    } catch (err) {
      console.warn('Could not pre-fetch property details:', err);
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      speechRecognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!speechRecognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      speechRecognitionRef.current.stop();
    } else {
      try {
        speechRecognitionRef.current.start();
      } catch (err) {
        console.error('Speech recognition error:', err);
      }
    }
  };

  // Send Message Handler
  const handleSendMessage = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : inputMessage;
    if (!query || !query.trim() || isLoading) return;

    const trimmedQuery = query.trim();
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmedQuery,
      timestamp: userTimestamp
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: trimmedQuery })
      });

      const data = await response.json();

      if (data.success) {
        const aiTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const propIds = data.propertyIds || [];

        const aiMsg = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.message || "Here is what I found for your request.",
          timestamp: aiTimestamp,
          propertyIds: propIds
        };

        setMessages((prev) => [...prev, aiMsg]);
        if (propIds.length > 0) {
          fetchPropertyDetails(propIds);
        }
      } else {
        const errorMsg = {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: data.message || 'Sorry, I could not process your request right now. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err) {
      console.error('AI chat error:', err);
      const networkErrorMsg = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'Unable to connect to the AI Assistant server. Please check your backend connection.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages((prev) => [...prev, networkErrorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-msg-cleared',
        sender: 'ai',
        text: "Conversation history cleared. How can I help you find your dream home today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        propertyIds: []
      }
    ]);
  };

  const handleCopyText = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderFormattedText = (text) => {
    if (!text) return null;

    // Split paragraphs
    const paragraphs = text.split('\n');
    return paragraphs.map((paragraph, pIdx) => {
      if (!paragraph.trim()) return <br key={pIdx} />;

      // Basic markdown styling for bullet lists
      const isBullet = paragraph.trim().startsWith('- ') || paragraph.trim().startsWith('* ');
      const cleanText = isBullet ? paragraph.trim().substring(2) : paragraph;

      // Handle bold **text**
      const parts = cleanText.split(/(\*\*.*?\*\*)/g);

      const content = parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={idx} className={styles.boldText}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={pIdx} className={styles.bulletItem}>
            <span className={styles.bulletDot}>•</span>
            <span className={styles.bulletContent}>{content}</span>
          </div>
        );
      }

      return (
        <p key={pIdx} className={styles.paragraph}>
          {content}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button 
        className={`${styles.floatingBtn} ${isOpen ? styles.floatingBtnHidden : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open Luxury AI Chatbot"
        id="luxury-ai-floating-trigger"
      >
        <div className={styles.pulseRing}></div>
        <div className={styles.btnContent}>
          <Sparkles className={styles.sparkleIcon} size={18} />
          <Bot className={styles.botIcon} size={26} />
        </div>
        <div className={styles.badgeLabel}>
          <span>Luxury AI</span>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`${styles.chatContainer} ${isExpanded ? styles.chatExpanded : ''}`}
          role="dialog"
          aria-labelledby="chatbot-title"
        >
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.aiAvatar}>
                <Bot size={22} className={styles.headerBotIcon} />
                <span className={styles.onlineDot}></span>
              </div>
              <div>
                <h3 id="chatbot-title" className={styles.headerTitle}>
                  Luxury Estate AI
                  <span className={styles.proBadge}>Assistant</span>
                </h3>
                <p className={styles.headerSubtitle}>Powered by Groq Intelligence</p>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button 
                onClick={handleClearHistory} 
                className={styles.iconBtn}
                title="Clear conversation"
                aria-label="Clear Chat"
              >
                <RotateCcw size={18} />
              </button>

              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className={styles.iconBtn}
                title={isExpanded ? "Standard view" : "Expand view"}
                aria-label="Expand Chat"
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>

              <button 
                onClick={() => setIsOpen(false)} 
                className={`${styles.iconBtn} ${styles.closeBtn}`}
                title="Close chat"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className={styles.messagesContainer}>
            {/* Quick Starter Chips */}
            {messages.length <= 2 && (
              <div className={styles.starterSection}>
                <div className={styles.starterHeader}>
                  <Sparkles size={14} className={styles.starterSparkle} />
                  <span>Popular searches</span>
                </div>
                <div className={styles.chipGrid}>
                  {STARTER_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      className={styles.starterChip}
                      onClick={() => handleSendMessage(prompt.query)}
                    >
                      <span>{prompt.label}</span>
                      <ChevronRight size={14} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Stream */}
            {messages.map((msg, idx) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id || idx}
                  className={`${styles.messageRow} ${isUser ? styles.userRow : styles.aiRow}`}
                >
                  {!isUser && (
                    <div className={styles.avatarMini}>
                      <Bot size={16} />
                    </div>
                  )}

                  <div className={styles.messageBubbleWrapper}>
                    <div 
                      className={`${styles.messageBubble} ${
                        isUser ? styles.userBubble : styles.aiBubble
                      } ${msg.isError ? styles.errorBubble : ''}`}
                    >
                      <div className={styles.messageContent}>
                        {renderFormattedText(msg.text)}
                      </div>

                      {/* Property Previews if AI identified matching properties */}
                      {msg.propertyIds && msg.propertyIds.length > 0 && (
                        <div className={styles.propertyGrid}>
                          {msg.propertyIds.map((propId) => {
                            const property = propertiesCache[propId];
                            if (!property) return null;

                            return (
                              <div key={propId} className={styles.propertyCard}>
                                {property.image && (
                                  <div className={styles.propertyImageWrapper}>
                                    <img 
                                      src={property.image} 
                                      alt={property.name} 
                                      className={styles.propertyImg}
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                      }}
                                    />
                                    <div className={styles.propertyPriceTag}>
                                      {formatPrice(property.price)}
                                    </div>
                                  </div>
                                )}

                                <div className={styles.propertyDetails}>
                                  <h4 className={styles.propertyName}>{property.name}</h4>
                                  
                                  {property.location && (
                                    <div className={styles.propertyLocation}>
                                      <MapPin size={13} />
                                      <span>{property.location}</span>
                                    </div>
                                  )}

                                  <div className={styles.propertySpecs}>
                                    {property.bedroom !== undefined && (
                                      <div className={styles.specItem}>
                                        <Bed size={13} />
                                        <span>{property.bedroom} BHK</span>
                                      </div>
                                    )}
                                    {property.bathroom !== undefined && (
                                      <div className={styles.specItem}>
                                        <Bath size={13} />
                                        <span>{property.bathroom} Bath</span>
                                      </div>
                                    )}
                                  </div>

                                  <a 
                                    href={`/ViewProperty/${property._id}`}
                                    className={styles.viewPropertyBtn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span>View Property</span>
                                    <ExternalLink size={13} />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className={styles.messageFooter}>
                        <span className={styles.timestamp}>{msg.timestamp}</span>
                        {!isUser && (
                          <button
                            className={styles.copyBtn}
                            onClick={() => handleCopyText(msg.text, idx)}
                            title="Copy response"
                          >
                            {copiedIndex === idx ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Thinking / Loading Animation */}
            {isLoading && (
              <div className={`${styles.messageRow} ${styles.aiRow}`}>
                <div className={styles.avatarMini}>
                  <Bot size={16} />
                </div>
                <div className={`${styles.messageBubble} ${styles.aiBubble} ${styles.loadingBubble}`}>
                  <div className={styles.typingIndicator}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </div>
                  <span className={styles.loadingText}>Searching luxury properties...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips above input */}
          {messages.length > 2 && !isLoading && (
            <div className={styles.quickChipsBar}>
              <button 
                className={styles.quickChip}
                onClick={() => handleSendMessage("Show more properties")}
              >
                Show more
              </button>
              <button 
                className={styles.quickChip}
                onClick={() => handleSendMessage("Show cheaper options")}
              >
                Lower price
              </button>
              <button 
                className={styles.quickChip}
                onClick={() => handleSendMessage("Properties in Gurgaon")}
              >
                In Gurgaon
              </button>
              <button 
                className={styles.quickChip}
                onClick={() => handleSendMessage("Villas in Delhi")}
              >
                In Delhi
              </button>
            </div>
          )}

          {/* Input Bar */}
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about properties, locations, price..."
                rows={1}
                className={styles.chatInput}
                disabled={isLoading}
              />

              <button
                type="button"
                onClick={toggleListening}
                className={`${styles.micBtn} ${isListening ? styles.micActive : ''}`}
                title={isListening ? "Listening... click to stop" : "Voice input"}
                aria-label="Voice Search"
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className={styles.sendBtn}
                title="Send message"
                aria-label="Send Message"
              >
                <Send size={18} />
              </button>
            </div>
            <div className={styles.footerNote}>
              <span>Luxury Estate AI • Instant real-estate answers</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
