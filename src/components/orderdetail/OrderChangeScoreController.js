(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalOrderChangeScoreController', ['$scope', '$modalInstance','modalData','UriService','AlertService',
    function( $scope, $modalInstance, modalData, uri, alertService) {
        $scope.modalData  = modalData;
        $scope.scoreAdjustReason = {}; //积分调整  A,B,C,D,E
        //确定
        $scope.ok = function (){
            var rs = buildReason();
            uri.send({
                url: uri.action_order_score,
                data: {
                    scoreAdjustReason: rs,
                    orderNumber: modalData.orderInfo.orderNumber,
                    needPunish: 0 // 确认积分1 调整积分0
                }
            }).then(function(res){
                if(res.status == 200){
                    alertService.success('积分调整成功~!');
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
        //构造请求参数
        function buildReason(){
            var r = [],re = $scope.scoreAdjustReason;
            for(var key in re){
                if(re[key]){
                    r.push(key);
                }
            }
            return r.join(',');
        }

    }]);

})(window.angular);

