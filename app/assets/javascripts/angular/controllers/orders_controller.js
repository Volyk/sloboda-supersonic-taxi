(function() {
var app = angular.module('taxi', ['ngRoute', 'Devise']);

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

app.controller('DriversController', ['$scope', 'Auth', function($scope, Auth) {
    $scope.sign_up = {};
    $scope.text = 'Номер телефона';
    $scope.length = 10;
    $scope.placeholder = '0987654321';
    $scope.login = function(){
    var credentials = {
        'driver': {
        'phone': $scope.sign_up.login,
        'password': $scope.sign_up.password
        }
    };
    var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
    };
    Auth.login(credentials, config).then(function(driver) {
            alert('success!!!!'); 
        }, function(error) {
            console.log(error)
        });
        $scope.$on('devise:login', function(event, currentDriver) {     });
        $scope.$on('devise:new-session', function(event, currentDriver) {   });
    }
}]);

app.controller('DispatchersController', ['$scope', 'Auth', function($scope, Auth) {
    $scope.text = 'Логин';
    $scope.length = 20;
    $scope.placeholder = 'example';
    $scope.sign_up = {};
    $scope.login = function(){
    var credentials = {
        'dispatcher': {
        'login': $scope.sign_up.login,
        'password': $scope.sign_up.password
        }
    };
    var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
    };
    Auth.login(credentials, config).then(function(driver) {
            alert('success!!!!'); 
        }, function(error) {
            console.log(error)
        });
        $scope.$on('devise:login', function(event, currentDriver) {       });
        $scope.$on('devise:new-session', function(event, currentDriver) {      });
    }
}]);

app.config(['$routeProvider', '$locationProvider', 'AuthProvider', function ($routeProvider, $locationProvider, AuthProvider) {
    AuthProvider.loginMethod('POST');
    AuthProvider.loginPath('/driver');
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