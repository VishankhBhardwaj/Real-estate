# 🏡 Luxury Estate – Full-Stack Real Estate Platform

A modern, full-stack real estate web application that allows users to browse, filter, save, and contact agents about properties. Built with **React 19** on the frontend and **Node.js / Express** on the backend, with MongoDB as the database and Cloudinary for media storage.

🌐 **Live Demo:** [luxury-estate-navy.vercel.app](https://luxury-estate-navy.vercel.app)

---

## 📸 Features

- 🔐 **User Authentication** – Sign up & Sign in with JWT-based sessions and HTTP-only cookies
- 🏠 **Property Listings** – Browse all available properties with detailed views
- 🔍 **Advanced Filtering** – Filter properties by type, price, location, and more
- ⭐ **My List (Saved Properties)** – Save/remove properties to a personal watchlist
- 🗺️ **Interactive Map** – Explore property locations via Leaflet/OpenStreetMap integration
- 👤 **User Profile** – Update profile details and upload a profile picture (via Cloudinary)
- 📧 **Contact Form** – Submit inquiries; triggers automated email confirmation via Nodemailer
- 🧑‍💼 **Agent Directory** – Browse and view individual agent profiles
- 👥 **Team Page** – Meet the team behind Luxury Estate
- 🏘️ **Top Picks** – Curated highlight of featured properties

---

## 🗂️ Project Structure

```
Real-estate/
├── Backend/               # Node.js / Express REST API
│   ├── app.js             # Express app entry point
│   ├── cloudinary/        # Cloudinary config & storage
│   ├── db/                # MongoDB connection (Mongoose)
│   ├── models/            # Mongoose data models
│   └── routes/            # API route handlers
│
└── Frontend/              # React 19 + Vite SPA
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx        # Router & top-level layout
        ├── Components/    # Reusable UI components
        └── Page/          # Full page views
```

---

## 🛠️ Tech Stack

### Backend
| Package | Purpose |
|---|---|
| Express.js | HTTP server & routing |
| Mongoose | MongoDB ODM |
| bcrypt | Password hashing |
| jsonwebtoken | JWT authentication |
| cookie-parser | Cookie parsing middleware |
| Cloudinary + Multer | Image & file uploads |
| Nodemailer | Transactional email (Gmail SMTP) |
| dotenv | Environment variable management |
| nodemon | Development live-reload |

### Frontend
| Package | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| Leaflet + React Leaflet | Interactive property maps |
| Framer Motion | Animations & transitions |
| Flowbite React | UI component library |
| Lucide React & React Icons | Icon sets |
| React-Toastify | Toast notifications |
| uvcanvas | Decorative canvas backgrounds |

---

## 📡 API Reference

Base URL: `http://localhost:3000/api`

### 🔐 Auth – `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/signUp` | Register a new user |
| `POST` | `/signIn` | Log in and receive a JWT cookie |
| `POST` | `/update` | Update profile info & upload a profile picture |
| `GET` | `/:id` | Get a user by ID |

### 🏠 Properties – `/api/properties`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Get all property listings |
| `GET` | `/:id` | Get detailed view of a single property |

### 🔍 Filter – `/api/filter`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Get filtered properties (query params supported) |

### ⭐ User Properties (My List) – `/api/userProperties`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/` | Add a property to the user's saved list |
| `GET` | `/:userId` | Get all saved properties for a user |
| `DELETE` | `/remove` | Remove a property from the user's saved list |

### 📧 Contact – `/api/contact`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/` | Submit a contact inquiry (sends confirmation email) |

### 🏘️ Top Picks – `/api/toppicks`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Get the featured/top-picked properties |

### 🧑‍💼 Agents – `/api/agents`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Get all agents |
| `GET` | `/:agentId` | Get details for a specific agent |

### 👥 Team – `/api/team`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Get all team members |

---

## 🗄️ Data Models

| Model | Description |
|---|---|
| `User` | User account with name, email, password (hashed), phone, profilePic |
| `Properties` | Core property listing data |
| `ViewProperties` | Extended property detail (populated via propertyId ref) |
| `UserProperties` | Junction model linking users to their saved properties |
| `UserContact` | Contact form submissions |
| `AgentDetails` | Real estate agent profiles |
| `TeamDetails` | Team member information |
| `toppicks` | Curated featured property entries |

---

## 📄 Frontend Pages & Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Landing page with hero, top picks, and highlights |
| `/Signin` | `Signin` | Login / Sign up form |
| `/About` | `About` | About Luxury Estate page |
| `/Properties` | `Properties` | Browseable, filterable property listings |
| `/ViewProperty/:propertyId` | `PropertyGallery` | Full property detail with gallery & map |
| `/Details/:agentId` | `Details` | Individual agent profile page |
| `/Mylist` | `Mylist` | User's saved/bookmarked properties |
| `/User` | `User` | User profile management |
| `/Contact` | `ContactForm` | Contact & inquiry form |

---

## ⚙️ Environment Variables

### Backend (`Backend/.env`)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL=your_gmail_address
PASSWORD=your_gmail_app_password
```

### Frontend (`Frontend/.env`)
```env
VITE_API_URL=http://localhost:3000
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Gmail account with App Password enabled

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Real-estate.git
cd Real-estate
```

### 2. Set up the Backend
```bash
cd Backend
npm install
# Create and fill in your .env file (see above)
npm run dev
# Server starts at http://localhost:3000
```

### 3. Set up the Frontend
```bash
cd ../Frontend
npm install
# Create and fill in your .env file (see above)
npm run dev
# App starts at http://localhost:5173
```

---

## 📬 Contact

For inquiries or contributions, feel free to open an issue or submit a pull request.

---

> Built with ❤️ using the MERN stack
