# 🏡 Luxury Estate – AI-Powered Real Estate Platform & Real-Time Agent Hub

A modern, full-stack real estate web application featuring an **Autonomous AI Discovery Agent**, **Real-Time WebSockets Messaging (Socket.IO + HttpOnly Cookie Auth)**, a **Dedicated Agent Chat Portal**, an **Interactive Mortgage & Rental ROI Calculator**, geospatial mapping, and complete listing management. Built with **React 19** on the frontend, **Node.js / Express** on the backend following clean **MVC Architecture (Controllers & Routes separation)**, **Groq AI SDK** (LLM Tool Calling), MongoDB, Socket.IO, and Cloudinary.

🌐 **Live Demo:** [luxury-estate-navy.vercel.app](https://luxury-estate-navy.vercel.app)

---

## 🌟 Key Features

- 🤖 **Autonomous AI Property Agent** – Natural language property discovery powered by Groq function calling (`tools: search_properties`), converting human prompts (*"3 BHK in Gurgaon under 1 Cr"*) into MongoDB queries and rendering live interactive property cards directly in chat.
- ⚡ **Real-Time Buyer-Agent Chat (Socket.IO)** – Live bi-directional messaging between clients and certified real estate specialists with automatic room management (`join_room`, `send_message`, `receive_message`, `leave_room`).
- 🔐 **HttpOnly Cookie Authentication for WebSockets** – Production-grade security reading and verifying JWT tokens directly from `socket.handshake.headers.cookie` across cross-origin WebSocket handshakes.
- 🧑‍💼 **Dedicated Standalone Agent Portal (`/agent/chat`)** – Clean, distraction-free workspace for agents featuring a live conversation inbox, buyer inquiries, property context tags, and real-time message exchange.
- 👥 **Role-Based Authentication & Smart Redirection** – Distinct `buyer` and `agent` roles with automatic routing post-login (`agent` ➔ `/agent/chat`, `buyer` ➔ `/`) and dynamic Navbar integration.
- 💰 **Dual-Mode Mortgage & Rental ROI Calculator** – Real-time financial engine computing monthly amortized EMIs, principal vs. interest splits, and expected gross rental yields with reactive sliders.
- 🏠 **Property Listings & Detail Views** – Browse luxury properties with high-res galleries, amenities, and dynamic specs.
- 🔍 **Multi-Parameter Filtering** – Filter properties by city, price range, bedrooms, and bathrooms.
- ⭐ **My List (Watchlist)** – Save and manage favorite properties in a personal list.
- 🗺️ **Geospatial Map Integration** – Interactive map exploration powered by Leaflet & OpenStreetMap.
- 📧 **Automated Inquiries** – Contact form with automated email confirmations via Nodemailer (Gmail SMTP).
- 🧑‍💼 **Dynamic Agent Directory** – Showcases agency agents and newly registered agent partners dynamically on the homepage.

---

## 🏗️ Architecture Overview (MVC + WebSockets)

```
┌─────────────────────────────────────────────────────────────┐
│                      Client (React 19)                      │
│   SPA • Vite • Real-Time Chat • Agent Portal • AI Assistant │
└──────────────┬──────────────────────────────┬───────────────┘
               │ HTTP / JSON                  │ WebSockets (Socket.IO)
               │ (withCredentials: true)      │ (HttpOnly Cookie Auth)
┌──────────────▼──────────────────────────────▼───────────────┐
│                 Express REST API + Socket.IO                │
├──────────────────────────────┬──────────────────────────────┤
│  Routes Layer                │  Controllers Layer           │
│  - /api/ai/chat              │  - ai.controller.js          │
│  - /api/auth                 │  - authController.js         │
│  - /api/chat (Conversations) │  - conversation.controller.js│
│  - /api/properties           │  - propertyController.js     │
│  - /api/filter               │  - filteredPropertiesCtrl.js │
│  - /api/userProperties       │  - userPropertiesCtrl.js     │
│  - /api/contact              │  - contactController.js      │
│  - /api/toppicks             │  - toppicksController.js     │
│  - /api/agents               │  - agentDetailsController.js │
│  - /api/team                 │  - teamController.js         │
├──────────────────────────────┴──────────────────────────────┤
│  Socket.IO Middleware & Event Layer                         │
│  - io.use(Cookie JWT Auth)   - join_room / leave_room       │
│  - send_message              - receive_message              │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
    ┌──────────▼──────────┐        ┌──────────▼──────────┐
    │   MongoDB Database  │        │   External Services  │
    │  - Properties       │        │  - Groq AI SDK       │
    │  - Users (Roles)    │        │  - Cloudinary Media  │
    │  - Conversations    │        │  - Nodemailer SMTP   │
    │  - Messages         │        └─────────────────────┘
    │  - Agents & TopPicks│
    └─────────────────────┘
```

---

## 🗂️ Project Structure

```
Real-estate/
├── Backend/                       # Node.js / Express REST API & Socket Server
│   ├── app.js                     # Express app, Socket.IO server & cookie auth middleware
│   ├── cloudinary/                # Cloudinary media storage config
│   ├── controllers/               # Business logic & controller handlers
│   │   ├── agentDetailsController.js  # Dynamic agent directory (Agents + User agents)
│   │   ├── ai.controller.js           # Groq agent & MongoDB tool search
│   │   ├── authController.js          # Role-based sign up, sign in, JWT cookies
│   │   ├── contactController.js       # Inquiries & automated email delivery
│   │   ├── conversation.controller.js # Conversation & message persistence
│   │   ├── filteredPropertiesController.js
│   │   ├── propertyController.js
│   │   ├── teamController.js
│   │   ├── toppicksController.js
│   │   └── userPropertiesController.js
│   ├── db/                        # MongoDB Mongoose connection
│   ├── middleware/                # Auth middleware (cookie + header JWT verification)
│   ├── models/                    # Data schemas (Conversation, Message, User, Agent, etc.)
│   └── routes/                    # Clean routing endpoints
│
└── Frontend/                      # React 19 + Vite SPA
    ├── src/
    │   ├── App.jsx                # Router, global providers & Chatbot mount
    │   ├── socket.js              # Socket.IO client instance (withCredentials: true)
    │   ├── Components/            # Reusable UI components
    │   │   ├── Calculator/        # EmiCalculator & investment component
    │   │   ├── Chatbot/           # Luxury AI Chatbot widget
    │   │   ├── Card/              # Property & agent cards
    │   │   ├── Navbar/            # Navigation bar with dynamic Agent Portal link
    │   │   └── Map/               # Leaflet map integration
    │   └── Page/                  # Page views
    │       ├── Chat/              # Buyer Chat & Standalone Agent Chat Portal
    │       │   ├── Chat.jsx       # Buyer chat interface
    │       │   ├── AgentChat.jsx  # Fullscreen Agent Workspace
    │       │   └── AgentChat.module.css
    │       ├── Home/              # Landing page & agent showcase
    │       ├── Properties/        # Property exploration & filters
    │       ├── CalculatorPage/    # Standalone mortgage & ROI estimator
    │       ├── ViewProperty/      # Gallery & property specs
    │       └── User/              # Profile settings & watchlist
    ├── vite.config.js             # Vite configuration
    └── package.json
```

---

## 🛠️ Tech Stack

### Real-Time & WebSockets
| Technology | Description |
|---|---|
| **Socket.IO (v4.8+)** | Bi-directional, event-based real-time communication engine |
| **HttpOnly Cookie Auth** | Secure cookie extraction (`cookie.parse`) and JWT verification for WebSocket handshakes |

### AI & Financial Engine
| Technology | Description |
|---|---|
| **Groq SDK** | Ultra-fast LLM inference for autonomous property discovery with tool calling |
| **Custom Financial Engine** | Real-time mortgage amortization, monthly cash-flow, and gross rental yield calculations |
| **Web Speech API** | Client-side voice recognition for hands-free voice search |

### Backend
| Package | Purpose |
|---|---|
| **Node.js & Express.js** | RESTful HTTP server & clean MVC routing architecture |
| **MongoDB & Mongoose** | Document database with relational model references & indexing |
| **cookie & cookie-parser**| Cookie parsing and HttpOnly token management |
| **bcrypt & jsonwebtoken** | Secure password hashing & JWT cookie authentication |
| **Cloudinary & Multer** | Cloud media storage & multipart avatar uploads |
| **Nodemailer** | Transactional SMTP email delivery |
| **dotenv & cors** | Environment management & CORS with credentials |

### Frontend
| Package | Purpose |
|---|---|
| **React 19** | Modern component-driven UI architecture |
| **Vite** | Next-generation frontend tooling & build pipeline |
| **Socket.IO Client** | Real-time client connection with credentials support |
| **React Router DOM v7** | Declarative client-side routing |
| **Leaflet & React Leaflet** | Geospatial interactive mapping |
| **Framer Motion & Motion** | Smooth animations & micro-interactions |
| **Lucide React & React Icons** | Premium icon systems |
| **React-Toastify** | Responsive toast notification system |

---

## 📡 API Reference

Base URL: `http://localhost:3000/api`

### 💬 Real-Time Chat & Conversations – `/api/chat`
| Method | Endpoint | Controller Handler | Description |
|---|---|---|---|
| `POST` | `/conversation` | `createOrGetConversation` | Create or retrieve an existing buyer-agent conversation |
| `GET` | `/conversations` | `getConversations` | Fetch all conversations for the authenticated user (populated buyer/agent/property) |
| `GET` | `/conversation/:id/messages` | `getMessages` | Retrieve all historical messages for a conversation |

### 🤖 AI Agent – `/api/ai`
| Method | Endpoint | Controller Handler | Description |
|---|---|---|---|
| `POST` | `/chat` | `chatWithAgent` | Conversational property discovery with Groq tool calling |

### 🔐 Auth & Roles – `/api/auth`
| Method | Endpoint | Controller Handler | Description |
|---|---|---|---|
| `POST` | `/signUp` | `signUp` | Register user with role (`buyer` / `agent`) & issue HttpOnly JWT |
| `POST` | `/signIn` | `signIn` | Authenticate user, return role info & set HttpOnly JWT cookie |
| `POST` | `/update` | `updateProfile` | Update profile info & upload avatar |
| `GET` | `/:id` | `getUserById` | Fetch user profile by ID |

### 🏠 Properties – `/api/properties`
| Method | Endpoint | Controller Handler | Description |
|---|---|---|---|
| `GET` | `/` | `getAllProperties` | Get all property listings |
| `GET` | `/:id` | `getPropertyById` | Get detailed property data with populated references |

### 🔍 Filter – `/api/filter`
| Method | Endpoint | Controller Handler | Description |
|---|---|---|---|
| `POST` | `/` | `filterProperties` | Query properties by location, minPrice, maxPrice, bedrooms |

### ⭐ User Properties (My List) – `/api/userProperties`
| Method | Endpoint | Controller Handler | Description |
|---|---|---|---|
| `POST` | `/` | `addUserProperty` | Bookmark a property to user's saved list |
| `GET` | `/:userId` | `getUserProperties` | Get all saved properties for a specific user |
| `DELETE` | `/remove` | `removeUserProperty` | Remove a property from saved list |

### 📧 Contact – `/api/contact`
| Method | Endpoint | Controller Handler | Description |
|---|---|---|---|
| `POST` | `/` | `submitContact` | Submit inquiry & trigger confirmation email |

### 🏘️ Agents & Directories
| Method | Endpoint | Controller Handler | Description |
|---|---|---|---|
| `GET` | `/api/agents` | `getAgents` | Get all agents (database records + registered agent users) |
| `GET` | `/api/agents/:agentId` | `getAgentById` | Get specific agent details |
| `GET` | `/api/toppicks` | `getAllTopPicks` | Get featured highlight listings |
| `GET` | `/api/team` | `getTeam` | Get agency team members |

---

## ⚡ Socket.IO Event Reference

| Event Name | Direction | Payload | Description |
|---|---|---|---|
| `join_room` | Client ➔ Server | `conversationId` | Join a conversation room (checks authorization) |
| `send_message` | Client ➔ Server | `{ conversationId, text }` | Persist message in DB and broadcast to room |
| `receive_message` | Server ➔ Client | `messageObject` | Receive new message in real-time |
| `leave_room` | Client ➔ Server | `conversationId` | Leave a conversation room |

---

## 📄 Frontend Pages & Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Hero section, featured properties, and live agent directory |
| `/agent/chat` | `AgentChat` | Dedicated fullscreen agent workspace with inbox & live chat |
| `/Chat/:agentId` | `Chat` | Direct real-time chat between buyer and agent |
| `/Properties` | `Properties` | Filterable listing directory with interactive map |
| `/Calculator` | `CalculatorPage` | Standalone mortgage & rental ROI financial estimator |
| `/ViewProperty/:propertyId` | `PropertyGallery` | Property details, image carousel, specs & embedded EMI calculator |
| `/Mylist` | `Mylist` | User's bookmarked property watchlist |
| `/Signin` | `Signin` | Role-based authentication (Buyer / Agent) with smart redirect |
| `/User` | `User` | Profile dashboard and settings |
| `/Contact` | `ContactForm` | Agent contact and inquiry form |
| `/About` | `About` | Company story and values |
| `/Details/:agentId` | `Details` | Agent bio, listings, and chat trigger |

---

## ⚙️ Environment Variables

### Backend (`Backend/.env`)
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL=your_gmail_address
PASSWORD=your_gmail_app_password
```

### Frontend (`Frontend/.env`)
```env
VITE_BACKEND_URL=http://localhost:3000
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Real-estate.git
cd Real-estate
```

### 2. Set up the Backend
```bash
cd Backend
npm install
# Create .env with the variables listed above
npm run dev
# Server running at http://localhost:3000
```

### 3. Set up the Frontend
```bash
cd ../Frontend
npm install
npm run dev
# Vite dev server running at http://localhost:5173
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
