const express = require('express');
const fs = require('fs');
const router = express.Router();
const GoalController = require('../../controllers/GoalController');

//Goal Model
const Goal = require('../../models/Goal');

//@route    GET api/goal
//@desc     Get all goals
//@access   Public  
router.get('/', (req, res) => {
    Goal.find()
        .then(goals => res.json(goals));
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
});


//@route    GET api/goal/update/:channel
//@desc     Updates the entire goal based on :channel param.
//@access   Public
router.post('/update/:channel', (req, res) => {
    Goal.findOne({ channel: req.params.channel })
        .then(goal => {
            goal.progress = req.body.progress;
            goal.goal = req.body.goal;
            goal.name = req.body.name;
            goal.sub_val = req.body.sub_val;
            goal.save()
                .then(goal => res.json(goal));
        });
});


//@route    GET api/goal/channel
//@desc     Gets the channel being used from env variable.
//@access   Public
router.get('/channel', (req, res) => {
    const channel = process.env.CHANNEL;
    const json_output = { "channel": channel };
    res.json(json_output);
});


//@route    GET api/goal/channel/:channel
//@desc     Get the goal object from the :channel
//@access   Public
//TODO      Could have this use twitch oauth to access the correct goal  
router.get('/channel/:channel', (req, res) => {
    Goal.findOne({ channel: req.params.channel })
        .then(goal => res.json(goal));
});


//@route    GET api/goal/accessToken
//@desc     Gets the streamlabs access token
//@access   Public
//TODO      Make this require authentication
router.get('/accessToken', (req, res) => {
    const token = process.env.STREAMLABS_API_TOKEN;
    const json_output = { "token": token };
    res.json(json_output);
});


module.exports = router;