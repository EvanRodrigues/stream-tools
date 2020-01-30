const path = require('path');

const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000;

//Body parser middleware
app.use(express.json());

//Static folder set up.
app.use(express.static(path.join(__dirname, 'public')));

//Get api routes.
app.use('/api/goal', require('./routes/api/goal'));

app.listen(port);