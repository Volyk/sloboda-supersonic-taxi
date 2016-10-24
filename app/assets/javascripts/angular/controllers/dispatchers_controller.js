(function(){
    angular
    .module('taxi')
    .controller('DispatchersController', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {

        var dispatcher = new WebSocketRails(window.location.host + '/websocket');
        var notification = document.getElementById('notification');

        $http.get('/dispatchers/orders.json').success(function(data){
            $scope.orders = data;
        });

        $http.get('/dispatchers/drivers.json').success(function(data){
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
            $http.put('/orders', {order: $scope.ngDialogData}).success(function(){
                dispatcher.trigger('update_order', { id: $scope.ngDialogData.id });
            });
            return true;
        };

        $scope.confirmCancel = function(order){
            ngDialog.open({ template: 'confirm', data: order, controller: 'DispatchersController', className: 'ngdialog-theme-default' });
        };

        $scope.cancelOrder = function() {
            $scope.ngDialogData.status = 'canceled'; 
            $http.put('/orders/', {order: $scope.ngDialogData}).success(function(data){
                var index = $scope.orders.indexOf(data);
                $scope.orders.splice(index, 1);
            });
            return true;
        };
    }]);
}) ();
