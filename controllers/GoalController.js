const express = require('express');

class GoalController {
    constructor(progress, goal, name) {
        this.progress = progress;
        this.goal = goal;
        this.name = name;
    }

    updateProgress(new_progress) {
        this.progress = new_progress;
    }

    updateName(new_name) {
        this.name = new_name;
    }

    toJSON() {
        return {
            progress: this.progress,
            goal: this.goal,
            name: this.name
        };
    }
}

module.exports = GoalController;