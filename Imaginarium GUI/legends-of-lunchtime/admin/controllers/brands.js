app.controller('brand-controller', function ($scope, $http, $mdDialog) {
    $scope.brands = null;

    $scope.newBrand = function () {
        $mdDialog.show({
            controller: editBrandDialogController,
            templateUrl: 'templates/edit-brand-dialog.html',
            locals: { selectedBrand: {} }
        });
    }

    $scope.editBrand = function (brand) {
        $mdDialog.show({
            controller: editBrandDialogController,
            templateUrl: 'templates/edit-brand-dialog.html',
            locals: { selectedBrand: brand }
        });
    }

    $scope.saveBrand = function()
    {
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
                .content(data.error_description)
                .position('top left right')
                .hideDelay(3000)
            );
        });
    }

    function loadAll() {
        $http.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/brands')
            .success(function (data, status, headers, config) {
                $scope.brands = data;
            });
    }

    loadAll();
});