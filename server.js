const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 4200;

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employees',
    password: 'message123#',
    port: 5432,
});

// Use middleware to parse JSON request bodies and enable CORS
app.use(bodyParser.json());
app.use(cors());

// Define the routes for the REST API
app.get('/employees', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM employees');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/employees', async (req, res) => {
    const { name, email, salary, phone } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO employees (name, email, salary, phone) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, salary, phone]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, salary, phone } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE employees SET name=$1, email=$2, salary=$3, phone=$4 WHERE id=$5 RETURNING *',
            [name, email, salary, phone, id]
        );
        if (rows.length === 0) {
            res.status(404).json({ error: `Employee with ID ${id} not found` });
        } else {

            res.json(rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            'DELETE FROM employees WHERE id=$1 RETURNING *',
            [id]
        );
        if (rows.length === 0) {
            res.status(404).json({ error: `Employee with ID ${id} not found` });
        } else {
            res.json({ message: `Employee with ID ${id} deleted` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});