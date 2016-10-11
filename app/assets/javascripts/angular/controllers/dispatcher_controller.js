(function() {
var app = angular.module('dispatcher', ['ngRoute', 'Devise']);

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
    Auth.login(credentials, config).then(function(dispatcher) {
            $window.location.href = '/dispatcher/orders'; 
        }, function(error) {
            console.log(error)
        });
        $scope.$on('devise:login', function(event, currentDriver) {       });
        $scope.$on('devise:new-session', function(event, currentDriver) {      });
    }
}]);


app.config(['$routeProvider', '$locationProvider', 'AuthProvider', function ($routeProvider, $locationProvider, AuthProvider) {
    AuthProvider.loginMethod('POST');
    AuthProvider.loginPath('/dispatcher');
    AuthProvider.resourceName('dispatcher');
    $locationProvider.html5Mode(true); 
    $routeProvider
        .when('/dispatchers/sign_in', {
            templateUrl: 'templates/login.html',
            controller: 'DispatchersController'
        })
        .when('/dispatcher/orders', {
            templateUrl: 'template/dispatcher.html',
            controller: 'DispatchersController'
        })
}]);
}) ();