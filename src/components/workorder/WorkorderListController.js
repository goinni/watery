(function(angular) {
    'use strict';
    angular.module('iss.workorder')
    .controller('WorkorderListController',['$scope','$rootScope', '$state', '$stateParams', 'UriService','PagingService', '$uibModal','AlertService',
    function($scope,$rootScope, $state, $stateParams, uriService, PagingService, $uibModal, alertService) {
        $scope.data = {};
        $scope.data.marks = [];
        $scope.orderType = 1;//工单类型

        //分页初始化
        PagingService.resetPaging($scope);

         //设置分页事件
         PagingService.setPaging($scope,{
            changed: function(){
                loadPagingData({
                    status: $scope.orderType,
                    pageNo: $scope.data.paging.currentPage
                });
            }
        });
       
        //初始加载第一页数据
        $scope.hasCatchOrder = true; //领单按钮是否可用
        loadPagingData({
            status: 1, //待处理工单
            pageNo: 1
        });

        //订单详情
        $scope.data.orderDetail = function(orderNumber) {
            uriService.send({
                url:uriService.action_orderlist,
                data:{
                    "st":"2015-01-01",
                    "et":moment().format('YYYY-MM-DD'),
                    "key": "1001",
                    "searchValue": orderNumber
                }
            }).then(function(res){
                var tempOrderEntity = res.data.result[0];
                $rootScope.addWorkspace({
                    name:'订单['+tempOrderEntity.orderInfo.orderNumber+']',
                    active:true,
                    isRemove: true,
                    content: uriService.order_detail,
                    data:{
                        orderEntity: tempOrderEntity
                    }
                });
            });
        };

        //加载分页数据
        function loadPagingData(param){
            uriService.send({
                url: uriService.action_workorder_list,
                data: param
              }).then(function(res){
                    if(res.status == 200){
                        // alertService.success("工单列表数据加载成功");
                        if(param.status == 1|| param.status == 4){
                            $scope.hasCatchOrder = true;
                        }else{
                            $scope.hasCatchOrder = false;
                        }
                        var dataEntity = res.data;
                        var list = dataEntity.result;
                        $scope.data.marks = dataEntity.marks;
                        $scope.data.items = list;
                        //设置分页信息
                        PagingService.setPaging($scope,{
                            totalItems: dataEntity.total 
                        });
                    }else{
                        alertService.danger(res.err);
                    }
              });
        }

        /**
         * 领单
         */
        $scope.data.catchOrder = function(item){
            uriService.send({
                url: uriService.action_workorder_list_catchOrder,
                data: {
                    pid: item.id
                }
            }).then(function(res){
                    if(res.status == 200){
                        alertService.success('领单成功: '+item.number);
                        //领单成功重新加载列表数据
                        loadPagingData({
                            status: $scope.orderType,
                            pageNo: $scope.data.paging.currentPage
                        });
                    }else{
                        alertService.danger(res.err);
                    }
            });
        }
        /**
         * 查看工单详情
         */
        $scope.data.lookOrderDetail = function(item){
            $rootScope.addWorkspace({
                name:'工单详情[' + item.number + ']',
                active:true,
                isRemove: true,
                content:uriService.page_ticket_detail,
                data:{
                    "id":item.id
                }
            });
        }
        /**
         * 根据标签查询工单数据
         */
         $scope.isActive = [true];//缺省时第一个标签选中
        $scope.data.queryOrderByMark = function(item, index){
            $scope.isActive = [];
            $scope.isActive[index] = true; //设置标签按钮互斥
            $scope.orderType = item.id;//工单类型,待抢？取件？。。。
            loadPagingData({
                status: item.id,
                pageNo: $scope.data.paging.currentPage
            });

        }
        
}]);

})(window.angular);