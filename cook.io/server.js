// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());
// app.use(express.static('public'));

// const USERS_DB = path.join(__dirname, 'users.json');

// // Serve the register.html page when accessing the root
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'register.html'));
// });

// // Serve the login.html page on the /login route
// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });



  
// // Register Route
// app.post('/', (req, res) => {
//     const { username, email, password } = req.body;

//     if (!email.endsWith('@gmail.com')) {
//         return res.status(400).json({ message: 'Please enter a valid Gmail address! 🚫' });
//     }

//     let users = JSON.parse(fs.readFileSync(USERS_DB, 'utf-8'));

//     if (users.find(user => user.email === email)) {
//         return res.status(400).json({ message: 'Email is already registered!' });
//     }

//     users.push({ username, email, password });
//     fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));

//     // Redirect to the login page after successful registration
//     res.status(200).json({ message: 'Registration successful! 🎉' });
// });

// // Login Route
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     let users = JSON.parse(fs.readFileSync(USERS_DB, 'utf-8'));
//     const user = users.find(user => user.email === email);

//     if (!user) {
//         return res.status(400).json({ message: 'Email not found!' });
//     }

//     if (user.password !== password) {
//         return res.status(400).json({ message: 'Incorrect password!' });
//     }

//     res.status(200).json({ message: 'Login successful!' });
// });

// // Start the server
// app.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
// });

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public folder

const USERS_DB = path.join(__dirname, 'users.json');

// Route to serve the register.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Route to serve the login.html page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route to serve the index.html page after login
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Register route
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!email.endsWith('@gmail.com')) {
        return res.status(400).json({ message: 'Please enter a valid Gmail address! 🚫' });
    }

    // Read existing users from the JSON file
    let users = JSON.parse(fs.readFileSync(USERS_DB, 'utf-8'));

    // Check if the email is already registered
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'Email is already registered!' });
    }

    // Add the new user to the users array
    users.push({ username, email, password });
    fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));

    // Redirect to login page after successful registration
    res.status(200).json({ message: 'Registration successful! 🎉' });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Read users from the JSON file
    let users = JSON.parse(fs.readFileSync(USERS_DB, 'utf-8'));
    const user = users.find(user => user.email === email);

    // Check if the email exists
    if (!user) {
        return res.status(400).json({ message: 'Email not found!' });
    }

    // Check if the password matches
    if (user.password !== password) {
        return res.status(400).json({ message: 'Incorrect password!' });
    }

    // If login is successful, redirect to index.html
    res.status(200).json({ message: 'Login successful!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
