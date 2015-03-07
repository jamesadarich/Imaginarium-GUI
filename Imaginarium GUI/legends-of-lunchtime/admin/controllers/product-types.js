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

    $scope.deleteProductType = function (productType) {
        $http.delete('http://api.imaginarium.getsett.net/legends-of-lunchtime/product-type/' + productType.Id,
                    { headers: { 'Authorization': token.token_type + ' ' + token.access_token } })
        .success(function (data, status, headers, config) {
            $mdToast.show(
                $mdToast.simple()
                .content(productType.Name + ' deleted!')
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

        function loadAll() {
            $http.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/product-types')
                .success(function (data, status, headers, config) {
                    $scope.productTypes = data;
                });
        }

        loadAll();
    }
});