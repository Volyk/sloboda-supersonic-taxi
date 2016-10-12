(function() {
    var app = angular.module('taxi', ['ngRoute']);


    app.controller('CreateOrderController',['$scope', '$http', function($scope, $http) {
        $scope.order = {};
        $scope.phone_pattern = /(0)[0-9]{9}/;
        $scope.email_pattern = /^(([-a-z0-9._]+)@([-a-z]+))(\.[a-z]+)?(\.[a-z]+)?$/;

        $scope.addOrder = function () {
            console.log($scope.order);
            $http.post('/', $scope.order).success(function(data){
                console.log(data);
                $scope.order = {};
            })
        }

    }]);


    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'template/home.html',
                controller: 'CreateOrderController'
            })
    }]);

    app.directive("navigationPanel", function() {
        return {
            restrict: 'E',
            templateUrl: 'template/navbar.html'
        }
    })

}) ();
