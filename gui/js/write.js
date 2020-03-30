var jsonfile;
const fs = require('fs');


function submitFunc() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            write(this);
        }
    };
    xhttp.open("GET", "data/.test.json", true);
    xhttp.send();

    majData__();
}

function findIdx(tofind, courses) {
    var idx = 0;
    for (const course of courses) {
        if (tofind == course.name) {
            return idx;
        }
        idx += 1;
    }
    return -1;
}

function write(xhttp) {

    jsonfile = JSON.parse(xhttp.responseText);
    //    jsonfile = addCourse(jsonfile, "course name", "green", []);

    var m_task = getInputs();
    var m_course = document.getElementById('field-form').value;

    addTask(jsonfile.courses[findIdx(m_course, jsonfile.courses)], m_task);

    var obj = JSON.stringify(jsonfile);
    fs.writeFile("gui/data/.test.json", obj, function (err) {
        if (err) {
            console.log('[ERROR] couldn\'t access file...');
            return console.log(err);
        }
        else {
            console.log("The file was saved!");
        }
    });

}

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


function cleanDate(date) {
    var month = date.substring(5, 7);
    var day = date.substring(8);
    return day + "/" + month;
}

function getInputs() {
    var taskContent = document.getElementById('task-input').value;
    var date = document.getElementById('date-input').value;
    var done = document.getElementById('todo-done').value;
    var course = document.getElementById('field-form').value;

    var date = cleanDate(date);

    var done = (done == 'true');

    var task = {
        "content": taskContent,
        "date": date,
        "done": done
    };

    return task;
}