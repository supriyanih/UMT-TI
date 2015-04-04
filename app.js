
define([

], function () {
    var app = angular.module("app", ['ngRoute','ngAnimate','LocalStorageModule','angular-growl']);
    app.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider,$httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $routeProvider.when('/:params',
            {
                template    : '<div data-ng-controller="controller" id="view"></div>',
                controller  : 'DynamicController'
            }
        ).when('/:params/:actions',
            {
                template    : '<div data-ng-controller="controller" id="view"></div>',
                controller  : 'DynamicController'
            }
        ).otherwise({ redirectTo: 'login' });
        $locationProvider.hashPrefix("!");
    }]);

    app.controller('DynamicController', function ($scope, $routeParams, $compile) {
        $scope.actions = $routeParams['actions'];
        $scope.controller = function(){};
        require([
            './core/controller/ctrl.' + $routeParams['params'],
            'text!./core/view/'  + $routeParams['params'] + '.html'
        ], function(controller, view){
                $scope.controller = controller;

                var v = angular.element("#view").html(view);
                $compile(v)(v.scope());
                $scope.$apply();
            }
        );
    });
    app.filter('temp', function($filter) {
        return function(input, precision) {
            if (!precision) {
                precision = 1;
            }
            var numberFilter = $filter('number');
            return numberFilter(input, precision) + '\u00B0C';
        };
    });
    
   app.baseUrlServer = 'http://localhost/Api-umt/';
    return app;
});


