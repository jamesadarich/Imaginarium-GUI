$(window).load(function () {

    $('#pattern-canvas').height($(document).height() - $('#main-tool-bar').height());
});

if (app === undefined) {
    var app = angular.module('pattern-builder', ['ngMaterial']);
}
app.controller('side-nav-controller', function ($scope, $mdSidenav) {
    $scope.openLeftMenu = function () {
        $mdSidenav('left').toggle();
    };
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryColor('purple')
      .accentColor('green');
});

function createSquare(color) {
    var square = {};
    square.color = color;
    square.height = 20;
    square.width = 20;

    return square;
}

function createRow(squares, defaultColor) {
    var row = {};
    row.squares = [];

    for (var i = 0; i < squares; i++) {
        row.squares.push(createSquare(defaultColor));
    }

    return row;
}

function createColor(red, green, blue) {
    var c = {};
    c.red = red;
    c.green = green;
    c.blue = blue;
    c.rgbstring = 'rgb(' + red + ',' + green + ',' + blue + ')';
    return c;
}



app.controller('pattern-builder-controller', function ($scope, $mdDialog) {


    $scope.defaultColor = createColor(0, 0, 0);

    var pallette = [];
    pallette.push(createColor(255, 0, 0));
    pallette.push(createColor(0, 255, 0));
    pallette.push(createColor(0, 0, 255));


    $scope.selectedColor = pallette[0];

    $scope.pallette = pallette;

    var grid = {};
    grid.rows = [];
    grid.rows.push(createRow(5, $scope.defaultColor));
    grid.rows.push(createRow(5, $scope.defaultColor));
    grid.rows.push(createRow(5, $scope.defaultColor));

    $scope.grid = grid;

    var gridInfo = {};
    gridInfo.rowCount = grid.rows.length;
    gridInfo.columnCount = grid.rows[0].squares.length;
    $scope.gridInfo = gridInfo;

    
    $scope.$watch('gridInfo.rowCount', function () {
        var currentRowCount = $scope.grid.rows.length;
        var newRowCount = $scope.gridInfo.rowCount;

        if (currentRowCount < newRowCount) {
            for (var i = $scope.grid.rows.length; i < newRowCount; i++) {
                $scope.grid.rows.push(createRow($scope.gridInfo.columnCount, $scope.defaultColor));
            }
        }
        else {
            for (var i = currentRowCount; i > newRowCount; i--) {
                $scope.grid.rows.pop($scope.grid.rows[i - 1]);
            }
        }
    });

    $scope.$watch('gridInfo.columnCount', function () {
        var currentColumnCount = $scope.grid.rows[0].squares.length;
        var newColumnCount = $scope.gridInfo.columnCount;
        var rowCount = $scope.gridInfo.rowCount;

        if (currentColumnCount < newColumnCount) {
            for (var i = currentColumnCount; i < newColumnCount; i++) {
                for (var j = 0; j < rowCount; j++) {
                    $scope.grid.rows[j].squares.push(createSquare($scope.defaultColor));
                }
            }
        }
        else {
            for (var i = currentColumnCount; i > newColumnCount; i--) {
                for (var j = 0; j < rowCount; j++) {
                    $scope.grid.rows[j].squares.pop($scope.grid.rows[j].squares[i - 1]);
                }
            }
        }
    });

    $scope.toggleColor = function (square) {

        if (square.color == $scope.selectedColor) {
            square.color = $scope.defaultColor;
        }
        else {
            square.color = $scope.selectedColor;
        }
    }

    $scope.selectColor = function (color) {
        $scope.selectedColor = color;
    }

    $scope.editColor = function (color) {
        $mdDialog.show({
            controller: EditColorDialogController,
            templateUrl: 'templates/edit-color-dialog.html',
            locals: { color: color }
        });
        /*
        .then(function (answer) {
            $scope.alert = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.alert = 'You cancelled the dialog.';
        });
        */
    }


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
});