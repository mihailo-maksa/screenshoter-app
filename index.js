const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const scrapeImages = require('./utils/scrapeImages');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

(async function connectDB() {
  try {
    await mongoose.connect('your_mongoDB_connection_string', {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();

const Preview = require('./models/Preview');

app.get('/', async (req, res) => {
  try {
    const images = await Preview.find();

    if (!images) {
      return res.status(404).json({ msg: 'No Images Found' });
    }

    res.render('index', { images });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

app.post('/', async (req, res) => {
  try {
    const url = scrapeImages(req.body.url);

    const newImage = new Preview({
      name: req.body.site,
      src: url,
    });

    await newImage.save();

    res.redirect('/');
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
