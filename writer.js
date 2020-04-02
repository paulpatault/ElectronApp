const { loadData } = require('./load_data.js');
const { Store } = require('./store');

function submitFunc() {
    write();
    location.reload();
}

function findIdx(tofind, courses) {
    var idx = 0;
    for (const course of courses) {
        //console.log(course["name"])
        console.log(typeof course)
        if (tofind == course.name) {
            console.log(course["name"])
            return idx;
        }
        idx += 1;
    }
    return -1;
}

function writer_() {
    console.log('yes! you\'re in :D');

    const data = new Store({
        configName: 'user-preferences',
        defaults: {}
    });
    let { courses } = data.get('data');

    //console.log(typeof courses);
    //courses = Array(courses);
    //console.log(typeof courses);
    var new_task = taskInput();
    //console.log(new_task);
    var course = courseInput();
    //console.log(course);

    let idx = findIdx(course, courses);
    console.log('idx = ' + String(idx));
    if (idx == -1) {
        console.console.warn('| idx == -1 |');
        return;
    }
    courses = addTask(courses, idx, new_task);

    /* for (const course of courses) {
        for (const task of course["tasks"]) {

        }
    } */

    data.set('data', { "courses": courses });
    //loadData();
}

module.exports = { writer_ };

function addTask(course, idx, task) {
    //console.log(course[idx]["tasks"]);
    //console.log(typeof course[idx]);
    course[idx]["tasks"].push(task);
    return course
}

function courseInput() {
    var course = document.getElementById('field-form').value;

    return course;
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

function taskInput() {
    var task_input = document.getElementById('task-input');
    var date_input = document.getElementById('date-input');
    var done_input = document.getElementById('todo-done');

    var task = {
        "content": task_input.value,
        "date": cleanDate(date_input.value),
        "done": (done_input.value == 'true')
    };

    return task;
}
