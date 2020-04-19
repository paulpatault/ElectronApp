const { Course } = require("./course.js");
const { Store } = require('./store.js');

class Utils {
    static cleanDate(date) {
        if (date == "") {
            return "../..";
        }
        var month = date.substring(5, 7);
        var day = date.substring(8);
        return day + "/" + month;
    }

    static mremove(arr, value, at) {
        let res = [];
        for (const elt of arr) {
            if (elt[at] != value) {
                res.push(elt);
            }
        }
        return res;
    }
}

class Inputs {
    static course(courses, to_iter) {
        var course = document.getElementById('field-form').value;
        //var color = document.getElementById('color-form').value;
        courses.addCourse(course, null, []);

        if (course != "unselected") {
            return {
                n_courses: courses.getData(),
                course: course,
                add: false
            };
        }
        course = document.getElementById('new-field-form').value;

        if (course == "" || course == " ") {
            alert("Please select a field");
            return {
                n_courses: courses.getData(),
                course: null,
                add: true
            };;
        }

        const course_lower = course.toLowerCase();

        for (const m_course of to_iter) {
            const name = m_course['name'].toLowerCase();
            if (course_lower == name) {
                alert("This field already exist");
                return {
                    n_courses: courses.getData(),
                    course: null,
                    add: false
                };;
            }
        }

        var color = document.getElementById('color-form').value;
        courses.addCourse(course, color, []);
        return {
            n_courses: courses.getData(),
            course: course,
            add: true
        };
    }

    static task() {
        var task_input = document.getElementById('task-input').value;
        var date_input = document.getElementById('date-input').value;
        var done_input = document.getElementById('todo-done').value;

        if (task_input == "") {
            alert('Please give a name to your task')
            return null;
        }
        if (done_input == "") {
            done_input = 'false';
        }

        var task = {
            "content": task_input,
            "date": Utils.cleanDate(date_input),
            "done": (done_input == 'true')
        };

        return task;
    }
}

function writer_() {
    const data = new Store({
        configName: 'user-preferences',
        defaults: {}
    });

    let { courses } = data.get('data');
    let fields = data.get('fields');

    let kourseC = new Course(courses, fields);

    var new_task = Inputs.task();
    if (!new_task) {
        return;
    }

    var { n_courses, course, add } = Inputs.course(kourseC, fields);

    if (!course) {
        return;
    }

    var idx;
    if (add) {
        kourseC.mset(n_courses);
    }

    idx = kourseC.findIdx(course);

    if (idx == -1) {
        swal('[SYSTEM ERROR]', 'Please try again...', "error");
        return;
    }

    kourseC.addTask(idx, new_task);
    data.set('data', { "courses": kourseC.getData() });
}

function checker_() {

    const data = new Store({
        configName: 'user-preferences',
        defaults: {}
    });
    let { courses } = data.get('data');

    for (const course of courses) {
        for (const task of course["tasks"]) {

            var id = String(task["content"]) + String(task["date"]);
            if (document.getElementById(id).checked) {
                task["done"] = true;
            } else {
                task["done"] = false;
            }
        }
    }
    data.set('data', { "courses": courses });
}

function del_(task_content, course) {

    const store = new Store({
        configName: 'user-preferences',
        defaults: {}
    });

    let { courses } = store.get('data');

    let kourseC = new Course(courses);

    var idx = kourseC.findIdx(course)

    courses[idx]["tasks"] = Utils.mremove(courses[idx]["tasks"], task_content, "content");

    if (courses[idx]["tasks"].length == 0) {
        courses = Utils.mremove(courses, course, "name");
    }

    store.set('data', { "courses": courses });
}

module.exports = { writer_, checker_, del_ };

