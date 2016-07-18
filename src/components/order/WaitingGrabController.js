(function(angular){
  'use strict';
  angular.module('iss.order')
  .controller("WaitingGrabController", ['$scope', '$rootScope', 'UriService', 'AlertService',
    function ($scope, $rootScope, UriService, alertService) {
      $scope.orderType = $scope.data.type;
    	var getData = function() {
            // alertService.warning("数据刷新中...");
    		UriService.send({
                  url:UriService.action_showPending,
                  data: {
                    "type":$scope.orderType
                  }
		   	}).then(function(res){
                  if(200 == res.status) {
                    // alertService.success("加载完成");
                    $scope.list = res.data;
                  }else {
                    alertService.warning(res.err);
                  }
        });
    	};
    	//Fetch WaitingGrab Order
    	getData();
	   	$scope.refresh = function() {
		    getData();
	   	};
	   	$scope.fetch = function() {
            alertService.warning("正在为您获取数据...");
    		UriService.send({
				  url: UriService.action_pickupPending,
                  data: {
                    "type":$scope.orderType
                  }
		   	}).then(function(res){
		   		if(200 == res.status) {
                    getData();
		   		}else {
		   			alertService.warning(res.err);
		   		}
		   	});
	   	};
      /**
       * 打开地图页面
       */
      $scope.openMapPage = function(orderNumber) {
        $rootScope.addWorkspace({
            name:'订单地图[' + orderNumber.substr(-6) + ']',
            active:true,
            isRemove: true,
            content: UriService.page_order_map,
            data:{
              "orderNumber": orderNumber,
              "time":Date.parse(new Date())
            }
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
    }]);
})(window.angular);