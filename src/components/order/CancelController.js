(function(angular){
    'use strict';
    angular.module('iss.order')
    .controller("CancelController", ['$scope', '$rootScope', 'UriService', '$uibModal', 'AlertService',
        function ($scope, $rootScope, UriService, $uibModal, alertService) {
        	var getData = function() {
                // alertService.warning("数据刷新中...");
        		UriService.send({
    				url:UriService.action_showComplain
    		   	}).then(function(res){
                    if(200 == res.status) {
                        // alertService.success("加载完成");
                        $scope.list = res.data;
                    }else {
                        alertService.warning(res.err);
                    }
    		   	});
        	};
        	//Fetch Complain Order
        	getData();
    	   	$scope.refresh = function() {
    			getData();
    	   	};
    	   	$scope.fetch = function() {
                alertService.warning("正在为您获取数据...");
        		UriService.send({
    				url:UriService.action_pickupComplain
    		   	}).then(function(res){
    		   		if(200 == res.status) {
    		   			getData();
    		   		}else {
    		   			alertService.warning(res.err);
    		   		}
    		   	});
    	   	};

            //订单备注
            $scope.orderRemark = function(orderNumber) {
                $uibModal.open({
                    windowTopClass: 'imodel-top-css',
                    templateUrl: UriService.page_orderRemark,
                    controller: 'OrderRemarkController',
                    resolve: {
                        modalData: function() {
                          return {
                            "orderNumber":orderNumber
                          };
                        }
                    }
                }).result.then(function() {
                    getData();
                }, function() {
                    //取消
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
                      name:'订单['+tempOrderEntity.orderInfo.orderNumber+']',
                      active:true,
                      isRemove: true,
                      content: UriService.order_detail,
                      data:{
                          orderEntity: tempOrderEntity
                      }
                    });
                });
            };

            /**
            * 处罚闪送员
            */
            $scope.punishment = function(orderNumber){
              $uibModal.open({
                windowTopClass: 'imodel-top-css',
                templateUrl: UriService.page_order_punishment,
                controller: 'ModalPunishmentController',
                
                resolve: {
                  modalData: function () {
                    return {
                    	orderInfo:{
                    		orderNumber:orderNumber
                    	}
                    };
                  }
                }

              });
            };

        }]);

})(window.angular);