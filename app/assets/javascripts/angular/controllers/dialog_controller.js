(function(){
    angular
    .module('taxi')
    .controller('DialogController', ['$scope', '$http', function($scope, $http) {

        var dispatcher = new WebSocketRails(window.location.host + '/websocket');

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

        function putMethod(data) {
            if (data.driver_id) {
                data.driver_id = data.driver_id.id;
                data.status = 'waiting';
            }
            var url = '/drivers/orders/' + data.id;
            $http.put(url, {order: data}).success(function(){
                dispatcher.trigger('update_order', { id: data.id });
                if(data.status == 'canceled') {
                    var index = $scope.orders.indexOf($scope.ngDialogData);
                    $scope.orders.splice(index, 1);
                }
            });
        }

        $scope.addOrder = function(){
            $scope.ngDialogData.passengers = $scope.options.selectedOption.value;
            putMethod($scope.ngDialogData);
            return true;
        };


        $scope.updateOrder = function() {
            putMethod($scope.ngDialogData);
            return true;
        };


        $scope.cancelOrder = function() {
            $scope.ngDialogData.status = 'canceled'; 
            putMethod($scope.ngDialogData);
            return true;
        };

    }]);
}) ();
