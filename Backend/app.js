const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/booksRoute');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection details
const pool = new pg.Pool({
    user: 'your_username',
    host: 'your_host',
    database: 'mybooks',
    password: 'your_password',
    port: 5432
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', bookRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});