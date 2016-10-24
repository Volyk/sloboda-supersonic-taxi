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
  $scope.disabled = false;

  $scope.addOrder = function() {
    if (!$scope.ngDialogData.email) {
      $scope.ngDialogData.email = '';
    }
    $scope.ngDialogData.email = $scope.ngDialogData.email.toLowerCase();
    $scope.ngDialogData.passengers = $scope.options.selectedOption.value;
    $http.post('/orders', {order: $scope.ngDialogData}).success(function(data){
      alert('Ваш заказ принят!');
      $scope.disabled = true;
      $scope.orderForm.$setPristine();
      $scope.orderForm.$setUntouched();
      $scope.ngDialogData = {};
    });
  };

}]);


app.controller('DriversController', ['$scope', '$http', function($scope, $http) {

  var dispatcher = new WebSocketRails(window.location.host + '/websocket');
  var notification = document.getElementById("notification");

  $http.get('/drivers/orders.json').success(function(data){
    $scope.orders = data;
  });

  dispatcher.bind('get_new_order', function(data) {
    $http.get('/drivers/orders.json').success(function(data){
      $scope.orders = data;
    });
  });

  $scope.deleteOrder = function(order) {
    var index = $scope.orders.indexOf(order);
    $scope.orders.splice(index, 1);
  };

  $scope.putMethod = function(order) {
    var url = '/drivers/orders/' + order.id;
    $http.put(url, {order: order}).success(function(){
      dispatcher.trigger('update_order', { id: order.id });
    });
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
  if (window.dispatcher == undefined) {
    window.dispatcher = new WebSocketRails(window.location.host + '/websocket');
  }
  var notification = document.getElementById("notification");

  $http.get('/dispatchers/orders.json').success(function(data){
    $scope.orders = data;
  });

  $http.get('/dispatchers/drivers.json').success(function(data){
    $scope.drivers = data;
  });

  dispatcher.bind('get_drivers', function(data) {
    $http.get('/dispatchers/drivers.json').success(function(data){
      $scope.drivers = data;
    });
  });

  dispatcher.bind('get_orders', function(data) {
    $http.get('/dispatchers/orders.json').success(function(data){
      $scope.orders = data;
    });
  });

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
    $scope.ngDialogData.passengers = $scope.options.selectedOption.value;
    if ($scope.ngDialogData.driver_id) {
      $scope.ngDialogData.driver_id = $scope.ngDialogData.driver_id.id;
      $scope.ngDialogData.status = 'waiting';
    }
    $http.post('/orders', {order: $scope.ngDialogData}).success(function() {
      dispatcher.trigger('update_order', { id: $scope.ngDialogData.id });
    });
    return true;
  };

  $scope.update = function(order){
    order.isUpdating = true;
    ngDialog.open({ template: 'templates/order.html', data: order, controller: 'DispatchersController', className: 'ngdialog-theme-default' });
  };

  $scope.updateOrder = function() {
    if ($scope.ngDialogData.driver_id) {
      $scope.ngDialogData.driver_id = $scope.ngDialogData.driver_id.id;
      $scope.ngDialogData.status = 'waiting';
    }
    var url = '/drivers/orders/' + $scope.ngDialogData.id;
    $http.put(url, {order: $scope.ngDialogData}).success(function(){
      dispatcher.trigger('update_order', { id: $scope.ngDialogData.id });
    });
    return true;
  };

  $scope.confirmCancel = function(order){
    ngDialog.open({ template: 'confirm', data: order, controller: 'DispatchersController', className: 'ngdialog-theme-default' });
  }

  $scope.cancelOrder = function() {
    $scope.ngDialogData.status = 'canceled';
    var url = '/drivers/orders/' + $scope.ngDialogData.id;
    $http.put(url, {order: $scope.ngDialogData}).success(function(data){
      dispatcher.trigger('update_order', { id: $scope.ngDialogData.id });
      var index = $scope.orders.indexOf(data);
      $scope.orders.splice(index, 1);
    });
    return true;
  };

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
