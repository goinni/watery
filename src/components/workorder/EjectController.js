(function(angular) {
  	'use strict';
    //workorder eject
    angular.module('iss.workorder')
	.controller('EjectController',['$scope', '$rootScope', 'UriService', '$uibModal', 'AlertService',
    function($scope, $rootScope, UriService, $uibModal, alertService) {
        var tel = $scope.data.tel;
        //获取工单弹屏信息
        var getData = function(tel) {
            UriService.send({
                url : UriService.action_ticketEject,
                data : {
                    "mobile":tel
                }
            }).then(function(res) {
                if(200 != res.status) {
                    alertService.warning(res.err);
                    return;
                }
                var data = res.data;
                $scope.userInfo = data.ticketUserInfo;
                if(null != data.ticketUserInfo && null != data.ticketUserInfo.type) {
                    $scope.saveFlag = 0;
                }else {
                    if(null != data.ticketUser) {
                        $scope.saveFlag = 0;
                        $scope.userInfo.name = data.ticketUser.name;
                        $scope.userInfo.city = data.ticketUser.city;
                    }else {
                        $scope.saveFlag = 1;
                    }
                }

                $scope.courierInfo = data.ticketCourierInfo;
                $scope.orderList = data.ticketOrderInfoList;
                $scope.ticketList = data.ticketList;
            });
        }
        getData(tel);

        //保存用户
        $scope.saveUser = function() {
            UriService.send({
                url : UriService.action_saveTicketUser,
                data : {
                    "name":$scope.userInfo.name,
                    "cityName":$scope.userInfo.city,
                    "mobile":tel
                }
            }).then(function(res) {
                if(200 == res.status) {
                    alertService.success("保存成功！");
                    getData(tel);
                }else {
                    alertService.warning("保存失败！");
                }
            });
        };

        //工单详情页面
        $scope.ticektDetail = function(ticketNumber, id) {
            $rootScope.addWorkspace({
                name:'工单详情[' + ticketNumber.substr(-6) + ']',
                active:true,
                isRemove: true,
                content:UriService.page_ticket_detail,
                data:{
                    "id":id
                }
            });
        };
        
        //点击新建工单
        $scope.newWorkOrder = function(orderNumber){
            $uibModal.open({
                windowTopClass: 'imodel-top-css',
                templateUrl: UriService.page_new_work_order,
                controller: 'NewWorkOrderController',
                resolve: {
                    modalData: function () {
                      return {
                        "orderNumber":orderNumber,
                        "tel":$scope.data.tel
                      };
                    }
                }
            }).result.then(function() {
                getData(tel);
            }, function() {
                getData(tel);
            });
        };

        //查看订单详情
        $scope.orderDetail = function(orderNumber) {
            UriService.send({
                url:UriService.action_orderlist,
                data:{
                    "st":"2015-01-01",
                    "et":moment().format('YYYY-MM-DD'),
                    "key": "1001",
                    "searchValue": orderNumber
                }
            }).then(function(res){
                if(200 != res.status) {
                    alertService.warning(res.err);
                    return;
                }
                var tempOrderEntity = res.data.result[0];
                $rootScope.addWorkspace({
                    name:'订单['+tempOrderEntity.orderInfo.orderNumber.substr(-6)+']',
                    active:true,
                    isRemove: true,
                    content: UriService.order_detail,
                    data:{
                        orderEntity: tempOrderEntity
                    }
                });
            });
        };
       
    }]);

})(window.angular);