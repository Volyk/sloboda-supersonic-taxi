(function() {
var app = angular.module('taxi', ['ngRoute']);

app.controller('CreateOrderController', ['$scope', '$http', function($scope, $http) {
    $scope.order = {};
        $scope.phone_pattern = /(0)[0-9]{9}/;
        $scope.email_pattern = /^(([-a-z0-9._]+)@([-a-z]+))(\.[a-z]+)?(\.[a-z]+)?$/;

    $scope.addOrder = function() {
    $scope.order = {
      'order': {
        'phone'  : $scope.order.phone,
        'email'   : $scope.order.email,
        'start_point'  : $scope.order.start_point,
        'end_point'   : $scope.order.end_point,
        'passengers'  : $scope.order.passengers,
        'baggage'   : $scope.order.baggage,
        'comment'   : $scope.order.comment
      }
    };
    $http.post('/orders', $scope.order).success(function(data){
        $scope.order = {};
    });
    };
}]);

app.controller('DriversController', ['$scope', function($scope) {
    $scope.text = 'Номер телефона';
    $scope.length = 10;
    $scope.placeholder = '0987654321';
    

}]);

app.controller('DispatchersController', ['$scope', function($scope) {
    $scope.text = 'Логин';
    $scope.length = 20;
    $scope.placeholder = 'example';
}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true); 
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'CreateOrderController'
        })
        .when('/driver', {
            templateUrl: 'templates/login.html',
            controller: 'DriversController'
        })
        .when('/dispatcher', {
            templateUrl: 'templates/login.html',
            controller: 'DispatchersController'
        })
}]);

app.directive("navigationPanel", function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/navbar.html'
    }
});

}) ();