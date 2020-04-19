const { Store } = require('./store.js');

function loadCSS() {
    const store = new Store({
        configName: 'user-preferences',
        defaults: {}
    });

    var style = document.getElementById('style_me_here');
    while (style.firstChild) {
        style.removeChild(style.firstChild);
    }
    var breaker = document.getElementById('br?');
    while (breaker.firstChild) {
        breaker.removeChild(breaker.firstChild);
    }


    var sandbox = document.createElement('link');
    sandbox.rel = "stylesheet";
    sandbox.href = "./css/sandbox.css";

    var linkStyle = document.createElement('link');
    linkStyle.rel = "stylesheet";

    if (store.get('styleSize') == 'small') {
        linkStyle.href = "./css/style-small.css";
    } else {
        breaker.appendChild(document.createElement('br'));
        linkStyle.href = "css/style-large.css";
    }

    style.appendChild(sandbox);
    style.appendChild(linkStyle);

    store.set('firstRun', false);
}

function loadData_() {

    const store = new Store({
        configName: 'user-preferences',
        defaults: {}
    });

    /////////// FIELDS IN MODAL ///////////
    const fields = store.get('fields');
    var fieldsMain = document.getElementById('field-form');
    while (fieldsMain.firstChild) {
        fieldsMain.removeChild(fieldsMain.firstChild);
    }

    var optionElt = document.createElement('option');
    optionElt.value = "unselected";
    optionElt.setAttribute('selected', '');
    optionElt.textContent = 'Field';
    fieldsMain.appendChild(optionElt);

    for (const field of fields) {
        optionElt = document.createElement('option');
        optionElt.value = String(field['name']);
        optionElt.style.fontSize = "small";
        optionElt.textContent = String(field['name']);
        fieldsMain.appendChild(optionElt);
    }


    /////////// MAIN ///////////
    const { courses } = store.get('data');

    var main = document.getElementById('main-page');
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    for (const course of courses) {

        var divCard = document.createElement("div");
        divCard.classList.add('card', 'mb-4');
        divCard.style.maxWidth = '18rem';


        var h6Title = document.createElement("h6");
        h6Title.classList.add('card-header', 'h7');
        h6Title.style.backgroundColor = (course["color"]);

        h6Title.textContent = course["name"];

        var inputZoomF = document.createElement("input");
        inputZoomF.type = "image";
        inputZoomF.src = "images/icons/50/plus.png";
        inputZoomF.classList.add('right', 'resize1');
        inputZoomF.setAttribute('data-toggle', 'modal');
        inputZoomF.setAttribute('data-target', '#zoomOnField');
        inputZoomF.onclick = () => {
            loadData_zoomField(course["name"]);
        };

        h6Title.appendChild(inputZoomF)
        divCard.appendChild(h6Title);

        var divCardBody = document.createElement("div");
        divCardBody.classList.add('card-body');

        for (const task of course["tasks"]) {
            var form = document.createElement("form");
            var divFormRow = document.createElement("div");
            var divLeft = document.createElement("div");
            var checkbox = document.createElement("input");
            var labelTask = document.createElement("label");
            var divDate = document.createElement("div");

            form.style.marginBottom = '0';

            divFormRow.classList.add('form-row', 'form-check');

            divLeft.classList.add('col-auto', 'left');


            const _id2 = String(task["content"]) + String(task["date"])

            checkbox.type = "checkbox";
            checkbox.classList.add('form-check-input', 'xx-small');
            checkbox.id = _id2;
            checkbox.onclick = () => {
                const { checker_ } = require('./writer.js');
                checker_();
                loadData_();
            };

            labelTask.classList.add('form-check-label', 'small');
            labelTask.setAttribute('for', 'exampleCheck1')
            if (task["done"]) {
                checkbox.setAttribute('checked', '');
                labelTask.style.textDecoration = 'line-through';
            }
            labelTask.textContent = String(task["content"]);

            divLeft.appendChild(checkbox);
            divLeft.appendChild(labelTask);
            divFormRow.appendChild(divLeft);


            divDate.classList.add('date', 'right');
            divDate.textContent = String(task["date"]);

            divFormRow.appendChild(divDate);
            form.appendChild(divFormRow);
            divCardBody.appendChild(form);
        }
        divCard.appendChild(divCardBody);
        main.appendChild(divCard);
    }



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

    var main = document.getElementById('zoomModalContent');
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    for (const course of courses) {
        if (course["name"] != caller) {
            continue;
        }

        var h6Title = document.createElement("h6");
        h6Title.classList.add('card-header', 'h7');
        h6Title.style.backgroundColor = (course["color"]);
        h6Title.textContent = course["name"];

        var inputBack = document.createElement("input");
        inputBack.type = "image";
        inputBack.src = "images/icons/50/back.png";
        inputBack.classList.add('zoomFieldBack');
        inputBack.onclick = () => {
            loadData_();
        }
        inputBack.setAttribute('data-dismiss', 'modal');
        h6Title.appendChild(inputBack);

        var ulContainer = document.createElement("ul");
        ulContainer.classList.add('list-group');

        for (const task of course["tasks"]) {
            var item = document.createElement('li');
            item.classList.add('list-group-item');
            item.style.fontSize = 'small';
            item.style.padding = '2';

            var inputCorbeille = document.createElement("input");
            inputCorbeille.style.margin = '5';
            inputCorbeille.style.marginLeft = '10';

            inputCorbeille.type = 'image';
            inputCorbeille.src = "images/icons/50/corbeille.png";
            inputCorbeille.classList.add('zoomField');
            inputCorbeille.onclick = () => {
                const { del_ } = require('./writer.js');
                del_(task["content"], course["name"]);
                loadData_zoomField(course["name"]);
            }
            inputCorbeille.id = "modal-" + String(task["content"]) + String(task["date"]);

            var divRow = document.createElement('div');
            divRow.classList.add('form-row');
            divRow.appendChild(inputCorbeille);

            var p = document.createElement('div');
            p.textContent = task["content"];
            if (task["done"]) {
                p.style.textDecoration = "line-through";
            }
            p.style.marginTop = '5';
            p.style.marginLeft = '5';
            divRow.appendChild(p);

            item.appendChild(divRow);
            ulContainer.appendChild(item);
        }
        main.appendChild(h6Title);
        main.appendChild(ulContainer);
    }
}


loadData_()

//setInterval(loadData(), 1000)
//setInterval(function () { alert("Hello"); }, 3000);

module.exports = { loadData_, loadData_zoomField, loadCSS };
