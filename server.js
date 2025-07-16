require('dotenv').config();
const conn = require('./src/config/dbConnection')
const app = require('./app');
conn()
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});