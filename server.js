require('dotenv').config();
const conn = require('./src/config/dbConnection')
process.on('uncaughtException', err => {
    console.log(err.name, err.message)
    console.log('unhandled rejection caught shutting down')
    process.exit(1)
})
const app = require('./app');
conn()
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('unhandled rejection caught shutting down')
    server.close(() => { process.exit(1) })
})