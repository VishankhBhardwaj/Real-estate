# 🏡 Luxury Estate – AI-Powered Full-Stack Real Estate Platform

A modern, full-stack real estate web application featuring an **Autonomous AI Agent** for natural language property discovery, an **Interactive Mortgage & Rental ROI Calculator**, geospatial mapping, and complete listing management. Built with **React 19** on the frontend, **Node.js / Express** on the backend following clean **MVC Architecture (Controllers & Routes separation)**, **Groq AI SDK** (LLM Tool Calling), MongoDB, and Cloudinary.

🌐 **Live Demo:** [luxury-estate-navy.vercel.app](https://luxury-estate-navy.vercel.app)

---

## 🌟 Key Features

- 🤖 **Autonomous AI Property Agent** – Natural language property discovery powered by Groq function calling (`tools: search_properties`), converting human prompts (*"3 BHK in Gurgaon under 1 Cr"*) into MongoDB queries and rendering live interactive property cards directly in chat.
- 💰 **Dual-Mode Mortgage & Rental ROI Calculator** – Real-time financial engine computing monthly amortized EMIs, principal vs. interest splits, and expected gross rental yields with reactive sliders.
- 🔐 **User Authentication & Profiles** – Secure Sign Up & Sign In with JWT-based authentication, password hashing via bcrypt, and Cloudinary avatar uploads.
- 🏠 **Property Listings & Detail Views** – Browse luxury properties with high-res galleries, amenities, and dynamic specs.
- 🔍 **Multi-Parameter Filtering** – Filter properties by city, price range, bedrooms, and bathrooms.
- ⭐ **My List (Watchlist)** – Save and manage favorite properties in a personal list.
- 🗺️ **Geospatial Map Integration** – Interactive map exploration powered by Leaflet & OpenStreetMap.
- 📧 **Automated Inquiries** – Contact form with automated email confirmations via Nodemailer (Gmail SMTP).
- 🧑‍💼 **Agent & Team Directories** – Dedicated agent profiles and agency team showcases.

---

## 🏗️ Architecture Overview (MVC Pattern)

```
┌─────────────────────────────────────────────────────────────┐
│                      Client (React 19)                      │
│       SPA • Vite • AI Chatbot Widget • EMI Calculator       │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON
┌──────────────────────────────▼──────────────────────────────┐
│                    Express REST API (MVC)                   │
├──────────────────────────────┬──────────────────────────────┤
│  Routes Layer                │  Controllers Layer           │
│  - /api/ai/chat              │  - ai.controller.js          │
│  - /api/auth                 │  - authController.js         │
│  - /api/properties           │  - propertyController.js     │
│  - /api/filter               │  - filteredPropertiesCtrl.js │
│  - /api/userProperties       │  - userPropertiesCtrl.js     │
│  - /api/contact              │  - contactController.js      │
│  - /api/toppicks             │  - toppicksController.js     │
│  - /api/agents               │  - agentDetailsController.js │
│  - /api/team                 │  - teamController.js         │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
    ┌──────────▼──────────┐        ┌──────────▼──────────┐
    │   MongoDB Database  │        │   External Services  │
    │  - Properties       │        │  - Groq AI SDK       │
    │  - Users            │        │  - Cloudinary Media  │
    │  - Saved Watchlists │        │  - Nodemailer SMTP   │
    └─────────────────────┘        └─────────────────────┘
```

---

## 🗂️ Project Structure

```
Real-estate/
├── Backend/                       # Node.js / Express REST API
│   ├── app.js                     # Express entry point & middleware
│   ├── cloudinary/                # Cloudinary media storage config
│   ├── controllers/               # Business logic & controller handlers
│   │   ├── agentDetailsController.js
│   │   ├── ai.controller.js       # Groq agent & MongoDB tool search
│   │   ├── authController.js      # Sign up, sign in, profile update
│   │   ├── contactController.js   # Inquiries & automated email delivery
│   │   ├── filteredPropertiesController.js
│   │   ├── propertyController.js
│   │   ├── teamController.js
│   │   ├── toppicksController.js
│   │   └── userPropertiesController.js
│   ├── db/                        # MongoDB Mongoose connection
│   ├── models/                    # Data schemas (Properties, User, Agents, etc.)
│   └── routes/                    # Clean routing endpoints
│
└── Frontend/                      # React 19 + Vite SPA
    ├── src/
    │   ├── App.jsx                # Router, global providers & Chatbot mount
    │   ├── Components/            # Reusable UI components
    │   │   ├── Calculator/        # EmiCalculator & investment component
    │   │   ├── Chatbot/           # Luxury AI Chatbot widget
    │   │   ├── Card/              # Property & agent cards
    │   │   ├── Navbar/            # Navigation bar with AI trigger
    │   │   └── Map/               # Leaflet map integration
    │   └── Page/                  # Page views (Home, Properties, Calculator, ViewProperty, User)
    ├── vite.config.js             # Vite configuration
    └── package.json
```

---

## 🛠️ Tech Stack

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
| **bcrypt & jsonwebtoken** | Secure password hashing & JWT cookie authentication |
| **Cloudinary & Multer** | Cloud media storage & multipart avatar uploads |
| **Nodemailer** | Transactional SMTP email delivery |
| **dotenv & cors** | Environment management & CORS configuration |

### Frontend
| Package | Purpose |
|---|---|
| **React 19** | Modern component-driven UI architecture |
| **Vite** | Next-generation frontend tooling & build pipeline |
| **React Router DOM v7** | Declarative client-side routing |
| **Leaflet & React Leaflet** | Geospatial interactive mapping |
| **Framer Motion & Motion** | Smooth animations & micro-interactions |
| **Lucide React & React Icons** | Premium icon systems |
| **React-Toastify** | Responsive toast notification system |

---

## 📡 API Reference

Base URL: `http://localhost:3000/api`

### 🤖 AI Agent – `/api/ai`
| Method | Endpoint | Controller Handler | Description |
|---|---|---|---|
| `POST` | `/chat` | `chatWithAgent` | Conversational property discovery with Groq tool calling |

### 🔐 Auth – `/api/auth`
| Method | Endpoint | Controller Handler | Description |
|---|---|---|---|
| `POST` | `/signUp` | `signUp` | Register a new user |
| `POST` | `/signIn` | `signIn` | Authenticate user & issue JWT |
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

### 🏘️ Top Picks & Directories
| Method | Endpoint | Controller Handler | Description |
|---|---|---|---|
| `GET` | `/api/toppicks` | `getAllTopPicks` | Get featured highlight listings |
| `GET` | `/api/agents` | `getAgents` | Get all real estate agent profiles |
| `GET` | `/api/agents/:agentId` | `getAgentById` | Get specific agent details |
| `GET` | `/api/team` | `getTeam` | Get agency team members |

---

## 📄 Frontend Pages & Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Hero section, featured top picks, and platform highlights |
| `/Properties` | `Properties` | Filterable listing directory with interactive map |
| `/Calculator` | `CalculatorPage` | Standalone mortgage & rental ROI financial estimator |
| `/ViewProperty/:propertyId` | `PropertyGallery` | Property details, image carousel, specs & embedded EMI calculator |
| `/Mylist` | `Mylist` | User's bookmarked property watchlist |
| `/Signin` | `Signin` | User authentication (Sign In / Sign Up) |
| `/User` | `User` | Profile dashboard and settings |
| `/Contact` | `ContactForm` | Agent contact and inquiry form |
| `/About` | `About` | Company story and values |
| `/Details/:agentId` | `Details` | Agent bio, listings, and contact info |

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
