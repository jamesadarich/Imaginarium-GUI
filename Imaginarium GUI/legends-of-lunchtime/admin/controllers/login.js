app.controller('login-controller', function ($scope, $http, $mdToast) {
    $scope.usename = null;
    $scope.password = null;

    $scope.login = function()
    {
        var data = "grant_type=password&username=" + $scope.username + "&password=" + $scope.password;
        $http.post('http://api.imaginarium.getsett.net/token',
                    data,
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })            
        .success(function (data, status, headers, config) {
            localStorage.setItem('token', JSON.stringify(data));
            window.location.replace('/legends-of-lunchtime/admin/dashboard.html');
        })
        .error(function (data, status, headers, config) {

            $mdToast.show(
                $mdToast.simple()
                .content(data.error_description)
                .position('top left right')
                .hideDelay(3000)
            );
        });

    }
});