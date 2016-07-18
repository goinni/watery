(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('OrderDetailController', ['$log','$uibModal','$scope', '$rootScope', 'UriService', 'PagingService','AlertService','isDevelop',
    function($log, $uibModal, $scope, $rootScope, uri, PagingService, alertService, isDevelop) {
        $scope.isDevelop = isDevelop;
        var orderEntity = $scope.data.orderEntity;//单击[查看]传入workspace中的对象
        $scope.orderInfo = {};
        $scope.remarkWorkOrderList = [];//投诉备注信息列表

        /**
         * 获取订单详情基础信息
         */
        function getOrderBaseInfo(){
            uri.send({
                url: uri.action_orderdetial_custommer,
                restdata:{
                    orderNumber: orderEntity.orderInfo.orderNumber
                }
            }).then(function(res){
                if(res.status == 200){
                    $scope.orderInfo = res.data;
                    // alertService.add("订单基础数据加载完成");
                }else{
                    alert(res.err);
                }
            });
        }
        getOrderBaseInfo();
        /**
         * 订单投诉信息列表
         */
        function getOrderComplaints(){
            uri.send({
                url: uri.action_order_complaints,
                data:{
                    orderNumber: orderEntity.orderInfo.orderNumber
                }
            }).then(function(res){
                if(res.status == 200){
                    $scope.remarkWorkOrderList = res.data;
                    // alertService.add("订单投诉信息加载完成");
                }else{
                    alert(res.err);
                }
            });
        }
        getOrderComplaints();
        /**
         * 根据订单获取工单信息
         */
        function getWorkorderList(orderNumber){
            $scope.workOrderList = [];
            uri.send({
                url: uri.action_orderdetial_workorder,
                data:{
                    orderNumber: orderNumber
                }
            }).then(function(res){
                if(res.status == 200){
                    $scope.workOrderList = res.data;
                    // alertService.add("工单信息信息加载完成");
                }else{
                    alert(res.err);
                }
            });
        }
        getWorkorderList(orderEntity.orderInfo.orderNumber);
        /**
         * 编辑 工单
         */
        $scope.editWorkorder = function(item){
            $rootScope.addWorkspace({
                name: '工单详情[' + item.number + ']',
                active: true,
                isRemove: true,
                content:uri.page_ticket_detail,
                data:{
                    "id": item.id
                }
            });
        }
// -------------------------------------------------
// | 以上为模态窗口事件处理 |
// -------------------------------------------------
        /**
         * 确认积分
         */
        $scope.sureScore = function(){
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_order_sure_score,
              controller: 'ModalOrderSureScoreController',
              resolve: {
                modalData: function () {
                  return orderEntity;
                }
              }
            }).result.then(function() {
                getOrderBaseInfo();
            }, function() {
                //取消
            });
        };
        /**
         * 调整积分
         */
        $scope.changeScore = function(){
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_order_change_score,
              controller: 'ModalOrderChangeScoreController',
              resolve: {
                modalData: function () {
                  return orderEntity;
                }
              }
            }).result.then(function() {
                getOrderBaseInfo();
            }, function() {
                //取消
            });
        };
        /**
         * 闪送员并单
         */
        $scope.mergeorder = function(){
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_merge_order,
              controller: 'ModalMergeOrderController',
              resolve: {
                modalData: function () {
                  return $scope.orderInfo;
                }
              }
            }).result.then(function() {
                getOrderBaseInfo();
            }, function() {
                //取消
            });
        };
        /**
         * 处罚闪送员
         */
        $scope.punishment = function(){
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_order_punishment,
              controller: 'ModalPunishmentController',
              resolve: {
                modalData: function () {
                  return orderEntity;
                }
              }
            }).result.then(function() {
                // console.log("更新订单信息");
                getOrderBaseInfo();
            }, function() {
                //取消
            });
        };
        /**
         * 客服补贴
         */
        $scope.subsidy = function(order){
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_order_subsidy,
              controller: 'ModalSubsidyController',
              resolve: {
                modalData: function () {
                  return order;
                }
              }
            }).result.then(function() {
                // console.log("更新订单信息");
                getOrderBaseInfo();
            }, function() {
                //取消
            });
        }
        /**
         * 客服收件
         */
        $scope.delivery = function(item){
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_order_delivery,
              controller: 'ModalDeliveryController',
              resolve: {
                modalData: function () {
                  return {
                    courier: $scope.data.orderEntity.courierInfo,
                    orderNumber: $scope.data.orderEntity.orderInfo.orderNumber,
                    item: item
                  };
                }
              }
            }).result.then(function() {
                // console.log("更新订单信息");
                getOrderBaseInfo();
            }, function() {
                //取消
            });
        }
        /**
         * 手机号变更
         * @param index 0, "修改寄件人手机"; 1,"修改收件人手机"
         */
        $scope.senderMobileModify = function(order, index){
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_order_modifymobile,
              controller: 'ModalModifyMobileController',
              resolve: {
                modalData: function () {
                  return {
                    orderNumber: $scope.data.orderEntity.orderInfo.orderNumber,
                    order: order,
                    type: {
                        id: index,
                        name: index?'收件手机号变更':'寄件手机号变更'
                    }
                  };
                }
              }
            }).result.then(function() {
                // console.log("更新订单信息");
                getOrderBaseInfo();
            }, function() {
                //取消
            });
        }
        /**
         * 取件预约
         */
        $scope.takeAppointment = function(order){
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_order_appointments,
              controller: 'ModalAppointmentsController',
              resolve: {
                modalData: function () {
                  return {
                    orderNumber: $scope.data.orderEntity.orderInfo.orderNumber,
                    order: order,
                    type: {
                        id: order.infoId || 0,
                        name: order.infoId ? '收件预约' : '取件预约'
                    }
                  };
                }
              }
            }).result.then(function() {
                // console.log("更新订单信息");
                getOrderBaseInfo();
            }, function() {
                //取消
            });
        }
        /**
         * 创建工单
         */
        $scope.createWorkorder = function(order){
            $uibModal.open({
                windowTopClass: 'imodel-top-css',
                templateUrl: uri.page_new_work_order,
                controller: 'NewWorkOrderController',
                resolve: {
                    modalData: function () {
                      return {
                        "orderNumber": order.orderInfo.orderNumber,
                        "tel": order.orderInfo.creator
                      };
                    }
                }
            }).result.then(function (selectedItem) {
                // 添加新工单后，数据回显
                getWorkorderList(order.orderInfo.orderNumber);
            }, function () {
                //取消
            });
        }
        /**
         * 投诉备注
         */
         $scope.remarkWorkorder = function(){
            $uibModal.open({
                windowTopClass: 'imodel-top-css',
                templateUrl: uri.page_orderRemark,
                controller: 'OrderRemarkController',
                resolve: {
                    modalData: function() {
                      return {
                        "orderNumber": orderEntity.orderInfo.orderNumber
                      };
                    }
                }
            }).result.then(function() {
                // console.log("更新备注状态");
                getOrderComplaints();
            }, function() {
                //取消
            });
         }
         /**
          * 重推订单
          */
         $scope.secondPushOrder = function(){
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_second_pushorder,
              controller: 'ModalSecondPushOrderController',
              resolve: {
                modalData: function () {
                  return orderEntity;
                }
              }
            }).result.then(function() {
                // console.log("更新订单信息");
                getOrderBaseInfo();
            }, function() {
                //取消
            });
         };
        /**
         * 流单
         */
        $scope.dropOrder = function(order){
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_order_droporder,
              controller: 'ModalDropOrderController',
              resolve: {
                modalData: function () {
                  return order;
                }
              }
            }).result.then(function() {
                // console.log("更新订单信息");
                getOrderBaseInfo();
            }, function() {
                //取消
            });
        }
        /**
         * 取件
         */
        $scope.pickup = function(order){
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_order_pickup,
              controller: 'ModalPickupController',
              resolve: {
                modalData: function () {
                  return order;
                }
              }
            }).result.then(function() {
                // console.log("更新订单信息");
                getOrderBaseInfo();
            }, function() {
                //取消
            });
        }
        /**
         * 订单指派
         */
        $scope.assigning = function(order){
            // console.log(order);
            $uibModal.open({
              windowTopClass: 'imodel-top-css',
              templateUrl: uri.page_order_assigning,
              controller: 'ModalAssigningController',
              resolve: {
                modalData: function () {
                  return order;
                }
              }
            }).result.then(function() {
                // console.log("指派成功更新订单信息");
                getOrderBaseInfo();
            }, function() {
                //取消
            });
        }
        /**
         * 打开地图页面
         */
        $scope.openMapPage = function(orderNumber) {
            $rootScope.addWorkspace({
                name:'订单地图[' + orderNumber.substr(-6) + ']',
                active:true,
                isRemove: true,
                content: uri.page_order_map,
                data:{
                  "orderNumber": orderNumber,
                  "time":Date.parse(new Date())
                }
            });
        };
        /**
         * 打开轨迹页面
         */
        $scope.openTrailPage = function(orderNumber) {
            $rootScope.addWorkspace({
                name:'轨迹地图[' + orderNumber.substr(-6) + ']',
                active:true,
                isRemove: true,
                content: uri.page_trail_map,
                data:{
                    "orderNumber": orderNumber
                }
            });
        };
        /**
         * 用户档案
         * @param mobile从指令中传递过来的
         */
        $scope.userPorfile = function(mobile) {
            $rootScope.addWorkspace({
                name:'用户档案[' + mobile + ']',
                active:true,
                isRemove: true,
                content: uri.page_userProfile,
                data:{
                    "mobile": mobile
                }
            });
        };

    }]);

})(window.angular);

