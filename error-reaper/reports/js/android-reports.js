if (app === undefined) {
    var app = angular.module('android-reports', ['ngMaterial']);
}

app.controller('android-reports-controller', function ($scope, $mdDialog) {

    $.get('http://api.imaginarium.getsett.net/error-reporting/reports/android?take=20&sort=CrashDate desc')
    .success(function (reports) {
        $scope.reports = reports;
    });

    $scope.deleteReport = function (report) {
    } 
});