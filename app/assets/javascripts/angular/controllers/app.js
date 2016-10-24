(function() {
    var app = angular.module('taxi', ['ngRoute', 'ngDialog']);

    app.directive('orderForm', function(){
        return {
            restrict: 'E',
            templateUrl: 'templates/order.html'
        };
    });

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'CreateOrderController'
            })
            .when('/drivers/orders', {
                templateUrl: 'templates/driver.html',
                controller: 'DriversController'
            })
            .when('/dispatchers/profile', {
                templateUrl: 'templates/dispatcher.html',
                controller: 'DispatchersController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

}) ();
