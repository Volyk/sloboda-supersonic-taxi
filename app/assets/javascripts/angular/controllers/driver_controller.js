(function() {
var app = angular.module('driver', ['ngRoute', 'Devise']);

app.controller('DriversController', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
    $scope.sign_up = {};
    $scope.text = 'Номер телефона';
    $scope.length = 10;
    $scope.placeholder = '0987654321';
    $scope.login = function(){
    var credentials = {
        'phone': $scope.sign_up.login,
        'password': $scope.sign_up.password
    };
    var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
    };
    Auth.login(credentials, config).then(function(driver) {
          $location.path('/driver/orders').replace();
        }, function(error) {
            console.log(error)
        });
        $scope.$on('devise:login', function(event, currentDriver) {     });
        $scope.$on('devise:new-session', function(event, currentDriver) {   });
    }
}]);

app.config(['$routeProvider', '$locationProvider', 'AuthProvider', function ($routeProvider, $locationProvider, AuthProvider) {
    AuthProvider.loginMethod('POST');
    AuthProvider.loginPath('/driver');
    AuthProvider.resourceName('driver');
    $locationProvider.html5Mode(true); 
    $routeProvider
        .when('/driver', {
            templateUrl: 'templates/login.html',
            controller: 'DriversController'
        })
        .when('/driver/orders', {
            templateUrl: 'templates/driver.html',
            controller: 'DriversController'
        })
}]);
}) ();