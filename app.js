const express = require('express');
const app = express();
const cors = require('cors')
const UserRoute = require('./src/routes/userRoutes/index.js')
const requestRoute = require('./src/routes/requestRoutes/requestIndex.js')
const AppError = require('./src/utils/appError.js')
const globalErrorHandler = require('./src/controllers/errorController/errorController.js')

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
app.all('/{*splat}', (req, res, next) => {
    next(new AppError(`${req.originalUrl} not found on this server`, 404))
});


// Error Handler (optional)
app.use(globalErrorHandler);


module.exports = app;