define(['app'], function (app) {
    app.controller('login', function ($scope, $http, $mdToast) {
        $scope.usename = null;
        $scope.password = null;
        $scope.attemptingLogin = false;

        $scope.login = function () {
            $scope.attemptingLogin = true;
            var data = "grant_type=password&username=" + $scope.username + "&password=" + $scope.password;
            $http.post(app.apiUrl + '/token',
                        data,
                        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .success(function (data, status, headers, config) {
                localStorage.setItem('token', JSON.stringify(data));
                window.location.replace('/team-builder');
            })
            .error(function (data, status, headers, config) {
                $scope.attemptingLogin = false;
                $mdToast.show(
                    $mdToast.simple()
                    .content(data.error_description)
                    .position('top left right')
                    .hideDelay(3000)
                );
            });

        }
    });
});
