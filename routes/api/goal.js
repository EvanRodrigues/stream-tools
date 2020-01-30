const express = require('express');
const router = express.Router();
//const storageController = require('./controllers/storageController');

router.get('/', (req, res) => {
    let goal = require('../../public/data/data.json');
    res.json(goal);
});

//Resets the goal to 0.
router.get('/reset');

//Updates the entire goal.
router.post('/update');

//Updates the goal's name.
router.post('/updateName/:name', (req, res) => {
    res.send(req.body);
});

module.exports = router;