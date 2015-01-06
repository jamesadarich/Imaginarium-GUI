if (apiUrl === undefined) {
    var apiUrl = 'http://api.getsett.net';
}

if (app === undefined) {
    var app = angular.module('sett-site', ['ngMaterial']);
}
app.controller('side-nav-controller', function ($scope, $mdSidenav) {
    $scope.openLeftMenu = function () {
        $mdSidenav('left').toggle();
    };
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryColor('purple')
      .accentColor('green');
});