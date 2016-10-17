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
    $scope.orders = data;
    angular.forEach($scope.orders, function(order, key) {
      order.waiting = true;
    })
    if ($scope.orders[0]) { 
      $scope.empty = false;
    }
  });

  $scope.deleteOrder = function(order) {
    var index = $scope.orders.indexOf(order);
    $scope.orders.splice(index, 1);
    if ($scope.orders[0]) { 
      $scope.empty = false;
    } else {
      $scope.empty = true;
    } 
  }

  $scope.acceptOrder = function(order) {
    order.waiting = false;
    order.accepted = true;
    $http.patch('/drivers/orders', order);
  };

  $scope.declineOrder = function(order) {
    order.waiting = false;
    order.declined = true;
    $http.patch('/drivers/orders', order);
    $scope.deleteOrder(order);    
  };

  $scope.arrivedToOrder = function(order) {
    order.accepted = false;
    order.arrived = true;
    $http.patch('/drivers/orders', order);
  };

  $scope.orderFulfilled = function(order) {
    order.arrived = false;
    order.done = true;
    $http.patch('/drivers/orders', order);
    $scope.deleteOrder(order);
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
