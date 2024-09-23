const express = require('express');
const router = express.Router();
const pool = require('../pool'); // Assuming you've exported the pool instance

// GET all books
router.get('/books', async (req, res) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM books';
        const result = await client.query(query);
        client.release();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single book
router.get('/books/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM books WHERE id = $1';
        const result = await client.query(query, [req.params.id]);
        client.release();
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new book
router.post('/books', async (req, res) => {
    try {
        const client = await pool.connect();
        const query = 'INSERT INTO books (title, author, published_year) VALUES ($1, $2, $3) RETURNING *';
        const values = [req.body.title, req.body.author, req.body.publishedYear];
        const result = await client.query(query, values);
        client.release();
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a book
router.put('/books/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const query = 'UPDATE books SET title = $1, author = $2, published_year = $3 WHERE id = $4 RETURNING *';
        const values = [req.body.title, req.body.author, req.body.publishedYear, req.params.id];
        const result = await client.query(query, values);
        client.release();
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a book
router.delete('/books/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
        const result = await client.query(query, [req.params.id]);
        client.release();
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.json({ message: 'Book deleted' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;