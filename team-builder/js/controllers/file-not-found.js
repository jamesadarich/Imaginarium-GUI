define(['app'], function (app) {

    app.controller('file-not-found', function ($scope, siteShell, searchEngineOptimiser) {
        searchEngineOptimiser.setTitle('404 - File Not Found');
        searchEngineOptimiser.setDescription('Looks like you tottered into the wrong place!');
        searchEngineOptimiser.setKeyWords(['Sett', 'software', 'Get Sett', 'getsett']);
        siteShell.setTitle('Dagnabit!!');

        $scope.message = 'Looks like that pesky file you were after isn\'t about, best look at something else so you make valuable use of your valuable procrastination time!!!';
    });
});