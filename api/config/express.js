const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const sendEmailRoutes = require('../routes/sendEmail'); // Διόρθωση path

const app = express();

// Middleware


app.use(cors()); // Χρήση CORS για να επιτρέπει αιτήματα από άλλες πηγές (π.χ. το frontend)

app.use(bodyParser.json()); // Για να μπορεί να επεξεργάζεται JSON αιτήματα

// Routes

app.use('/send-email', sendEmailRoutes); // Σύνδεση του route για αποστολή email


app.listen(3100, () => {
    console.log('Server is running on port 3100');
});


module.exports = app; // Εξάγεις την εφαρμογή Express για χρήση 