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

    function loadAll() {
        $http.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/brands')
            .success(function (data, status, headers, config) {
                $scope.brands = data;
            });
    }

    loadAll();
});