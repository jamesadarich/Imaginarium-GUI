var editBrandDialogController = function ($scope, $http, $mdDialog, $mdToast, selectedBrand) {

    $scope.selectedBrand = selectedBrand;

    $scope.saveBrand = function () {
        if ($scope.selectedBrand.Id === null || $scope.selectedBrand.Id === undefined) {
            var httpMethod = $http.post;
        }
        else {
            var httpMethod = $http.put;
        }

        httpMethod('http://api.imaginarium.getsett.net/legends-of-lunchtime/brand',
                    $scope.selectedBrand,
                    { headers: { 'Authorization': token.token_type + ' ' + token.access_token } }).
        success(function (data, status, headers, config) {
            $mdToast.show(
                $mdToast.simple()
                .content(data.Name + ' saved!')
                .position('top left right')
                .hideDelay(3000)
            );
        })
        .error(function (data, status, headers, config) {

            $mdToast.show(
                $mdToast.simple()
                .content(status + ': ' + JSON.stringify(data))
                .position('top left right')
                .hideDelay(3000)
            );
        });

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
}