var editProductTypeDialogController = function ($scope, $http, $mdDialog, $mdToast, selectedProductType) {

    $scope.selectedProductType = selectedProductType;
    $scope.ratingTypes = [];

    $scope.saveProductType = function () {

        $scope.selectedProductType.RatingTypes = [];

        for (var i = 0; i < $scope.ratingTypes.length; i++) {
            if ($scope.ratingTypes[i].Include) {
                $scope.selectedProductType.RatingTypes.push($scope.ratingTypes[i]);
            }
        }

        if ($scope.selectedProductType.Id === null || $scope.selectedProductType.Id === undefined) {
            var httpMethod = $http.post;
        }
        else {
            var httpMethod = $http.put;
        }

        httpMethod('http://api.imaginarium.getsett.net/legends-of-lunchtime/product-type',
                    $scope.selectedProductType,
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

    function loadAll() {
        $http.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/rating-types')
            .success(function (data, status, headers, config) {
                for (var i = 0; i < data.length; i++) {
                    data[i].Include = false;
                    for (var j = 0; j < $scope.selectedProductType.RatingTypes.length; j++) {
                        if (data[i].Id == $scope.selectedProductType.RatingTypes[j].Id) {
                            data[i].Include = true;
                        }
                    }
                    $scope.ratingTypes.push(data[i]);
                }
            });
    }

    loadAll();
}