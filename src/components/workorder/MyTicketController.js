(function(angular){
    //MyTicket
    angular.module('iss.workorder')
    .controller('MyTicketController',['$scope', '$rootScope', 'UriService', 'AlertService',
    function($scope, $rootScope, UriService, alertService) {
    	var getMyTicket = function(type) {
	    	UriService.send({
	    		url:UriService.action_myTicket,
	    		data:{
	    			"status":type
	    		}
	    	}).then(function(res){
                if(200 != res.status) {
                    alertService.warning(res.err);
                    return;
                }
	    		$scope.ticketList = res.data.list;
                $scope.count1 = res.data.count1;
                $scope.count2 = res.data.count2;
                $scope.count3 = res.data.count3;
	    	});
    	};
    	//加载默认数据
    	getMyTicket(1);
    	$scope.getMyTicket = function(type) {
    		getMyTicket(type);
    	};
    }]);
})(window.angular);