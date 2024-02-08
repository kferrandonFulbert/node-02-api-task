const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = 3000;

// Créer une pool de connexions à la base de données
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    port: 3307,
    password: '',
    database: 'tasks',
    connectionLimit: 5
});

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route pour obtenir toutes les tâches
app.get('/tasks', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM tache');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) return conn.end();
    }
});

// Route pour ajouter une nouvelle tâche
app.post('/tasks', async (req, res) => {
    const { nom, description } = req.body;
    if (!nom || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('INSERT INTO tasks (nom, description) VALUES (?, ?)', [nom, description]);
        res.status(201).json({ message: 'Task added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) return conn.end();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
