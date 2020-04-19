const { Store } = require('./store.js');


function loadFields_() {

    const store = new Store({
        configName: 'user-preferences',
        defaults: {}
    });
    const fields = store.get('fields');

    var fieldFormOut = '<div class="" style="padding:20" >';

    for (const field of fields) {
        fieldFormOut += '<li class="list-group-item" ';
        fieldFormOut += 'style="font-size: small; padding:2;';
        fieldFormOut += 'background-color:' + field['color'] + '">';

        var cmd = "const { Course } = require('../../js/course.js');";
        cmd += "const { Store } = require('../../js/store.js');";
        cmd += "const store = new Store({configName: 'user-preferences',defaults: {}});";
        cmd += "var fields = store.get('fields');";
        cmd += "let kourseC = new Course(courses, fields);";
        const arg = "\'" + field['name'] + "\'";
        cmd += "fields = kourseC.defField(" + arg + ");";


        cmd += "store.set('fields', fields);";
        cmd += "console.log(\'gyft\')";


        fieldFormOut += '<input style="padding-top:2" type="image" ';
        fieldFormOut += 'src="../images/icons/50/corbeille.png" class="zoomField"';
        fieldFormOut += 'onclic="' + cmd + '">';

        fieldFormOut += field['name'];
        fieldFormOut += '</li>';
    }
    fieldFormOut += '</div>';
    document.getElementById('fields_list').innerHTML = fieldFormOut;

}


loadFields_();


