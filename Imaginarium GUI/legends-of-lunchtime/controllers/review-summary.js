app.controller('review-summary-controller', function ($scope, $mdDialog) {

    $.get('http://api.imaginarium.getsett.net/legends-of-lunchtime/reviews')
    .success(function (reviews) {
        $scope.reviews = reviews;
    });
});