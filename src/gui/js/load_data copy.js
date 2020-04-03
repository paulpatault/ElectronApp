var jsonfile;

var openJSON = function () {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadData(this);
        }
    };
    xhttp.open("GET", "data/.test.json", true);
    xhttp.send();
}

openJSON()
setInterval(openJSON(), 10000)

function majData__() {
    openJSON();
    location.reload();
}


function checker_() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            checker__(this);
        }
    };
    xhttp.open("GET", "data/.test.json", true);
    xhttp.send();
}

function checker__(xhttp) {
    jsonfile = JSON.parse(xhttp.responseText);

    var courses = jsonfile.courses;

    console.log('coucou');
    for (const course of courses) {
        for (const task of course["tasks"]) {

            var id = String(task["content"]);
            if (document.getElementById(id).checked) {
                task["done"] = true;
            } else {
                task["done"] = false;
            }
        }
    }

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
    majData__();
}

function loadData(xhttp) {
    jsonfile = JSON.parse(xhttp.responseText);
    var courses = jsonfile.courses;

    var mainPageOut = '';
    var idx = 0;
    var fieldFormOut = '<option selected>Field</option>';


    for (const course of courses) {

        mainPageOut += '<div class="card mb-4" style="max-width: 18rem;">';
        mainPageOut += '<h6 class="card-header back-' + course["color"] + '">';
        mainPageOut += course["name"];
        /* 
            class="collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" 

            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#addTaskModal">
                <div class="input-group input-group-sm mb-3 form-row">
                    <img src="images/icons/50/menu.png" class="modal_att" />
                    <input type="text" class="form-control" aria-label="Small"
                        aria-describedby="inputGroup-sizing-xs" placeholder="Field Name">
                </div>
                <div class="input-group input-group-sm mb-3 form-row">
                    <img src="images/icons/40/palette.png" class="modal_att" />
                    <input type="color" class="dropdown-item hidden small form-control" aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm" value="#ccffcc">
                </div>
            </div>

        */
        mainPageOut += '<img src="images/icons/50/plus.png" class="right resize1">';
        mainPageOut += '</h6>';
        mainPageOut += '<div class="card-body">';

        idx += 1;
        fieldFormOut += '<option value="' + course["name"] + '" style="font-size: small;">';
        fieldFormOut += course["name"] + '</option>';

        for (const task of course["tasks"]) {
            mainPageOut += '<form style="margin-bottom: 0;">';
            mainPageOut += '<div class="form-row form-check">';
            mainPageOut += '<div class="col-auto left">';
            mainPageOut += '<input type="checkbox" class="form-check-input x-small" onclick="checker_()" id="' + task["content"] + '"';

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
    document.getElementById('field-form').innerHTML = fieldFormOut;
}


/*
<form style="margin-bottom: 0;">
    <div class="form-row form-check">
        <div class="col-auto left">
            <input type="checkbox" class="form-check-input x-small" id="exampleCheck1">
            <label class="form-check-label small" for="exampleCheck1">
                EX
            </label>
        </div>
        <div class="date right">
            30/03
        </div>
    </div>
</form>
*/