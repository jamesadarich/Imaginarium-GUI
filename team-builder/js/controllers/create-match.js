define(['app'], function (app) {

    app.controller('create-match', function ($scope, $http, siteShell, searchEngineOptimiser) {
        searchEngineOptimiser.setTitle('Team Builder - Create Match');
        searchEngineOptimiser.setDescription('Sett is all about imagination, take a peak see!');
        searchEngineOptimiser.setKeyWords(['Sett', 'software', 'Get Sett', 'Blog', 'getsett']);
        siteShell.setTitle('Create Match');
        siteShell.setToolbarFab(undefined);

        $http.get(app.apiUrl + '/team-builder/players')
        .success(function(users){
          $scope.users = users;
        });

        $scope.users = [];
        $scope.teamOne = [];
        $scope.teamTwo = [];

        $scope.allSelected = false;

        $scope.$watch('allSelected', function(allSelected) {
          $scope.users.forEach(function(user){
            user.isSelected = allSelected;
          });
        });

        $scope.generateTeams = function(){
          var selectedUsers = $scope.users.filter(function(user) {
            return user.isSelected;
          });

          $scope.teamOne = [];
          $scope.teamTwo = [];

          while (selectedUsers.length > 0){
            var index = Math.floor(Math.random() * selectedUsers.length);
            if ($scope.teamOne.length <= $scope.teamTwo.length){
              $scope.teamOne.push(selectedUsers[index]);
            }
            else{
              $scope.teamTwo.push(selectedUsers[index]);
            }
            selectedUsers.splice(index, 1);
          }
        }
    });
});
