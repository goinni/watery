(function(angular){
  'use strict';
    angular.module('iss.order')
    .controller("OrderRemarkController", ['$scope', '$rootScope', 'UriService', 'modalData', '$modalInstance','AlertService',
        function ($scope, $rootScope, UriService, modalData, $modalInstance, alertService) {
            $scope.orderNumber = modalData.orderNumber;
            $scope.submit = function() {
                UriService.send({
                    url : UriService.action_orderRemark,
                    data : {
                        "orderNumber": $scope.orderNumber,
                        "remark": $scope.remark,
                    }
                }).then(function(res) {
                    if(200 == res.status) {
                        alertService.success("订单操作成功！");
                        $modalInstance.close('ok');
                    }else {
                        alertService.danger("操作失败！");
                    }
                });
            };
            //取消
            $scope.cancel = function (){
                $modalInstance.dismiss('cancel');
            };
        }]);
})(window.angular);