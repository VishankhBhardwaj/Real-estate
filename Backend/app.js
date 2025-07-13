const express = require('express');
const cors = require('cors');
require('./db/config');
require("dotenv").config();

app.use(cors({
  origin: ["https://luxury-estate-lemon.vercel.app"],
  credentials: true
}));

// Middleware
app.use(cors());
app.use(express.json({ limit: "100mb" })); 
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const toppicksRoutes = require('./routes/toppicksRoutes');
const filteredPropertiesRoutes = require('./routes/filteredPropertiesRoutes');
const userPropertiesRoutes = require('./routes/UserPropertiesRoutes');
const UserContactRoutes = require('./routes/contactRoutes');
const teamDetailsRoutes = require('./routes/teamRoutes');
const agentDetailsRoutes = require('./routes/agentDetailsRoutes');
// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/toppicks', toppicksRoutes);
app.use('/api/filter',filteredPropertiesRoutes);
app.use('/api/userProperties', userPropertiesRoutes);
app.use('/api/contact', UserContactRoutes);
app.use('/api/team', teamDetailsRoutes);
app.use('/api/agents', agentDetailsRoutes);
// Base Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start Server
app.listen(3000, () => console.log('Server is running on port 3000...'));
