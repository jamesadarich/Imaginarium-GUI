define(['app'], function (app) {

    app.controller('dashboard', function ($scope, siteShell, searchEngineOptimiser) {
        searchEngineOptimiser.setTitle('404 - File Not Found');
        searchEngineOptimiser.setDescription('Looks like you tottered into the wrong place!');
        searchEngineOptimiser.setKeyWords(['Sett', 'software', 'Get Sett', 'getsett']);
        siteShell.setTitle('Dashboard');
        siteShell.setToolbarFab(undefined);

        $scope.message = 'Nothing to see heree!!!';
    });
});
