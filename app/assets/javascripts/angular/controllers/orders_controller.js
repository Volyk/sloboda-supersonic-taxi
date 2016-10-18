(function() {
var app = angular.module('taxi', ['ngRoute', 'ngDialog']);

app.controller('CreateOrderController', ['$scope', '$http', function($scope, $http) {
  $scope.data = {
    availableOptions: [
      {id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}, 
      {id: '5'}, {id: '6'}, {id: '7'}, {id: '8'}
    ],
    selectedOption: {id: '1'}
  };
  $scope.phone_pattern = /(0)[0-9]{9}/;
  $scope.email_pattern = /^(.+)@(.+)$/;
  $scope.addOrder = function() {
    if (!$scope.order.email) {
      $scope.order.email = '';
    }
    $scope.order.email = $scope.order.email.toLowerCase();
    $scope.order.passengers = $scope.data.selectedOption.id;
    $http.post('/orders', $scope.order).success(function(data){
      alert('Ваш заказ принят!');
      $scope.order = {};
    });
  };
  
}]);


app.controller('DriversController', ['$scope', '$http', function($scope, $http) {
  
  $http.get('/drivers/orders.json').success(function(data){
    $scope.orders = data;
    console.log(data);
  });

  $scope.deleteOrder = function(order) {
    var index = $scope.orders.indexOf(order);
    $scope.orders.splice(index, 1);
  };

  $scope.putMethod = function(order) {
    var url = '/drivers/orders/' + order.id;
    $http.put(url, {order: order});
  };

  $scope.acceptOrder = function(order) {
    order.status = 'accepted';
    $scope.putMethod(order);
  };

  $scope.declineOrder = function(order) {
    order.status = 'declined';
    $scope.putMethod(order);
    $scope.deleteOrder(order);
  };

  $scope.arrivedToOrder = function(order) {
    order.status = 'arrived';
    $scope.putMethod(order);
  };

  $scope.orderFulfilled = function(order) {
    order.status = 'done';
    $scope.putMethod(order);
    $scope.deleteOrder(order);
  };

}]);

app.controller('DispatchersController', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {

  

}]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: 'CreateOrderController'
    })
    .when('/drivers/orders', {
      templateUrl: 'templates/driver.html',
      controller: 'DriversController'
    })
    .when('/dispatchers/profile', {
      templateUrl: 'templates/dispatcher.html',
      controller: 'DispatchersController'
    })
    .otherwise({
      redirectTo: '/'
    })
}]);

}) ();
