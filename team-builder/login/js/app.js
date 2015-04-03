define(['angularAMD', 'angularRoute', 'angularMaterial'], function (angularAMD) {

    var app = angular.module('sett-site-login', ['ngRoute', 'ngMaterial']);

    app.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple')
            .accentPalette('deep-orange');

        $routeProvider.when('/login/', angularAMD.route({
            templateUrl: 'login/templates/controllers/login.html',
            controller: 'login',
            controllerUrl: 'controllers/login'
        }))
        .otherwise(angularAMD.route({
            templateUrl: 'login/templates/controllers/file-not-found.html',
            controller: 'file-not-found',
            controllerUrl: 'controllers/file-not-found'
        }));

        $locationProvider.html5Mode(true);
    });

    app.apiUrl = 'http://api.imaginarium.getsett.net';

    app.controller('body', function ($scope) {
        $scope.pageLoaded = true;
    });

    return angularAMD.bootstrap(app);
});
