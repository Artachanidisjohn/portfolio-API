// @ts-nocheck
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

dotenv.config(); // Φόρτωση των περιβαλλοντικών μεταβλητών από το .env

const app = express();
app.use(cors()); // Χρήση CORS για να επιτρέπεις αιτήματα από διαφορετικά origins

// Ρυθμίσεις middleware
app.use(express.json()); // Για την επεξεργασία JSON αιτημάτων

// Σύνδεση του route
const sendEmailRoutes = require('./api/routes/sendEmail'); // Σωστό path για το route
app.use('/send-email', sendEmailRoutes); // Χρήση του route για την αποστολή email

// Φόρτωση των ρυθμίσεων από το αρχείο config
const config = require('./api/config/config');

// Εκκίνηση του server
app.listen(config.port, function () {
  console.log(`[API] Express server is running on port ${config.port}`);
});