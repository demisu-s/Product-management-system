const { config } = require('dotenv');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');
const cors = require('cors');

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;
// log request
app.use(morgan('tiny'));

// MongoDB connection
connectDB();

// Parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

// Load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/image', express.static(path.resolve(__dirname, "assets/image")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// Enable CORS
app.use(cors());

// Load routes to serve app
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
