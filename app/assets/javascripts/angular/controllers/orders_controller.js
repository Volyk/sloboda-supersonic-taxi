(function() {
var app = angular.module('taxi', ['ngRoute']);

app.controller('CreateOrderController', ['$scope', '$http', function($scope, $http) {
    $scope.phone_pattern = /(0)[0-9]{9}/;
    $scope.email_pattern = /^(.+)@(.+)$/;
    $scope.addOrder = function() {
      if (!$scope.order.email) {
        $scope.order.email = '';
      }
      $scope.order.email = $scope.order.email.toLowerCase();      
      $http.post('/orders', $scope.order).success(function(data){
          alert('Ваш заказ принят!');
          $scope.order = {};
      });
    };
}]);


app.controller('DriversController', ['$scope', '$http', function($scope, $http) {

  $http.get('/drivers/orders.json').success(function(data){
    $scope.orders = data;
  });

  $scope.deleteOrder = function(order) {
    var index = $scope.orders.indexOf(order);
    $scope.orders.splice(index, 1);
  };

  $scope.putMethod = function(data) {
    var url = '/orders/' + data.id;
    $http.put(url, data);
  };

  $scope.acceptOrder = function(order) {
    order.waiting = false;
    order.accepted = true;
    $scope.putMethod(order);
  };

  $scope.declineOrder = function(order) {
    order.waiting = false;
    order.declined = true;
    $scope.putMethod(order);
    $scope.deleteOrder(order);    
  };

  $scope.arrivedToOrder = function(order) {
    order.accepted = false;
    order.arrived = true;
    $scope.putMethod(order);
  };

  $scope.orderFulfilled = function(order) {
    order.arrived = false;
    order.done = true;
    $scope.putMethod(order);
    $scope.deleteOrder(order);
  };

}]);

app.controller('DispatchersController', ['$scope', '$http', function($scope, $http) {

  $http.get('/dispatchers/orders.json').success(function(data){
    $scope.orders = data;
  });



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
    .when('/dispatchers/orders', {
      templateUrl: 'templates/dispatcher.html',
      controller: 'DispatchersController'
    })
    .otherwise({
      redirectTo: '/'
    })
}]);

}) ();
