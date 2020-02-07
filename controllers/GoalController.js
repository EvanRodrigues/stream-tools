const express = require('express');

class GoalController {
    constructor(progress, goal, name, sub_val) {
        this.progress = progress;
        this.goal = goal;
        this.name = name;
        this.sub_val = sub_val;
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
            name: this.name,
            sub_val: this.sub_val
        };
    }
}

module.exports = GoalController;