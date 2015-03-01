app.controller('product-type-controller', function ($scope, $http, $mdDialog) {
    $scope.productTypes = null;

    $scope.newProductType = function () {
        $mdDialog.show({
            controller: editProductTypeDialogController,
            templateUrl: 'templates/edit-product-type-dialog.html',
            locals: { selectedProductType: {} }
        });
    }

    $scope.editProductType = function (productType) {
        $mdDialog.show({
            controller: editProductTypeDialogController,
            templateUrl: 'templates/edit-product-type-dialog.html',
            locals: { selectedProductType: productType }
        });
    }

    function loadAll() {
        $http.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/product-types')
            .success(function (data, status, headers, config) {
                $scope.productTypes = data;
            });
    }

    loadAll();
});