define(['app'], function (app) {

    app.controller('players', function ($scope, $http, siteShell, searchEngineOptimiser) {
        searchEngineOptimiser.setTitle('404 - File Not Found');
        searchEngineOptimiser.setDescription('Looks like you tottered into the wrong place!');
        searchEngineOptimiser.setKeyWords(['Sett', 'software', 'Get Sett', 'getsett']);
        siteShell.setTitle('Players');

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

        $http.get(app.apiUrl + '/team-builder/players')
        .success(function(players){
          $scope.players = players;
        });

        $scope.updatePlayer = function(player){
            $http.put(app.apiUrl + '/team-builder/player',
                        player,
                        { headers: { 'Authorization': app.token.token_type + ' ' + app.token.access_token } })
            .success(function (createdPlayer) {
                player.editing = false;
            })
            .error(function(data, status) {
              if (status === 401){
                app.routeToLogin();
              }
            });
        }

        $scope.deletePlayer = function(player){
            $http.delete(app.apiUrl + '/team-builder/player/' + player.Id,
                        { headers: { 'Authorization': app.token.token_type + ' ' + app.token.access_token } })
            .success(function () {
                $scope.players.pop(player);
            })
            .error(function(data, status) {
              if (status === 401){
                app.routeToLogin();
              }
            });
        }

        $scope.createPlayer = function(player){

            $http.post(app.apiUrl + '/team-builder/player',
                        player,
                        { headers: { 'Authorization': app.token.token_type + ' ' + app.token.access_token } })
            .success(function (createdPlayer) {
                $scope.players.push(createdPlayer);
            })
            .error(function(data, status) {
              if (status === 401){
                app.routeToLogin();
              }
            });
        }

        $scope.message = 'Nothing to see heree!!!';
    });
});
