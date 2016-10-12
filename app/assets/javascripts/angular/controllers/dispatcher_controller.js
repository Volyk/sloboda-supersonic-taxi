(function() {
var app = angular.module('dispatcher', ['ngRoute']);

app.controller('DispatchersController', ['$scope', '$location', function($scope, $location) {

}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/dispatchers/profile', {
        templateUrl: 'templates/dispatcher.html',
        controller: 'DispatchersController'
    })
}]);

}) ();
