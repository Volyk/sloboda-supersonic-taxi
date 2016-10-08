(function() {
    var app = angular.module('taxi', ['ngRoute']);

    taxi.factory('Orders', ['$resource',function($resource){
        return $resource('/orders.json', {},{
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
        })
    }]);
     
    taxi.factory('Order', ['$resource', function($resource){
        return $resource('/orders/:id.json', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
        });
    }]);



    app.controller('CreateOrderController',['$scope', '$http', function($scope, $http) {
        $scope.order = {};
        $scope.phone_pattern = /(0)[0-9]{5}/;
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
                templateUrl: 'templates/home.html',
                controller: 'CreateOrderController'
            })
    }]);

    app.directive("navigationPanel", function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/navbar.html'
        }
    })

}) ();