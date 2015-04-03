define(['app'], function (app) {

    app.controller('matches', function ($scope, siteShell, searchEngineOptimiser) {
        searchEngineOptimiser.setTitle('404 - File Not Found');
        searchEngineOptimiser.setDescription('Looks like you tottered into the wrong place!');
        searchEngineOptimiser.setKeyWords(['Sett', 'software', 'Get Sett', 'getsett']);
        siteShell.setTitle('Matches');

        var createFab = {};
        createFab.icon = 'fa fa-plus';
        createFab.href = 'team-builder/create-match';
        siteShell.setToolbarFab(createFab);

        $scope.message = 'Nothing to see heree!!!';
    });
});
