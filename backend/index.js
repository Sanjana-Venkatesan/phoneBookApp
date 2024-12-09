const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const url = 'mongodb://localhost:27017/database'; // Local MongoDB connection string
mongoose.set('strictQuery', false);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB locally');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });
// Schema and Model
const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Entry = mongoose.model('Entry', phoneSchema,'phoneApp');

// Routes
// Get all entries
app.get('/api/persons', (request, response) => {
  Entry.find({})
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.status(500).json({ error: 'Error fetching data' });
    });
});

// Add a new entry
app.post('/api/persons', (request, response) => {
  const { name, phone } = request.body;

  if (!name || !phone) {
    return response.status(400).json({ error: 'Name or number missing' });
  }

  const entry = new Entry(
    { name:name,
      phone:phone });

  entry
    .save()
    .then((savedEntry) => response.json(savedEntry))
    .catch((error) => response.status(500).json({ error: 'Error saving entry' }));
});

// Delete an entry by ID
app.delete('/api/persons/:id', (request, response) => {
  const { id } = request.params;

  Entry.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: 'Entry not found' });
      }
    })
    .catch((error) => response.status(500).json({ error: 'Error deleting entry' }));
});

// Update an entry by ID

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
