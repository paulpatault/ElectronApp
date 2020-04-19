const { Store } = require('./store.js');

function letsdelete(fieldname) {
    const { Store } = require('./store.js');
    const store = new Store({ configName: 'user-preferences', defaults: {} });
    const fields = store.get('fields');
    const { courses } = store.get('data');

    const { Course } = require('./course.js');
    let C = new Course(courses, fields);
    const { d_fields, d_courses } = C.defField(fieldname);

    store.set('fields', d_fields);
    store.set('data', { "courses": d_courses });

    const { loadFields_ } = require('./fields_modal.js');
    loadFields_();
    const { loadData_ } = require('./load_data.js');
    loadData_();
}

function loadFields_() {

    const store = new Store({
        configName: 'user-preferences',
        defaults: {}
    });
    const fields = store.get('fields');

    var container = document.getElementById('fields_list');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    var main = document.createElement('div');
    main.style.padding = '10 15';

    for (const field of fields) {
        var item = document.createElement('li');
        item.classList.add('list-group-item');
        item.style.fontSize = 'small';
        item.style.padding = '2';
        item.style.backgroundColor = field['color'];

        var input = document.createElement('input');
        input.style.margin = '5';
        input.style.marginLeft = '10';

        input.type = 'image';
        input.src = '../images/icons/46/cancel.png';
        input.classList.add('zoomField');
        input.onclick = () => {
            letsdelete(field['name']);
            /* 
            const electron = require('electron');
            const url = require('url')
            const path = require('path')
            const BrowserWindow = electron.remote.BrowserWindow;

            let win = new BrowserWindow({
                width: 300,
                height: 300,
                resizable: false,
                //modal: true,
                parent: BrowserWindow.getFocusedWindow()
            });
            win.loadURL(url.format({
                pathname: path.join(__dirname, 'gui/html/none.html'),
                protocol: 'file:',
                slashes: true
            }));

            win.focus();

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this field!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        letsdelete(field['name']);
                        swal("Poof! Your field has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary field is safe!");
                    }
                }); */

        }

        var divRow = document.createElement('div');
        divRow.classList.add('form-row');
        divRow.appendChild(input);

        var p = document.createElement('div');
        p.textContent = field['name'];
        p.style.marginTop = '5';
        p.style.marginLeft = '5';
        divRow.appendChild(p);

        item.appendChild(divRow);
        main.appendChild(item);
    }
    container.appendChild(main);
}


loadFields_();


module.exports = { loadFields_ };