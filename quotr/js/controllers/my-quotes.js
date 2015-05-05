define(['app'], function (app) {

    app.controller('my-quotes', function ($scope, $http, siteShell, searchEngineOptimiser) {
        searchEngineOptimiser.setTitle('404 - File Not Found');
        searchEngineOptimiser.setDescription('Looks like you tottered into the wrong place!');
        searchEngineOptimiser.setKeyWords(['Sett', 'software', 'Get Sett', 'getsett']);
        siteShell.setTitle('My Quotes');

        $scope.newPlayer = function(){
          var player = {};
          player.FirstName = 'New';
          player.LastName = 'Player';
          $scope.createPlayer(player);
        }

        var createFab = {};
        createFab.icon = 'fa fa-plus';
        createFab.click = $scope.newPlayer;
        siteShell.setToolbarFab(createFab);

        $http.get(app.apiUrl + '/quotr/quotes')
        .success(function(players){
          $scope.players = players;
        });

        $scope.quotes = [
          {
            author: {
              firstName: 'James'
            },
            text: 'Some elaborate and exciting comment on society',
            timestamp: new Date()
          },
          {
            author: {
              firstName: 'James'
            },
            text: 'Some elaborate and exciting comment on society',
            timestamp: new Date()
          },
          {
            author: {
              firstName: 'James'
            },
            text: 'Some elaborate and exciting comment on society',
            timestamp: new Date()
          }
        ]

        $scope.message = 'Nothing to see heree!!!';
    });
});
