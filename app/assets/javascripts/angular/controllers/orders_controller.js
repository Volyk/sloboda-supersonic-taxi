(function() {
var app = angular.module('taxi', ['ngRoute']);

app.controller('CreateOrderController', ['$scope', '$http', function($scope, $http) {
    $scope.phone_pattern = /(0)[0-9]{9}/;
    $scope.email_pattern = /^(.+)@(.+)$/;
    $scope.addOrder = function() {
    // if (!$scope.order.email) {
    // $scope.order.email = '';
    // }
    $http.post('/orders', $scope.order).success(function(data){
        alert('Ваш заказ принят!');
        $scope.order = {};
    });
    };
}]);


app.controller('DriversController', ['$scope', '$http', function($scope, $http) {
  $scope.empty = true;

  $http.get('/drivers/orders.json').success(function(data){
    console.log(data);
    $scope.orders = data;
    if (data[0].phone) { 
      $scope.empty = false;
    }
  });

  $scope.acceptOrder = function(order) {
    order.waiting = false;
    order.accepted = true;
    $http.post('/drivers/orders', order);
  };

  $scope.declineOrder = function(order) {
    order.waiting = false;
    order.declined = true;
    $http.post('/drivers/orders', order);
  };

  $scope.arrivedToOrder = function(order) {
    order.arrived = true;
    $http.post('/drivers/orders', order);
  };

  $scope.orderFulfilled = function(order) {
    order.done = true;
    $http.post('/drivers/orders', order);
  };

}]);

app.controller('DispatchersController', ['$scope', '$http', function($scope, $http) {
  //will get and show data in template
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
