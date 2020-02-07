function getGoal() {
    const url = window.location.origin;

    $.ajax({
        type: "GET",
        url: url + "/api/goal",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#progress").val(data["progress"]);
            $("#goal_target").val(data["goal"]);
            $("#goal_name").val(data["name"]);
            $("#sub_val").val(data["sub_val"]);
        },
        failure: function (err) { console.log(err) }
    })
}

getGoal();
