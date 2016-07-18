(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalMergeOrderController', ['$scope', '$modalInstance','modalData','UriService','AlertService',
    function( $scope, $modalInstance, modalData, uri, alertService) {
        $scope.modalData  = modalData;
        $scope.courierOrderInfo = null; //闪送员订单信息
        $scope.paramData = {
            currentOrderId: modalData.orderInfo.orderId,// 当前订单ID
            orderIds:'', // 闪送员订单ID
            courierMobile:'', // 闪送员手机号
        }
        console.log(modalData);
        //获取闪送员订单信息
        $scope.getCourierOrderInfo = function(){
            if(!$scope.paramData.courierMobile){
                alertService.warning('手机号不能为空');
                return ;
            }
            uri.send({
                url: uri.action_courier_orderInfo,
                data: {
                    orderNumber: modalData.orderInfo.orderNumber,// 当前订单ID
                    courierMobile: $scope.paramData.courierMobile
                }
            }).then(function(res){
                if(res.status == 200){
                    var ds = res.data;
                    $scope.courierOrderInfo = ds;
                    if(ds && ds.length){
                        var ids = [];
                        //构造请求参数ID
                        for(var i = 0; i< ds.length; i++){
                                ids.push(ds[i].orderId);
                        }
                        $scope.paramData.orderIds=ids.join(',');
                    }
                    alertService.success('闪送员订单信息获取成功~!');
                }else{
                    alertService.danger(res.err);
                }
            });
        }
        //确定
        $scope.ok = function (){
            uri.send({
                url: uri.action_merge_order,
                data: $scope.paramData
            }).then(function(res){
                if(res.status == 200){
                    alertService.success('并单成功~!');
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

