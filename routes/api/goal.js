const express = require("express");
const router = express.Router();
const sockets = require("../../sockets");
//Goal Model
const Goal = require("../../models/Goal");

const validateName = (nameInput) => {
    if (!nameInput) return false;
    if (typeof nameInput != "string") return false;
    return nameInput.length > 0;
};

const validateDollars = (dollarInput) => {
    if (dollarInput == null) return false;

    try {
        //check if input is a number
        dollarInput = parseFloat(dollarInput);
        dollarInput = dollarInput.toFixed(2);
    } catch (err) {
        return false;
    }

    const dollarRegex = /^\d+\.\d\d$/;
    return dollarRegex.test(dollarInput);
};

const validateTokens = (tokenInput) => {
    if (!tokenInput) return false;

    if (typeof tokenInput != "string") return false;
    if (tokenInput.length == 0) return false;

    return true;
};

const validateColors = (colorInput) => {
    if (!colorInput) return false;
    const colorRegex = /^\#([(a-f|\d)]{6}|[(a-f|\d)]{3})$/;

    try {
        if (!colorRegex.test(colorInput["textColor"])) return false;
        if (!colorRegex.test(colorInput["backgroundColor"])) return false;
        if (!colorRegex.test(colorInput["layerOneColor"])) return false;
        if (!colorRegex.test(colorInput["layerTwoColor"])) return false;
        if (!colorRegex.test(colorInput["layerThreeColor"])) return false;
    } catch (err) {
        return false;
    }

    return true;
};

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

//@route    GET api/goal/PING
//@desc     Pings the server to keep server up.
//@access   Public
router.get("/PING", (req, res) => {
    res.json({});
});

//@route    GET api/goal/match/:token
//@desc     Get the goal that matches the access token
//@access   Public
router.get("/match/:user", (req, res) => {
    Goal.findOne({ channel: req.params.user })
        .then((goal) => {
            const tokenSet = goal.socketToken === "empty" ? false : true;

            res.json({
                channel: goal.channel,
                progress: goal.progress,
                goal: goal.goal,
                name: goal.name,
                accessToken: goal.accessToken,
                tokenSet: tokenSet,
                colors: goal.colors,
            });
        })
        .catch((err) => res.status(404).json({ success: false })); //token not found;
});

router.get("/matchToken/:accessToken", (req, res) => {
    Goal.findOne({ accessToken: req.params.accessToken })
        .then((goal) => {
            res.json({
                channel: goal.channel,
                progress: goal.progress,
                goal: goal.goal,
                name: goal.name,
                accessToken: goal.accessToken,
                colors: goal.colors,
            });
        })
        .catch((err) => res.status(404).json({ success: false })); //token not found;
});

//@route    POST api/goal
//@desc     Creates a new goal
//@access   Public
router.post("/", (req, res) => {
    if (!validateName(req.body.channel)) {
        res.json({ error: "invalid channel name" });
        res.status(400);
        return;
    }

    /*
     * Generates a random alpha-numeric string with a length between 25 and 30 characters
     */
    const generateAccessToken = () => {
        const availableChars =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const limit = Math.random() * (30 - 25) + 25;
        let accessToken = "";

        for (let i = 0; i < limit; i++) {
            accessToken +=
                availableChars[
                    Math.floor(Math.random() * availableChars.length)
                ];
        }

        return accessToken;
    };

    const defaults = {
        progress: 0,
        goal: 100,
        name: "Test Goal",
        colors: {
            textColor: "#000000",
            backgroundColor: "#e6e6e6",
            layerOneColor: "#00ff00",
            layerTwoColor: "#ff3333",
            layerThreeColor: "#cc00ff",
        },
    };

    const accessToken = generateAccessToken();

    const newGoal = new Goal({
        channel: req.body.channel,
        progress: defaults.progress,
        goal: defaults.goal,
        name: defaults.name,
        accessToken: accessToken,
        socketToken: "empty",
        colors: defaults.colors,
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

//@route    PUT api/goal/reset/:channel
//@desc     Resets the current goal to 0 dollars
//@access   Public
router.put("/reset/:channel", (req, res) => {
    Goal.findOne({ channel: req.params.channel }).then((goal) => {
        if (goal.channel == req.params.channel) {
            goal.progress = 0.0;
            goal.save().then((goal) => res.json(goal));
        }
    });
});

//@route    PUT api/goal/setSocketToken/:channel
//@desc     Sets the StreamLabs socketToken of the channel's goal
//@access   Public
router.put("/setSocketToken/:channel", (req, res) => {
    Goal.findOne({ channel: req.params.channel }).then((goal) => {
        if (goal.channel == req.params.channel) {
            goal.socketToken = req.body.socketToken;
            goal.save().then((goal) => res.json(goal));
        }
    });
});

//@route    PUT api/goal
//@desc     Updates the progress of the goal
//@access   Public
router.put("/updateProgress/:channel", (req, res) => {
    if (!validateDollars(req.body.progress)) {
        res.json({ error: "invalid input" });
        res.status(400);
        return;
    }

    Goal.findOne({ channel: req.params.channel }).then((goal) => {
        goal.progress = req.body.progress;
        goal.save().then((goal) => res.json(goal));
    });
});

//@route    PUT api/goal/update/:channel
//@desc     Updates the entire goal based on :channel param.
//@access   Public
router.put("/update/:channel", (req, res) => {
    if (
        !validateDollars(req.body.progress) ||
        !validateDollars(req.body.goal) ||
        !validateName(req.body.name) ||
        !validateColors(req.body.colors)
    ) {
        res.json({ error: "invalid input" });
        res.status(400);
        return;
    }

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
