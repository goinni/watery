(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalSecondPushOrderController', ['$scope', '$modalInstance','modalData','UriService','AlertService',
    function( $scope, $modalInstance, modalData, uri, alertService) {
        $scope.modalData  = modalData;
        $scope.punishType = 'false';
        $scope.remark = "";

        //确定
        $scope.ok = function (){
            if(!$scope.remark){alertService.warning("备注不能为空！");return ;};
            uri.send({
                url: uri.action_second_pushorder,
                data: {
                    remark:$scope.remark,
                    punish:$scope.punishType,
                    orderNumber: modalData.orderInfo.orderNumber
                }
            }).then(function(res){
                if(res.status == 200){
                    alertService.success("操作成功");
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

