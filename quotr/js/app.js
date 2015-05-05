define(['angularAMD', 'angularMaterial', 'angularRoute'], function (angularAMD) {

    var app = angular.module('sett-site', ['ngMaterial', 'ngRoute']);

    app.token = JSON.parse(localStorage.getItem('token'));

    app.service('siteShell', function () {
        var pageTitle = '';
        var toolbarFab = undefined;

        var getTitle = function () {
            return pageTitle;
        }

        var setTitle = function (title) {
            pageTitle = title;
        }

        var getToolbarFab = function () {
            return toolbarFab;
        }

        var setToolbarFab = function (fab) {
          toolbarFab = fab;
        }

        return {
            getTitle: getTitle,
            setTitle: setTitle,
            getToolbarFab: getToolbarFab,
            setToolbarFab: setToolbarFab
        };

    });


    app.service('searchEngineOptimiser', function () {
        var metaTitle = '';
        var metaDescription = '';
        var metaKeyWords = [];

        var getTitle = function () {
            return metaTitle;
        }

        var setTitle = function (title) {
            metaTitle = title;
        }

        var getDescription = function () {
            return metaDescription;
        }

        var setDescription = function (description) {
            metaDescription = description;
        }

        var getKeyWords = function () {
            return metaKeyWords.join(', ');
        }

        var setKeyWords = function (keyWords) {
            metaKeyWords = keyWords;
        }

        return {
            getTitle: getTitle,
            setTitle: setTitle,
            getDescription: getDescription,
            setDescription: setDescription,
            getKeyWords: getKeyWords,
            setKeyWords: setKeyWords
        };

    });

    app.controller('body', function ($scope, $mdSidenav, siteShell) {

        $scope.title = siteShell.getTitle();
        $scope.$watch(siteShell.getTitle, function () {
            $scope.title = siteShell.getTitle();
        });

        $scope.toolbarFab = siteShell.getToolbarFab();
        $scope.$watch(siteShell.getToolbarFab, function (toolbarFab) {
            $scope.toolbarFab = toolbarFab;
        });

        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

        $scope.isLoaded = true;
    });

    app.controller('head', function ($scope, $mdSidenav, searchEngineOptimiser) {
        $scope.title = searchEngineOptimiser.getTitle();
        $scope.$watch(searchEngineOptimiser.getTitle, function () {
            $scope.title = searchEngineOptimiser.getTitle();
        });

        $scope.description = searchEngineOptimiser.getDescription();
        $scope.$watch(searchEngineOptimiser.getDescription, function () {
            $scope.description = searchEngineOptimiser.getDescription();
        });

        $scope.keyWords = searchEngineOptimiser.getKeyWords();
        $scope.$watch(searchEngineOptimiser.getKeyWords, function () {
            $scope.keyWords = searchEngineOptimiser.getKeyWords();
        });
    });

    app.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

        $routeProvider.when("/quotr/", angularAMD.route({
            templateUrl: 'quotr/templates/controllers/dashboard.html',
            controller: 'dashboard',
            controllerUrl: 'controllers/dashboard'
        }))
        .when("/quotr/my-quotes", angularAMD.route({
            templateUrl: 'quotr/templates/controllers/my-quotes.html',
            controller: 'my-quotes',
            controllerUrl: 'controllers/my-quotes'
        }))
        .otherwise(angularAMD.route({
            templateUrl: 'quotr/templates/controllers/file-not-found.html',
            controller: 'file-not-found',
            controllerUrl: 'controllers/file-not-found'
        }));


        $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('indigo');

        $locationProvider.html5Mode(true);
    });

    var bootstrappedApp = angularAMD.bootstrap(app);
    bootstrappedApp.apiUrl = 'http://api.imaginarium.getsett.net';

    return bootstrappedApp;
});
