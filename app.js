const express = require('express');
const app = express();
const cors = require('cors')
const UserRoute = require('./src/routes/userRoutes/index.js')
const requestRoute = require('./src/routes/requestRoutes/requestIndex.js')

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use('/api/user', UserRoute)
app.use('/api/feedback', UserRoute)
app.use('/api/request', requestRoute)

//


// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});


// Error Handler (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});


module.exports = app;