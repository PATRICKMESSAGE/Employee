const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool, Client } = require('pg');

const app = express();
const port = 8100;

// Create a client to connect to the PostgreSQL database
const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employees',
    password: 'message123#',
    port: 5432,
});

// Use the client to connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Connected to database');
    }
});

// Use middleware to parse JSON request bodies and enable CORS
app.use(bodyParser.json());
app.use(cors());

// Define the routes for the REST API
app.get('/employees', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM employees');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/employees', (req, res) => {
    const employee = req.body;
    const sql = `
    INSERT INTO employees (name, email, phone, salary)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
    const values = [employee.name, employee.email, employee.phone, employee.salary];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(result.rows[0]);
        }
    });
});

app.put('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, salary } = req.body;

    try {
        const { rows } = await db.query(
            'UPDATE employees SET name=$1, email=$2, phone=$3, salary=$4 WHERE id=$5 RETURNING *',
            [name, email, phone, salary, id]
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
        const { rows } = await db.query(
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

app.get('/employ', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM employ');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/employ', async (req, res) => {
    const { name, email, phone, leavestartday, leaveendday, duration } = req.body;
    const sql = `
    INSERT INTO employ (name, email,phone, leavestartday, leaveendday, duration)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
    const values = [name, email, phone, leavestartday, leaveendday, duration];

    try {
        const { rows } = await db.query(sql, values);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/employ/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, leavestartday, leaveendday, duration } = req.body;

    try {
        const { rows } = await db.query (
        'UPDATE employ SET name=$1, email=$2, phone$3, leavestartday=$4, leaveendday=$5, duration=$6 WHERE id=$7 RETURNING *',
            [name, email, phone, leavestartday, leaveendday, duration, id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: `Employ with ID ${ id } not found` });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/employ/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await db.query(
      'DELETE FROM employ WHERE id=$1 RETURNING *',
      [id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: `Employ with ID ${ id } not found` });
    } else {
      res.json({ message: `Employ with ID ${ id } deleted` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${ port } `);
});