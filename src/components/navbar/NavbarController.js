(function(angular){
    angular.module('iss.navbar')
    .controller('NavbarController',['$scope', '$rootScope', 'UriService',
    function($scope, $rootScope, UriService) {
    	// 我的工单
    	$scope.myTicket = function() {
	        $rootScope.addWorkspace({
	            name:'我的工单',
	            active:true,
	            isRemove: true,
	            content:UriService.page_my_ticket,
	            data:{
	            }
	        });
    	};
    	// 数据统计
    	$scope.ticketAmountMonitor = function() {
	        $rootScope.addWorkspace({
	            name:'工单数据量',
	            active:true,
	            isRemove: true,
	            content:UriService.page_ticket_amount_monitor,
	            data:{
	            }
	        });
    	};
    	$scope.timespanMonitor = function() {
	        $rootScope.addWorkspace({
	            name:'时段业务量',
	            active:true,
	            isRemove: true,
	            content:UriService.page_timespan_monitor,
	            data:{
	            }
	        });
    	};
    	$scope.ticketDetailMonitor = function() {
	        $rootScope.addWorkspace({
	            name:'工单明细',
	            active:true,
	            isRemove: true,
	            content:UriService.page_ticket_detail_monitor,
	            data:{
	            }
	        });
    	};
    	$scope.WaitingGrabTicketMonitor = function() {
	        $rootScope.addWorkspace({
	            name:'待抢单工单量',
	            active:true,
	            isRemove: true,
	            content:UriService.page_waiting_grab_ticket_monitor,
	            data:{
	            }
	        });
    	};
    	$scope.WaitingGrabWorkingMonitor = function() {
	        $rootScope.addWorkspace({
	            name:'待抢单工作量',
	            active:true,
	            isRemove: true,
	            content:UriService.page_waiting_grab_working_monitor,
	            data:{
	            }
	        });
    	};
    	//绑定信息
    	$scope.bindingUser = function() {
	        $rootScope.addWorkspace({
	            name:'绑定信息',
	            active:true,
	            isRemove: true,
	            content:UriService.page_binding_user_list,
	            data:{
	            }
	        });
    	};
    	//工单类型
    	$scope.ticketType = function() {
	        $rootScope.addWorkspace({
	            name:'工单类型',
	            active:true,
	            isRemove: true,
	            content:UriService.page_ticket_type_list,
	            data:{
	            }
	        });
    	};
    	//工单统计
    	$scope.ticketStatistic = function() {
	        $rootScope.addWorkspace({
	            name:"工单统计",
	            active:true,
	            isRemove: true,
	            content:UriService.page_ticket_statistic,
	        });
    	};

    }]);
})(window.angular);