(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalDeliveryController', ['$scope', '$modalInstance','modalData','UriService','AlertService',
    function( $scope, $modalInstance, modalData, uri, alertService) {
        $scope.modalData  = modalData;
        $scope.takecode = modalData.item.deliveryPassword; //收件码
        //确定
        $scope.ok = function (){
            uri.send({
                url: uri.action_order_delivery,
                data: {
                    infoId: modalData.item.infoId,
                    deliveryPassword: modalData.item.deliveryPassword,
                    courierId: modalData.courier.courierId,
                    orderNumber: modalData.orderNumber
                }
            }).then(function(res){
                if(res.status == 200){
                    alertService.add('收件成功~!');
                    $modalInstance.close();
                }else{
                    alertService.add(res.err,'danger');
                }
            });
        };
        //取消
        $scope.cancel = function (){
            $modalInstance.dismiss('cancel');
        };


    }]);

})(window.angular);

