const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kali:kali@clustertest.bziibod.mongodb.net/?retryWrites=true&w=majority';


const User = require('./models/User');
const Resource = require('./models/Resource');


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});


app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Add other routes for creating, updating, and deleting data

// Get all resources
app.get('/api/resources', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new resource
app.post('/api/resources', async (req, res) => {
    // Handle resource creation here
});

// Update a resource
app.put('/api/resources/:id', async (req, res) => {
    // Handle resource updates here
});

// Delete a resource
app.delete('/api/resources/:id', async (req, res) => {
    // Handle resource deletion here
});


// Middleware for parsing JSON requests
app.use(express.json());

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
