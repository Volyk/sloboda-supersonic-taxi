(function() {
var app = angular.module('taxi', ['ngRoute']);

app.controller('CreateOrderController', ['$scope', '$http', function($scope, $http) {
    $scope.availableOptions = [
      {id: '1', name: '1'},
      {id: '2', name: '2'},
      {id: '3', name: '3'},
      {id: '4', name: '4'},
      {id: '5', name: '5'},
      {id: '6', name: '6'},
      {id: '7', name: '7'},
      {id: '8', name: '8'}    
    ];
    $scope.order = {};
    $scope.phone_pattern = /(0)[0-9]{9}/;
    $scope.email_pattern = /^(.+)@(.+)$/;

    $scope.addOrder = function() {
    $scope.order = {
      'order': {
        'phone'  : $scope.order.phone,
        'email'   : $scope.order.email.toLowerCase(),
        'start_point'  : $scope.order.start_point,
        'end_point'   : $scope.order.end_point,
        'passengers'  : $scope.order.passengers,
        'baggage'   : $scope.order.baggage,
        'comment'   : $scope.order.comment
      }
    };
    $http.post('/orders', $scope.order).success(function(data){
        alert('Ваш заказ принят!');
        $scope.order = {};
    });
    };
}]);


app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'CreateOrderController'
    })
}]);

}) ();