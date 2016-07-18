(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalPickupController', ['$scope', '$modalInstance','$http','modalData','UriService','AlertService',
    function( $scope, $modalInstance, $http, modalData, uri, alertService) {
        $scope.modalData  = modalData;
        $scope.pickupCode = modalData.orderInfo.pickupPassword; //取件码
        //确定
        $scope.ok = function (){
            uri.send({
                url: uri.action_order_pickup,
                data: {
                    pickupPassword: modalData.orderInfo.pickupPassword,
                    orderNumber: modalData.orderInfo.orderNumber
                }
            }).then(function(res){
                if(res.status == 200){
                    alertService.success('取件成功~!');
                    $modalInstance.close();
                }else{
                    alertService.danger(res.err);
                }
            });
        };
        //取消
        $scope.cancel = function (){
            $modalInstance.dismiss('cancel');
        };


    }]);

})(window.angular);

