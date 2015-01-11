function EditColorDialogController($scope, $mdDialog, color) {
    $scope.color = color;
    $scope.originalRed = color.red;
    $scope.originalGreen = color.green;
    $scope.originalBlue = color.blue;

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $scope.color.red = $scope.originalRed;
        $scope.color.green = $scope.originalGreen;
        $scope.color.blue = $scope.originalBlue;
        $mdDialog.cancel();
    };
    $scope.submit = function () {
        $mdDialog.hide();
    };
}