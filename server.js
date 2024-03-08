const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MongoDB connection string, replace "your_database_connection_string" with your MongoDB connection string
mongoose.connect('your_database_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const itemSchema = new mongoose.Schema({
    titulo: String,
    precio: String,
    imagenSrc: String
});

const Item = mongoose.model('Item', itemSchema);

app.use(cors());
app.use(bodyParser.json());

// Endpoint to save items to the database
app.post('/api/items', (req, res) => {
    const { titulo, precio, imagenSrc } = req.body;

    const newItem = new Item({
        titulo,
        precio,
        imagenSrc
    });

    newItem.save()
        .then(() => res.status(201).json({ message: 'Item added to the database' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
