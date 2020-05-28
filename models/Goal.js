const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
    textColor: {
        type: String,
        required: true,
        default: "#000000",
    },
    backgroundColor: {
        type: String,
        required: true,
        default: "#e6e6e6",
    },
    layerOneColor: {
        type: String,
        required: true,
        default: "#00ff00",
    },
    layerTwoColor: {
        type: String,
        required: true,
        default: "#ff3333",
    },
    layerThreeColor: {
        type: String,
        required: true,
        default: "#cc00ff",
    },
});

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
    accessToken: {
        type: String,
        required: true,
        default: "",
    },
    socketToken: {
        type: String,
        required: true,
        default: "",
    },
    colors: ColorSchema,
});

module.exports = Goal = mongoose.model("goal", GoalSchema);
