const path = require('path');
const mongoose = require('mongoose');
const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000;

//Body parser middleware
app.use(express.json());

// DB Config
let db;

//Dev
db = require('./config/keys').mongoURI;
if (db == null) {
    db = process.env.MONGO_URI;
}

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Static folder set up.
app.use(express.static(path.join(__dirname, 'public')));

//Get api routes.
app.use('/api/goal', require('./routes/api/goal'));

app.listen(port);