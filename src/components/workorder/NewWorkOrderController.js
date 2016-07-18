(function(angular) {
    'use strict';
    angular.module('iss.workorder')
    .controller('NewWorkOrderController',['$scope', '$rootScope', 'UriService', 'modalData', '$modalInstance','CascadeService', 'AlertService',
    function($scope, $rootScope, UriService, modalData, $modalInstance, cascadeService, alertService) {
        $scope.orderNumber = modalData.orderNumber;
        $scope.tel = modalData.tel;
        //保存操作
        $scope.submit = function(status) {
            UriService.send({
                url : UriService.action_saveTicket,
                data : getParamData(status)
            }).then(function(res) {
                if(200 == res.status) {
                    alertService.success("操作成功！");
                    //数据回显
                    $modalInstance.close({
                        list: $scope.list,
                        data: getParamData(status)
                    });
                }else {
                    alertService.warning(res.err);
                }
            });
        };
        //获取提交参数
        function getParamData(status){
            return {
                    "mobile": $scope.tel,
                    "orderNumber": $scope.orderNumber,
                    "memberType": $scope.ticketType,
                    "qaQroupId1": $scope.param.qa1,
                    "qaQroupId2": $scope.param.qa2,
                    "qaQroupId3": $scope.param.qa3,
                    "remark": $scope.remark,
                    "status": status
                };
        }
        //取消
        $scope.cancel = function (){
            $modalInstance.dismiss('cancel');
        };
        // 用户1 or 闪送员0 (级联类型)
        $scope.ticketType = 1;

        //切换工单类型
        $scope.changeType = function(type) {
            $scope.ticketType = type;
            initCascade(type);
        };
        //默认初始化级联类型
        initCascade(1);

        /**
         * 三级级联初始化
         */
        function initCascade(type) {
            cascadeService.bulidCascadeSteps($scope,{
                url: UriService.action_ticket_cascade,
                data:{
                    pid: 0,
                    qaType: type
                },
                resultKey: 'ticketQaGroups'
            });
        };
    }]);


})(window.angular);