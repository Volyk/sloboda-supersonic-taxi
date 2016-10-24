(function() {
    angular
    .module('taxi')
    .controller('DriversController', ['$scope', '$http', function($scope, $http) {

        var dispatcher = new WebSocketRails(window.location.host + '/websocket');
        var notification = document.getElementById('notification');

        $http.get('/drivers/orders.json').success(function(data){
            $scope.orders = data;
        });

        dispatcher.bind('get_new_order', function() {
            $http.get('/drivers/orders.json').success(function(data){
                $scope.orders = data;
                if ($scope.orders[0].status == 'waiting') {
                    notification.play();
                }
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
}) ();
