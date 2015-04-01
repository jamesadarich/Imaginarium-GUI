app.controller('rating-type-controller', function ($scope, $http, $mdDialog, $mdToast) {
    $scope.ratingTypes = null;

    $scope.newRatingType = function () {
        $mdDialog.show({
            controller: editRatingTypeDialogController,
            templateUrl: 'templates/edit-rating-type-dialog.html',
            locals: { selectedRatingType: {} }
        });
    }

    $scope.editRatingType = function (ratingType) {
        $mdDialog.show({
            controller: editRatingTypeDialogController,
            templateUrl: 'templates/edit-rating-type-dialog.html',
            locals: { selectedRatingType: ratingType }
        });
    }

    $scope.deleteRatingType = function (ratingType) {
        $http.delete('http://api.imaginarium.getsett.net/legends-of-lunchtime/rating-type/' + ratingType.Id,
                    { headers: { 'Authorization': token.token_type + ' ' + token.access_token } })
        .success(function (data, status, headers, config) {
            $mdToast.show(
                $mdToast.simple()
                .content(ratingType.Name + ' deleted!')
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
    }

    function loadAll() {
        $http.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/rating-types')
            .success(function (data, status, headers, config) {
                $scope.ratingTypes = data;
            });
    }

    loadAll();
});