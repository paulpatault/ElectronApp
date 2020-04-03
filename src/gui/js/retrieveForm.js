var jsonfile;
const fs = require('fs');



function addTask(course, task) {
    course.tasks.push(task);
    return course
}

function addCourse(file, name, color, tasks) {
    var course = {
        "name": name,
        "color": color,
        "tasks": tasks
    }
    course = addTask(course, "en plus...");
    file["courses"].push(course);
    return file;
}