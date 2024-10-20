const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const emailRoutes = require('../routes/emailRoutes');

const app = express();


app.use(cors({
    origin: 'https://artachanidis-john-portofolio.vercel.app', // Το domain του front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Οι επιτρεπόμενες μέθοδοι HTTP
    credentials: true // Επιτρέπει την αποστολή cookies, αν χρειαστεί
}));

app.use(bodyParser.json());


app.use('/', emailRoutes);

module.exports = app;
