(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalPunishmentController', ['$scope', '$modalInstance','modalData','UriService','AlertService',
    function( $scope, $modalInstance, modalData, uri, alertService) {
        $scope.modalData  = modalData;
        $scope.param = {
            punishType: 1,
            number:'',
            remark:'',
            orderNumber: modalData.orderInfo.orderNumber
        };
        $scope.list={
            numberlist:[]
        }
        //获取处罚类型
        $scope.loadPunishType = function (type){
            uri.send({
                url: uri.action_order_punishment_type,
                data: {
                    type: type
                }
            }).then(function(res){
                if(res.status == 200){
                    $scope.list.numberlist = res.data;
                    alertService.success("处罚类型加载完成");
                }else{
                    alertService.danger(res.err);
                }
            });
        }
        //初始化处罚类型 - 警告!
        $scope.loadPunishType($scope.param.punishType);
        //确定
        $scope.ok = function (){
            console.log($scope.param);
            uri.send({
                url: uri.action_order_punishment,
                data: $scope.param
            }).then(function(res){
                if(res.status == 200){
                    alertService.success('处罚操作成功~!');
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

