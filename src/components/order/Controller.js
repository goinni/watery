(function(angular) {
  'use strict';
  angular.module('iss.order').
  controller('OrderListController', ['$state', '$scope', '$rootScope', '$stateParams', 'UriService', 'PagingService','AlertService',
  function($state, $scope, $rootScope, $stateParams, uri, PagingService, alertService) {
        var tempParam = $scope.data && $scope.data.param || {};
        $scope.data = {};
        $scope.data.marks = [];
        $scope.orderType = 0;//订单类型 all

        //分页初始化
        PagingService.resetPaging($scope);

         //设置分页事件
         PagingService.setPaging($scope,{
            changed: function(){
                tempParam.pageNo = $scope.data.paging.currentPage;
                tempParam.type = $scope.orderType;
                loadPagingData(tempParam);
            }
        });
       
        //初始加载第一页数据
        loadPagingData(tempParam);

        //加载分页数据
        function loadPagingData(param){
            uri.send({
                url: uri.action_orderlist,
                data: param
              }).then(function(res){
                    if(res.status == 200){
                        // alertService.success('订单列表数据加载成功');
                        var dataEntity = res.data;
                        var list = dataEntity.result;
                        $scope.data.marks = dataEntity.marks;
                        $scope.data.items = list;
                        //设置分页信息
                        PagingService.setPaging($scope,{
                            totalItems: dataEntity.total 
                        });
                    }else{
                        alertService.success(res.err);
                    }
              });
        }
        
        //查看订单详情
        $scope.data.lookOrderDetail = function(entity){
            // console.log(entity);
            $rootScope.addWorkspace({
                name:'订单['+entity.orderInfo.orderNumber.substr(-6)+']',
                active:true,
                isRemove: true,
                content: uri.order_detail,
                data:{
                    orderEntity: entity
                }
            });
        }
        //查看闪送员档案 
        //@param entity 闪送员信息
        $scope.data.lookCourierInfo = function(entity){
            $rootScope.addWorkspace({
                name:'闪送员['+entity.name+']',
                active:true,
                isRemove: true,
                content: uri.page_courier_info,
                data:{
                    courierEntity: entity
                }
            });
        };
        /**
         * 根据标签查询订单数据
         */
         $scope.isActive = [true];//缺省时第一个标签选中
        $scope.data.queryOrderByMark = function(item, index){
            if(item.id !=1 && item.id != 3){
                $scope.isActive = [];
                $scope.isActive[index] = true; //设置标签按钮互斥
            }

            $scope.orderType = item.id;//订单类型,待抢？取件？。。。
            if(1 == item.id || 9 == item.id) {
                if(1 == item.id) {
                    var name = '待抢单'
                }else {
                    var name = '新城市待抢单'
                }
                $rootScope.addWorkspace({
                    name:name,
                    active:true,
                    isRemove: true,
                    content: uri.page_waitingGrab,
                    data:{
                        type:item.id
                    }
                });
            }else if(3 == item.id) {
                $rootScope.addWorkspace({
                    name:'投诉单待处理单',
                    active:true,
                    isRemove: true,
                    content: uri.page_cancel,
                    data:{
                    }
                });
            }else {
                loadPagingData({
                    type: item.id,
                    pageNo: $scope.data.paging.currentPage
                });      
            }
        }

    }]);

})(window.angular);

