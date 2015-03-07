if (apiUrl === undefined) {
    var apiUrl = 'http://api.imaginarium.getsett.net';
}

if (app === undefined) {
    var app = angular.module('legends-of-lunchtime', ['ngMaterial']);
}

function handleUnauthorized() {
    document.location.href = '/legends-of-lunchtime/admin/login.html';
}