(function() {
var app = angular.module('taxi', ['ngRoute']);

app.controller('CreateOrderController', ['$scope', '$http', function($scope, $http) {
    $scope.phone_pattern = /(0)[0-9]{9}/;
    $scope.email_pattern = /^(.+)@(.+)$/;
    $scope.addOrder = function() {
    if (!$scope.order.email) {
      $scope.order.email = '';
    }
    $http.post('/orders', $scope.order).success(function(data){
        alert('Ваш заказ принят!');
        $scope.order = {};
    });
    };
}]);


app.controller('DriversController', ['$scope', '$http', function($scope, $http) {
  $scope.empty = true;
  // for angular to show different buttons
  $scope.status = function() { 
    if ($scope.order.status == 'waiting') {
      $scope.waiting = true;
      $scope.accepted = false;
      $scope.arrived = false;
    } else if ($scope.order.status == 'accepted') {
      $scope.waiting = false;
      $scope.accepted = true;
      $scope.arrived = false;
    } else if ($scope.order.status == 'arrived') {
      $scope.waiting = false;
      $scope.accepted = false;
      $scope.arrived = true;
    } 
  };

  $http.get('/drivers/orders.json').success(function(data){
    $scope.order = data[0];
    $scope.order.status = 'waiting';
    if ($scope.order.phone) { 
      $scope.empty = false;
    }
    $scope.status();
  });

  $scope.acceptOrder = function() {
    $scope.order.status = 'accepted';
    $http.post('/drivers/orders', $scope.order).success(function(){
      $scope.status();
    });
  };

  $scope.declineOrder = function() {
    $scope.order.status = 'declined';
    $http.post('/drivers/orders', $scope.order).success(function(){
      $scope.empty = true;
    });
  };
  $scope.arrivedToOrder = function() {
    $scope.order.status = 'arrived';
    $http.post('/drivers/orders', $scope.order).success(function(){
      $scope.status();
    });
  };
  $scope.orderFulfilled = function() {
    $scope.order.status = 'fulfilled';
    $http.post('/drivers/orders', $scope.order).success(function(){
      $scope.status();
    });
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
