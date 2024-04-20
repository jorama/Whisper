require('dotenv').config();  // This loads the .env file variables into process.env

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const Whisper = require('whisper');

console.log(Whisper);  // Log the Whisper object to the console

// const model = Whisper.loadModel('base');  // Commented out this line

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());


app.post('/transcribe', upload.single('audio'), async (req, res) => {
  const path = req.file.path;
  try {
    const result = await model.transcribe(path);
    fs.unlinkSync(path); // Clean up the audio file
    res.json({ text: result.text });
  } catch (error) {
    res.status(500).send('Error in transcription');
  }
});

app.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get('https://api.foursquare.com/v2/venues/search', {
      params: {
        client_id: process.env.FOURSQUARE_CLIENT_ID,
        client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
        near: 'New York', // Example static location
        query: query,
        v: process.env.FOURSQUARE_VERSION
      }
    });
    res.json(response.data.response.venues);
  } catch (error) {
    res.status(500).send('Error in Foursquare API');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
