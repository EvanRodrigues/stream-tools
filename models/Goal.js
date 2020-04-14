const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
    channel: {
        type: String,
        required: true,
    },
    progress: {
        type: Number,
        required: true,
        default: 0.0,
    },
    goal: {
        type: Number,
        required: true,
        default: 100.0,
    },
    name: {
        type: String,
        required: true,
        default: "My Goal",
    },
    socketToken: {
        type: String,
        required: true,
        default: "",
    },
});

module.exports = Goal = mongoose.model("goal", GoalSchema);
