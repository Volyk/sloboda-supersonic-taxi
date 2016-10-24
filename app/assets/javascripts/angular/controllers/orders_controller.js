(function () {
    angular
    .module('taxi')
    .controller('CreateOrderController', ['$scope', '$http', function($scope, $http) {
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

        $scope.moreOrders = function() {
            $scope.disabled = false;
        };

        $scope.addOrder = function() {
            if (!$scope.ngDialogData.email) {
                $scope.ngDialogData.email = '';
            }
            $scope.ngDialogData.email = $scope.ngDialogData.email.toLowerCase();
            $scope.ngDialogData.passengers = $scope.options.selectedOption.value;
            $http.post('/orders', {order: $scope.ngDialogData}).success(function(){
                alert('Ваш заказ принят!');
                $scope.disabled = true;
                $scope.orderForm.$setPristine();
                $scope.orderForm.$setUntouched();
                $scope.ngDialogData = {};
            });
        };
    }]);
}) ();
