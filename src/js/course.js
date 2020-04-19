class Course {
    constructor(courses, fields) {
        this.courses = courses;
        this.fields = fields;
    }

    mset(ndata) {
        this.courses = ndata
    }

    getData() {
        return this.courses
    }

    findIdx(tofind) {
        var idx = 0;
        for (const course of this.courses) {
            if (tofind == course.name) {
                return idx;
            }
            idx += 1;
        }
        return -1;
    }

    addTask(idx, task) {
        this.courses[idx]["tasks"].push(task);
        return this.courses
    }

    isInFields(name) {
        const nname = name.toLowerCase();
        for (const field of this.fields) {
            const fname = field['name'].toLowerCase();
            if (nname == fname) {
                return true;
            }
        }
        return false;
    }

    getFieldColor(name) {
        const nname = name.toLowerCase();
        for (const field of this.fields) {
            const fname = field['name'].toLowerCase();
            if (nname == fname) {
                return field['color'];
            }
        }
        return '';
    }

    isInCourses(name) {
        const nname = name.toLowerCase();
        for (const course of this.courses) {
            const cname = course['name'].toLowerCase();
            if (nname == cname) {
                return true;
            }
        }
        return false;
    }

    addCourse(name, color, tasks) {

        if (this.isInFields(name) && !this.isInCourses(name)) {
            var ncolor = this.getFieldColor(name);
            var course = {
                "name": name,
                "color": ncolor,
                "tasks": []
            };
            this.courses.push(course);
        }

        if (!color) {
            return;
        }

        if (!this.isInFields(name)) {
            this.fields.push({
                "name": name,
                "color": color
            });
        }

        if (!this.isInCourses(name)) {
            var course = {
                "name": name,
                "color": color,
                "tasks": tasks
            };
            this.courses.push(course);
        }
        return this.courses;
    }

    defField(name) {
        var nfield = [];
        var ncourse = [];
        const nname = name.toLowerCase();
        for (const field of this.fields) {
            const fname = field['name'].toLowerCase();
            if (nname != fname) {
                nfield.push(field);
            }
        }
        for (const course of this.courses) {
            const cname = course['name'].toLowerCase();
            if (nname != cname) {
                ncourse.push(course);
            }
        }
        this.field = nfield;
        this.courses = ncourse;
        return nfield;
    }
}

module.exports = { Course: Course }; 