// Load modules and use them
require.config({
    baseUrl: '/team-builder/js',
    paths: {
        angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular',
        angularAria: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-aria',
        angularAnimate: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-animate',
        angularMaterial: '//ajax.googleapis.com/ajax/libs/angular_material/0.8.3/angular-material',
        angularAMD: '//cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min',
        angularRoute: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular-route'
    },
    shim: {
        'angularAMD': ['angular'],
        'angularRoute': ['angular'],
        'angularAnimate': ['angular'],
        'angularAria': ['angular'],
        'angularMaterial': ['angularAnimate', 'angularAria']
    },
    deps: ['app']
});
