(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalOrderSureScoreController', ['$scope', '$modalInstance','modalData','UriService','AlertService',
    function( $scope, $modalInstance, modalData, uri, alertService) {
        $scope.modalData  = modalData;
        //确定
        $scope.ok = function (){
            uri.send({
                url: uri.action_order_score,
                data: {
                    orderNumber: modalData.orderInfo.orderNumber,
                    needPunish: 1 // 确认积分1 调整积分0
                }
            }).then(function(res){
                if(res.status == 200){
                    alertService.success('积分确认成功~!');
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

