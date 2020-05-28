const express = require("express");
const router = express.Router();
const sockets = require("../../sockets");

//Goal Model
const Goal = require("../../models/Goal");

//@route    GET api/goal
//@desc     Get all goals
//@access   Public
router.get("/openSocket/:channel", (req, res) => {
    Goal.findOne({ channel: req.params.channel }).then((goal) => {
        sockets.setUpSocket(goal.socketToken);
        res.json(goal);
    });
});

//@route    GET api/goal
//@desc     Get all goals
//@access   Public
router.get("/", (req, res) => {
    Goal.find().then((goals) => res.json(goals));
});

//@route    GET api/goal/match/:token
//@desc     Get the goal that matches the access token
//@access   Public
router.get("/match/:token", (req, res) => {
    Goal.findOne({ accessToken: req.params.token })
        .then((goal) => {
            res.json({
                channel: goal.channel,
                progress: goal.progress,
                goal: goal.goal,
                name: goal.name,
                colors: goal.colors,
            });
        })
        .catch((err) => res.status(404).json({ success: false })); //token not found;
});

//@route    POST api/goal
//@desc     Creates a new goal
//@access   Public
router.post("/", (req, res) => {
    const newGoal = new Goal({
        channel: req.body.channel,
        progress: req.body.progress,
        goal: req.body.goal,
        name: req.body.name,
        accessToken: req.body.accessToken,
        socketToken: req.body.socketToken,
        colors: {},
    });

    newGoal.save().then((item) => res.json(item));
});

//@route    DELETE api/goal/:id
//@desc     Deletes a goal
//@access   Public
router.delete("/:id", (req, res) => {
    Goal.findById(req.params.id)
        .then((goal) => item.remove().then(() => res.json({ success: true })))
        .catch((err) => res.status(404).json({ success: false })); //id not found
});

//@route    POST api/goal
//@desc     Updates the progress of the goal
//@access   Public
router.post("/updateProgress/:channel", (req, res) => {
    Goal.findOne({ channel: req.params.channel }).then((goal) => {
        goal.progress = req.body.progress;
        goal.save().then((goal) => res.json(goal));
    });
});

//@route    POST api/goal
//@desc     Updates the progress of the goal
//@access   Public
router.post("/updateToken/:channel", (req, res) => {
    Goal.findOne({ channel: req.params.channel }).then((goal) => {
        goal.socketToken = req.body.socketToken;
        goal.save().then((goal) => res.json(goal));
    });
});

//@route    GET api/goal/update/:channel
//@desc     Updates the entire goal based on :channel param.
//@access   Public
router.post("/update/:channel", (req, res) => {
    Goal.findOne({ channel: req.params.channel }).then((goal) => {
        goal.progress = req.body.progress;
        goal.goal = req.body.goal;
        goal.name = req.body.name;
        goal.colors = req.body.colors;
        goal.save().then((goal) => res.json(goal));
    });
});

//@route    GET api/goal/channel/:channel
//@desc     Get the goal object from the :channel
//@access   Public
//TODO      Could have this use twitch oauth to access the correct goal
router.get("/channel/:channel", (req, res) => {
    Goal.findOne({ channel: req.params.channel }).then((goal) =>
        res.json(goal)
    );
});

//@route    GET api/goal/accessToken/:token
//@desc     Get the accessToken from the :token
//@access   Public
//TODO      Make this require authentication
router.get("/channelInfo/:token", (req, res) => {
    Goal.findOne({ socketToken: req.params.token }).then((goal) =>
        res.json({
            channel: goal.channel,
            progress: goal.progress,
            accessToken: goal.accessToken,
        })
    );
});

module.exports = router;
