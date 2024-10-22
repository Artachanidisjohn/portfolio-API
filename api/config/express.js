const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const sendEmailRoutes = require('../routes/sendEmail'); // Διόρθωση path

const app = express();

// Middleware


const corsOptions = {
    origin: 'https://portfolio-artachanidis-john.vercel.app', // Το front-end σου URL στο Vercel
    methods: ['GET', 'POST'], // Οι μέθοδοι που θέλεις να επιτρέψεις
    allowedHeaders: ['Content-Type', 'Authorization'], // Τα headers που επιτρέπεις
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // Για να μπορεί να επεξεργάζεται JSON αιτήματα

// Routes

app.use('/send-email', sendEmailRoutes); // Σύνδεση του route για αποστολή email


app.listen(3100, () => {
    console.log('Server is running on port 3100');
});


module.exports = app; // Εξάγεις την εφαρμογή Express για χρήση 