define(['app'], function (app) {

    app.controller('players', function ($scope, $http, siteShell, searchEngineOptimiser) {
        searchEngineOptimiser.setTitle('404 - File Not Found');
        searchEngineOptimiser.setDescription('Looks like you tottered into the wrong place!');
        searchEngineOptimiser.setKeyWords(['Sett', 'software', 'Get Sett', 'getsett']);
        siteShell.setTitle('Players');
        siteShell.setToolbarFab(undefined);

        $http.get('team-builder/json/team.js')
        .success(function(players){
          $scope.players = players;
        });

        $scope.message = 'Nothing to see heree!!!';
    });
});
