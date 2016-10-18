(function() {
var app = angular.module('taxi', ['ngRoute', 'ngDialog']);

app.controller('CreateOrderController', ['$scope', '$http', function($scope, $http) {
  $scope.options = {
    availableOptions: [
      {value: '1'}, {value: '2'}, {value: '3'}, {value: '4'}, 
      {value: '5'}, {value: '6'}, {value: '7'}, {value: '8'}
    ],
    selectedOption: {value: '1'}
  };
  $scope.phone_pattern = /(0)[0-9]{9}/;
  $scope.email_pattern = /^(.+)@(.+)$/;
  $scope.addOrder = function() {
    if (!$scope.order.email) {
      $scope.order.email = '';
    }
    $scope.order.email = $scope.order.email.toLowerCase();
    $scope.order.passengers = $scope.options.selectedOption.value;
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
  $scope.options = {
    availableOptions: [
      {value: '1'}, {value: '2'}, {value: '3'}, {value: '4'}, 
      {value: '5'}, {value: '6'}, {value: '7'}, {value: '8'}
    ],
    selectedOption: {value: '1'}
  };
  $scope.phone_pattern = /(0)[0-9]{9}/;
  $scope.email_pattern = /^(.+)@(.+)$/;
  
  $scope.isDispatcher = true;

  $scope.create = function(){
    ngDialog.open({ template: 'templates/order.html', controller: 'DispatchersController', className: 'ngdialog-theme-default' });
  };

  $scope.addOrder = function(){
    $scope.order.passengers = $scope.options.selectedOption.value;
    $http.post('/orders', $scope.order); //need to heck url
  };

  $scope.update = function(order){
    ngDialog.open({ template: 'templates/updateOrder.html', data: order, controller: 'DispatchersController', className: 'ngdialog-theme-default' });
  };

  $scope.updateOrder = function() {
    $http.put('/orders/', $scope.order).success(function(data){
      console.log(data);
    })
  }
 // $http.get('/dispatchers/orders.json').success(function(data){
 //   $scope.orders = data;
 // });

  // $http.get('/drivers.json').success(function(data){
  //   $scope.drivers = data;
  // });

// will be received by $http methods (need to check url's), just to test
  $scope.orders = [
    {
     phone: '0987654321',
     id: 1,
     created_at: "17.10.2016 18:15",
     start_point: 'start point 1',
     end_point: 'end point 1',
     passengers: '3',
     baggage: true,
     comment: 'comment 1'  
    },
    {
     phone: '0932323221',
     id: 2,
     created_at: "17.10.2016 18:05",
     start_point: 'start point 2',
     end_point: 'end point 2',
     passengers: '1',
     baggage: false,
     comment: 'comment 2'
    },
    {
     phone: '0988585541',
     id: 3,
     created_at: "17.10.2016 17:55",
     start_point: 'start point 3',
     end_point: 'end point 3',
     passengers: '2',
     baggage: true,
     comment: 'comment 3'
    }
  ];
 $scope.drivers = [
   {
     id: 1,
     name: 'Firstname-1'
   },
   {
     id: 2,
     name: 'Firstname-2'
   }
 ];


}]);

app.directive('orderForm', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/order.html'
  };
});

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
