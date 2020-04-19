const { Store } = require('./store.js');

function loadCSS() {

    const { Store } = require('./store.js');

    const store = new Store({
        configName: 'user-preferences',
        defaults: {}
    });

    var style = '<link rel="stylesheet" href="css/style-small.css"></link>';
    if (store.get('styleSize') == 'large') {
        style = '<link rel="stylesheet" href="css/style-large.css"></link>';
        document.getElementById('br?').innerHTML = '<br>';
    }

    document.getElementById('style_me_here').innerHTML = '<link rel="stylesheet" href="./css/sand_box.css">' + style;
    store.set('firstRun', false);
}

function loadData_() {

    const store = new Store({
        configName: 'user-preferences',
        defaults: {}
    });
    const { courses } = store.get('data');
    const fields = store.get('fields');

    var mainPageOut = '';
    var fieldFormOut = '<option value="unselected" selected>Field</option>';

    for (const field of fields) {
        fieldFormOut += '<option value="' + field['name'] + '" style="font-size: small;">';
        fieldFormOut += field['name'] + '</option>';
    }

    document.getElementById('field-form').innerHTML = fieldFormOut;

    for (const course of courses) {
        mainPageOut += '<div class="card mb-4" style="max-width: 18rem;" id>';
        mainPageOut += '<h6 class="card-header h7" style="background-color: ' + course["color"] + ';">';
        mainPageOut += course["name"];

        mainPageOut += '<input type="image" src="images/icons/50/plus.png" class="right resize1" ';
        mainPageOut += 'data-toggle="modal" data-target="#zoomOnField"';
        const arg = "\'" + String(course["name"]) + "\'";
        const action = "const { loadData_zoomField } = require('../js/load_data.js'); loadData_zoomField(" + arg + "); ";
        mainPageOut += 'onclick="' + action + '"/>';

        mainPageOut += '</h6>';
        mainPageOut += '<div class="card-body">';

        for (const task of course["tasks"]) {
            mainPageOut += '<form style="margin-bottom: 0;">';
            mainPageOut += '<div class="form-row form-check">';
            mainPageOut += '<div class="col-auto left">';

            const cmd = "const { checker_ } = require('../js/writer.js'); checker_(); const { loadData_ } = require('../js/load_data.js'); loadData_();";
            const id = String(task["content"]) + String(task["date"])
            mainPageOut += '<input type="checkbox" class="form-check-input xx-small" onclick="' + cmd + '" id="' + id + '"';

            if (task["done"]) {
                mainPageOut += 'checked>';
                mainPageOut += '<label class="form-check-label small" style="text-decoration: line-through;" for="exampleCheck1">';
            } else {
                mainPageOut += '>';
                mainPageOut += '<label class="form-check-label small" for="exampleCheck1">';
            }
            mainPageOut += task["content"] + '</label></div>';
            mainPageOut += '<div class="date right">' + task["date"] + '</div>';
            mainPageOut += '</div></form>';
        }
        mainPageOut += '</div></div>';
    }
    document.getElementById('main-page').innerHTML = mainPageOut;

    if (store.get('firstRun')) {
        loadCSS();
    }
}

function loadData_zoomField(caller) {

    console.log("Caller : " + String(caller));
    const store = new Store({
        configName: 'user-preferences',
        defaults: {}
    });

    const { courses } = store.get('data');

    var zoomModalContent = '';

    for (const course of courses) {
        if (course["name"] == caller) {

            zoomModalContent += '<h6 class="card-header h7" style="background-color: ' + course["color"] + ';">';
            zoomModalContent += course["name"];

            zoomModalContent += '<input type="image" src="images/icons/50/back.png" class="zoomFieldBack" ';
            const cmd1 = "const { loadData_ } = require('../js/load_data.js'); loadData_();"
            zoomModalContent += 'data-dismiss="modal" onclic="' + cmd1 + '"/>';
            zoomModalContent += '</h6>';

            zoomModalContent += '<div class="card-body">';

            for (const task of course["tasks"]) {
                zoomModalContent += '<form style="margin-bottom: 0;">';
                zoomModalContent += '<div class="form-row form-check">';
                zoomModalContent += '<div class="col-auto left">';

                const args = "\'" + String(task["content"]) + "\'" + "," + "\'" + String(course["name"]) + "\'";

                var cmd_store = "const { Store } = require('../js/store.js');";
                cmd_store += "const store = new Store({ configName: 'user-preferences',defaults: { }});";
                cmd_store += "store.set('firstRun', true);";

                var cmd = "const { del_ } = require('../js/writer.js'); del_(" + args + ");";
                cmd += cmd_store;
                const id = "modal-" + String(task["content"]) + String(task["date"]);

                zoomModalContent += '<input type="image" src="images/icons/50/corbeille.png" class="zoomField"';
                zoomModalContent += 'onclick="' + cmd + '" id="' + id + '">';


                if (task["done"]) {
                    zoomModalContent += '<label class="form-check-label small" style="text-decoration: line-through;" for="">';
                } else {
                    zoomModalContent += '<label class="form-check-label small" for="">';
                }
                zoomModalContent += task["content"] + '</label></div>';
                //zoomModalContent += '<div class="date right">' + task["date"] + '</div>';
                zoomModalContent += '</div></form>';
            }
            zoomModalContent += '</div>';
        }
    }
    document.getElementById('zoomModalContent').innerHTML = zoomModalContent;
}


loadData_()

//setInterval(loadData(), 1000)
//setInterval(function () { alert("Hello"); }, 3000);

module.exports = { loadData_, loadData_zoomField, loadCSS };