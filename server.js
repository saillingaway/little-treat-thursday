const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Treat } = require('./model');
const app = express();
const PORT = 5001;

// Enable CORS for requests from localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware to parse JSON requests
app.use(express.json());
app.use('/uploads', express.static('uploads')); // serves images of treats from /uploads
  
// Multer config for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});
const upload = multer({ storage });

// Route to add a new treat with photo
app.post('/treats', upload.single('photo'), async (req, res) => {
  // Check if fields are correctly parsed
  console.log('Request Body:', req.body); // Log to check req.body
  console.log('Uploaded File:', req.file); // Log to check req.file

  // Destructure fields from req.body
  const { title, date, description } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newTreat = await Treat.create({ title, date, description, photo });
    res.status(201).json(newTreat);
  } catch (error) {
    console.error('Error creating treat:', error);
    res.status(500).json({ error: 'Failed to create treat' });
  }
  });
  
// TODO: Update a treat by ID
// app.put('/treats/:id', async (req, res) => {
// const { id } = req.params;
// const { title, date, description, photo } = req.body;
// try {
//     const treat = await Treat.findByPk(id);
//     if (treat) {
//     await treat.update({ title, date, description, photo });
//     res.json(treat);
//     } else {
//     res.status(404).json({ error: 'Treat not found' });
//     }
// } catch (error) {
//     res.status(500).json({ error: 'Failed to update treat' });
// }
// });

// TODO: Delete a treat by ID
// app.delete('/treats/:id', async (req, res) => {
// const { id } = req.params;
// try {
//     const treat = await Treat.findByPk(id);
//     if (treat) {
//     await treat.destroy();
//     res.json({ message: 'Treat deleted successfully' });
//     } else {
//     res.status(404).json({ error: 'Treat not found' });
//     }
// } catch (error) {
//     res.status(500).json({ error: 'Failed to delete treat' });
// }
// });

// Basic route for testing the server
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Route to get all treats
app.get('/treats', async (req, res) => {
    try {
      const treats = await Treat.findAll();
      res.json(treats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch treats' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});