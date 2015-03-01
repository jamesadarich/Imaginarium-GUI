app.controller('rating-type-controller', function ($scope, $http, $mdDialog) {
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

    function loadAll() {
        $http.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/rating-types')
            .success(function (data, status, headers, config) {
                $scope.ratingTypes = data;
            });
    }

    loadAll();
});