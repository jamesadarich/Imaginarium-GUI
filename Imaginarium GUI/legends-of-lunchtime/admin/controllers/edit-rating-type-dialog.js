var editRatingTypeDialogController = function ($scope, $http, $mdDialog, $mdToast, selectedRatingType) {

    $scope.selectedRatingType = selectedRatingType;

    $scope.saveRatingType = function () {

        if ($scope.selectedRatingType.Id === null || $scope.selectedRatingType.Id === undefined) {
            var httpMethod = $http.post;
        }
        else {
            var httpMethod = $http.put;
        }

        httpMethod('http://api.imaginarium.getsett.net/legends-of-lunchtime/rating-type',
                    $scope.selectedRatingType,
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