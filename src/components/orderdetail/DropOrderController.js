(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalDropOrderController', ['$scope', '$modalInstance','modalData','UriService','AlertService',
    function( $scope, $modalInstance, modalData, uri, alertService) {

        $scope.modalData  = modalData;
        $scope.remark = ''; //流单原因
        $scope.xtype = '1'; //流单类型
        //确定
        $scope.ok = function (){
            uri.send({
                url: uri.action_order_droporderabort,
                data: {
                    abortType: $scope.xtype,
                    reason: $scope.remark,
                    orderNumber: modalData.orderInfo.orderNumber
                }
            }).then(function(res){
                if(res.status == 200){
                    alertService.success('流单成功~!');
                    $modalInstance.close();
                }else{
                    $scope.isDisabled = false;
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

