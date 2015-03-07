app.controller('ReviewCtrl', function ($scope, $http, $mdToast) {
    var self = this;
    // list of `state` value/display objects
    var review = {};

    $scope.review = review;
    $scope.productTypes = [];
    $scope.brands = [];
    $scope.selectedProductType = null;
    $scope.selectedBrand = null;
    $scope.productTypeSearchText = null;
    $scope.brandSearchText = null;
    $scope.productTypeSearch = productTypeSearch;
    $scope.brandSearch = brandSearch;

    $scope.updateRatings = function () {
        $scope.review.Ratings = [];
        if ($scope.review.Product.Type !== undefined && $scope.review.Product.Type !== null) {
            for (var i = 0; i < $scope.review.Product.Type.RatingTypes.length; i++) {
                var rating = {};
                rating.Value = 0;
                rating.Type = $scope.review.Product.Type.RatingTypes[i];
                $scope.review.Ratings.push(rating);
            }
        }
    }

    $scope.submitReview = function()
    {
        $http.post('http://api.imaginarium.getsett.net/legends-of-lunchtime/review',
                    $scope.review,
                    { headers: { 'Authorization': token.token_type + ' ' + token.access_token } }).
        success(function (data, status, headers, config) {
      // this callback will be called asynchronously
            // when the response is available
            $mdToast.show(
                $mdToast.simple()
                .content(data.Product.Brand.Name + ' ' + data.Product.Name + ' review saved successfully')
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

    loadAll();
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
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
    /**
     * Build `states` list of key/value pairs
     */
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

    
});