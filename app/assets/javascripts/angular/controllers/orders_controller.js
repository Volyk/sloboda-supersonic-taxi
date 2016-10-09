(function() {
    var app = angular.module('taxi', ['ngRoute']);

/*
    app.controller('CreateOrderController',['$scope', '$http', function($scope, $http) {
        $scope.order = {};
        $scope.phone_pattern = /(0)[0-9]{9}/;
        $scope.email_pattern = /^(([-a-z0-9._]+)@([-a-z]+))(\.[a-z]+)?(\.[a-z]+)?$/;

        $scope.addOrder = function () {
            console.log($scope.order);
            $http.post('/orders', $scope.order).success(function(data){
                console.log(data);
                $scope.order = {};
            })
        }

    }]);
*/

app.controller('CreateOrderController', function($scope, $http) {
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

    $http({
        method: 'POST',
        url: 'http://localhost:3000/orders',
    data: $scope.order
    });
};

});

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