(function() {
var app = angular.module('driver', ['ngRoute']);

app.controller('DriversController', ['$scope', '$http', '$location', function($scope, $location) {

}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/drivers/profile', {
        templateUrl: 'templates/driver.html',
        controller: 'DriversController'
    })
}]);

}) ();
