app.controller('login-controller', function ($scope, $http) {
    $scope.usename = null;
    $scope.password = null;

    $scope.login = function()
    {
        var data = "grant_type=password&username=" + $scope.username + "&password=" + $scope.password;
        $http.post('http://api.imaginarium.getsett.net/token',
                    data,
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })            
        .success(function (data, status, headers, config) {
            console.log(data);
        })
        .error(function (data, status, headers, config) {
            console.log(status + ": " + data);
        });

    }
});