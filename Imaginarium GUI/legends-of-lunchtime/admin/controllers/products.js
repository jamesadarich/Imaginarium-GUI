app.controller('product-controller', function ($scope, $http, $mdDialog) {
    $scope.products = null;

    $scope.newProduct = function () {
        $mdDialog.show({
            controller: editProductDialogController,
            templateUrl: 'templates/edit-product-dialog.html',
            locals: { selectedProduct: {} }
        });
    }

    $scope.editProduct = function (product) {
        $mdDialog.show({
            controller: editProductDialogController,
            templateUrl: 'templates/edit-product-dialog.html',
            locals: { selectedProduct: product }
        });
    }

    function loadAll() {
        $http.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/products')
            .success(function (data, status, headers, config) {
                $scope.products = data;
            });
    }

    loadAll();
});