(function(){
    angular
    .module('taxi')
    .controller('DispatchersController', ['$scope', '$http', 'ngDialog', 'apiService', function($scope, $http, ngDialog, apiService) {

        var dispatcher = new WebSocketRails(window.location.host + '/websocket');
        var notification = document.getElementById('notification');

        apiService.getDispatcherOrders().then(function(data){
            $scope.orders = data;
        });
        apiService.getDrivers().then(function(data){
            $scope.drivers = data;
        });

        dispatcher.bind('get_drivers', function() {
            $http.get('/dispatchers/drivers.json').success(function(data){
                $scope.drivers = data;
            });
        });

        dispatcher.bind('get_orders', function() {
            $http.get('/dispatchers/orders.json').success(function(data){
                $scope.orders = data;
            });
            notification.play();
        });

        $scope.create = function(){
            ngDialog.open({ template: 'templates/order.html', scope: $scope, controller: 'DialogController', className: 'ngdialog-theme-default' });
        };

        $scope.update = function(order){
            order.isUpdating = true;
            ngDialog.open({ template: 'templates/order.html', data: order, scope: $scope, controller: 'DialogController', className: 'ngdialog-theme-default' });
        };


        $scope.confirmCancel = function(order){
            ngDialog.open({ template: 'confirm', data: order, controller: 'DialogController', className: 'ngdialog-theme-default' });
        };

    }]);
    
}) ();
