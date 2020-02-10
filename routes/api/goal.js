const express = require('express');
const fs = require('fs');
const router = express.Router();
const GoalController = require('../../controllers/GoalController');
let goal = require('../../public/data/data.json');

//Goal Model
const Goal = require('../../models/Goal');

//@route    GET api/goal
//@desc     Get all goals
//@access   Public  
router.get('/', (req, res) => {
    Goal.find()
        .then(goals => res.json(goals));
});


//@route    GET api/goal/:channel
//@desc     Get all goals
//@access   Public
//TODO      Could have this use twitch oauth to access the correct goal  
router.get('/:channel', (req, res) => {
    Goal.findOne({ channel: req.params.channel })
        .then(goal => res.json(goal));
});


//@route    POST api/goal
//@desc     Creates a new goal
//@access   Public
router.post('/', (req, res) => {
    const newGoal = new Goal({
        channel: req.body.channel,
        progress: req.body.progress,
        goal: req.body.goal,
        name: req.body.name,
        sub_val: req.body.sub_val
    });

    newGoal.save().then(item => res.json(item));
});


//@route    DELETE api/goal/:id
//@desc     Deletes a goal
//@access   Public
router.delete('/:id', (req, res) => {
    Goal.findById(req.params.id)
        .then(goal => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false })); //id not found
});


//@route    POST api/goal
//@desc     Updates the progress of the goal
//@access   Public
router.post('/updateProgress/:channel', (req, res) => {
    Goal.findOne({ channel: req.params.channel })
        .then(goal => {
            goal.progress = req.body.progress;
            goal.save()
                .then(goal => res.json(goal));
        });

    /*let curr_goal = new GoalController(goal["progress"], goal["goal"], goal["name"], goal["sub_val"]);
    curr_goal.updateProgress(parseFloat(req.body.progress));

    fs.writeFile('./public/data/data.json', JSON.stringify(curr_goal.toJSON(), null, 2), err => {
        if (err) console.log(err);
    })

    res.json(curr_goal.toJSON());*/
})


//@route    GET api/goal/accessToken
//@desc     Gets the streamlabs access token
//@access   Public
//TODO      Make this require authentication
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



//Updates the goal's name.
router.post('/updateName/:name', (req, res) => {
    res.send(req.body);
});

module.exports = router;