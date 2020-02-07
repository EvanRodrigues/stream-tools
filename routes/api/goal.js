const express = require('express');
const fs = require('fs');
const router = express.Router();
const GoalController = require('../../controllers/GoalController');
let goal = require('../../public/data/data.json');

router.get('/', (req, res) => {
    res.json(goal);
});

router.get('/accessToken', (req, res) => {
    const token = process.env.STREAMLABS_API_TOKEN;
    const json_output = { "token": token };
    res.json(json_output);
})

//Resets the goal to 0.
router.get('/reset');

//Updates the entire goal.
router.post('/update', (req, res) => {
    const data = req.body;
    let new_goal = new GoalController(data.progress, data.goal, data.name, data.sub_val);

    fs.writeFile('./public/data/data.json', JSON.stringify(new_goal.toJSON(), null, 2), err => {
        if (err) console.log(err);
    })

    res.json(new_goal.toJSON());
});

//Updates the progress of the goal to :progress
//Saves the progress to data.json
router.post('/updateProgress', (req, res) => {
    let curr_goal = new GoalController(goal["progress"], goal["goal"], goal["name"], goal["sub_val"]);
    curr_goal.updateProgress(parseFloat(req.body.progress));

    fs.writeFile('./public/data/data.json', JSON.stringify(curr_goal.toJSON(), null, 2), err => {
        if (err) console.log(err);
    })

    res.json(curr_goal.toJSON());
})

//Updates the goal's name.
router.post('/updateName/:name', (req, res) => {
    res.send(req.body);
});

module.exports = router;