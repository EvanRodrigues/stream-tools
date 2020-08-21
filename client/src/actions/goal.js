export const setGoal = (goal) => {
    return {
        type: "SET_GOAL",
        payload: goal,
    };
};

export const setProgress = (progress) => {
    return {
        type: "SET_PROGRESS",
        payload: progress,
    };
};

export const setTarget = (target) => {
    return {
        type: "SET_TARGET",
        payload: target,
    };
};

export const setName = (name) => {
    return {
        type: "SET_NAME",
        payload: name,
    };
};
