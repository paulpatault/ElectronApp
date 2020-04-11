function openModal_() {
    window.$ = require('jquery');
    $('#addTaskModal').modal('show');
}

function my_alert(msg) {
    alert(String(msg));
}

module.exports = { openModal_, my_alert }