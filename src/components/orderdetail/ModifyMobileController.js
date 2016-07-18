(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalModifyMobileController', ['$scope', '$modalInstance','$http','modalData','UriService','AlertService',
    function( $scope, $modalInstance, $http, modalData, uri, alertService) {
        $scope.isDisabled = false;
        $scope.modalData  = modalData;
        $scope.mobile = ''; //新手机号
        //确定
        $scope.ok = function (){
            $scope.isDisabled = true;
            uri.send({
                url: uri.action_order_mobilechange,
                data: {
                    infoId: modalData.order.infoId || 0,
                    target: modalData.type.id,
                    orderNumber: modalData.orderNumber,
                    mobile: $scope.mobile
                }
            }).then(function(res){
                if(res.status == 200){
                    alertService.success('修改成功~!');
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

