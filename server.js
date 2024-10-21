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

// Ρύθμιση της βασικής διαδρομής για να δείχνει ότι το API λειτουργεί
app.get('/', (req, res) => {
  res.send('API is running');
});

// Εκκίνηση του server - δεν χρειάζεται να καθορίσεις port στο Vercel
const PORT = process.env.PORT || 3100; // Χρήση του port από το περιβάλλον
app.listen(PORT, () => {
  console.log(`[API] Express server is running on port ${PORT}`);
});
