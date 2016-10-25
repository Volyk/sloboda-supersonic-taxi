(function() {
    angular
    .module('taxi')
    .controller('DriversController', ['$scope', '$http', 'apiService', function($scope, $http, apiService) {

        var dispatcher = new WebSocketRails(window.location.host + '/websocket');
        var notification = document.getElementById('notification');

        apiService.getDriverOrders().then(function(data){
            $scope.orders = data;
        });

        dispatcher.bind('get_new_order', function() {
            $http.get('/drivers/orders.json').success(function(data){
                $scope.orders = data;
                if ($scope.orders[0].status === 'waiting') {
                    notification.play();
                }
            });
        });

        $scope.updateStatus = function(order) {
            var url = '/drivers/orders/' + order.id;
            apiService.updateOrder(url, order).then(function(){
                dispatcher.trigger('update_order', { id: order.id });
            });
        };

        $scope.acceptOrder = function(order) {
            order.status = 'accepted';
            $scope.updateStatus(order);
        };

        $scope.declineOrder = function(order) {
            order.status = 'declined';
            $scope.updateStatus(order);
        };

        $scope.arrivedToOrder = function(order) {
            order.status = 'arrived';
            $scope.updateStatus(order);
        };

        $scope.orderFulfilled = function(order) {
            order.status = 'done';
            $scope.updateStatus(order);
        };
    }]);
}) ();
