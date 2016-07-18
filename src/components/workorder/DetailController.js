(function(angular) {
    'use strict';
    angular.module('iss.workorder')
    .controller('DetailController',['$scope', 'UriService','CascadeService', 'AlertService',
    function($scope, UriService, cascadeService, alertService) {
        var id = $scope.data.id;
        var ticketType = -1;
        $scope.list = {}; // * 初始化三级级联数据对象
        $scope.param = {}; // * 同上 

        var getData = function(id) {
            UriService.send({
                url : UriService.action_workOrderDetail,
                data : {
                    "id":id
                }
            }).then(function(res){
                if(200 != res.status) {
                    alertService.warning(res.err);
                    return;
                }
                var ticket = res.data.ticketDataVo;
                $scope.ticket = ticket;
                $scope.user = res.data.ticketUserInfo;
                $scope.courier = res.data.ticketCourierInfo;
                $scope.flag = res.data.flag;

                //SSY(1,"闪送员"),XTYH(2,"系统用户"),NOTXTYH(3,"新用户");
                //转换后   0闪送员|1客户
                ticketType = (ticket.userType==1?0:1);
                var defaultValue = [];

                // 级联回显数据
                if(ticket.qaQroupId1) {
                    defaultValue.push(ticket.qaQroupId1);
                }
                if(ticket.qaQroupId2) {
                    defaultValue.push(ticket.qaQroupId2);
                }
                if(ticket.qaQroupId3) {
                    defaultValue.push(ticket.qaQroupId3);
                }

                /**
                 * 初始化三级级联
                 */
                cascadeService.bulidCascadeSteps($scope, {
                    url: UriService.action_ticket_cascade,
                    data:{
                        pid: 0,
                        qaType: ticketType
                    },
                    resultKey: 'ticketQaGroups',
                    default: defaultValue
                });
            });
        };
        getData(id);
        
        //备注操作
        $scope.remark = function() {
            UriService.send({
                url : UriService.action_updateTicket,
                data : {
                    "id":$scope.ticket.id,
                    "status":-1,
                    "remark":$scope.ticket.remark
                }
            }).then(function(res) {
                if(200 == res.status) {
                    alertService.success("保存成功！");
                    getData(id);
                }else {
                    alertService.warning("保存失败！");
                }
            });
        };

        //保存操作
        $scope.submit = function(status) {
            UriService.send({
                url : UriService.action_saveTicket,
                data : {
                    "id":$scope.ticket.id,
                    "mobile":$scope.ticket.mobile,
                    "orderNumber":$scope.ticket.orderNumber,
                    "memberType":ticketType,
                    "qaQroupId1":$scope.param.qa1,
                    "qaQroupId2":$scope.param.qa2,
                    "qaQroupId3":$scope.param.qa3,
                    "remark":$scope.ticket.remark,
                    "status":status
                }
            }).then(function(res) {
                if(200 == res.status) {
                    alertService.success("保存成功！");
                    getData(id);
                }else {
                    alertService.warning("保存失败！");
                }
            });
        };


    }]);
})(window.angular);