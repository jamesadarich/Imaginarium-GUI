var editProductDialogController = function ($scope, $http, $mdDialog, $mdToast, selectedProduct) {

    $scope.selectedProduct = selectedProduct;
    $scope.productTypes = [];
    $scope.brands = [];
    $scope.selectedProductType = null;
    $scope.selectedBrand = null;
    $scope.productTypeSearchText = null;
    $scope.brandSearchText = null;
    $scope.productTypeSearch = productTypeSearch;
    $scope.brandSearch = brandSearch;

    $scope.saveBrand = function () {
        if ($scope.selectedProduct.Id === null || $scope.selectedProduct.Id === undefined) {
            var httpMethod = $http.post;
        }
        else {
            var httpMethod = $http.put;
        }

        httpMethod('http://api.imaginarium.getsett.net/legends-of-lunchtime/product',
                    $scope.selectedProduct,
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

    function productTypeSearch(query) {
        var results = query ? $scope.productTypes.filter(createFilterFor(query)) : [],
            deferred;
        return results;
    }

    function brandSearch(query) {
        var results = query ? $scope.brands.filter(createFilterFor(query)) : [],
            deferred;
        return results;
    }

    function loadAll() {
        $http.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/product-types')
            .success(function (data, status, headers, config) {
                $scope.productTypes = data;
            });

        $http.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/brands')
            .success(function (data, status, headers, config) {
                $scope.brands = data;
            });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            return (item.Name.toLowerCase().indexOf(lowercaseQuery) !== -1);
        };
    }

    loadAll();
}