function createRectangle(x, y) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    el.setAttribute('x', x);
    el.setAttribute('y', y);
    el.setAttribute('height', 20);
    el.setAttribute('width', 20);
    el.setAttribute('fill', 'rgb(0,0,0)');
    $(el).click(function () {
        el.setAttribute('fill', 'rgb(255,0,0)');
    });
    document.getElementById('pattern-canvas').appendChild(el);
}

/*
$(document).ready(function () {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            createRectangle(25 * j + 10, 25 * i + 10);
        }
    }
});
*/

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

function createSquare(col, color)
{
    var square = {};
    square.col = col;
    square.color = color;
    square.height = 20;
    square.width = 20;

    return square;
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

    var row = {};
    row.squares = [];
    row.squares.push(createSquare(1, $scope.defaultColor));
    row.squares.push(createSquare(2, $scope.defaultColor));
    row.squares.push(createSquare(3, $scope.defaultColor));
    row.squares.push(createSquare(4, $scope.defaultColor));

    var grid = {};
    grid.rows = [];
    grid.rows.push(row);
    grid.rows.push(row);
    grid.rows.push(row);

    $scope.grid = grid;

    $scope.toggleColor = function (square) {
        if (square.color == $scope.selectedColor) {
            square.color = $scope.defaultColor;
        }
        else
        {
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