(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalAssigningController', ['$scope', '$modalInstance','$http','modalData','UriService','AlertService',
    function( $scope, $modalInstance, $http, modalData, uri, alertService) {
        console.log(modalData);
        $scope.modalData  = modalData;
        $scope.mobile = ''; //指派的闪送员手机号
        $scope.remark = ''; //备注
        //确定
        $scope.ok = function (){
            uri.send({
                url: uri.action_order_assigning,
                data: {
                    takedMobile: $scope.mobile,
                    remark: $scope.remark,
                    orderNumber: modalData.orderInfo.orderNumber
                }
            }).then(function(res){
                if(res.status == 200){
                    alertService.add('指派成功~!');
                    $modalInstance.close();
                }else{
                    $scope.isDisabled = false;
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

