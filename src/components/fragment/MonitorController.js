(function(angular){
	//时段业务量监控
    angular.module('iss.fragment')
    .controller('TimespanMonitorController',['$scope', '$rootScope', 'UriService', 'SearchBarDatePickerService', 'AlertService',
    function($scope, $rootScope, UriService, datepicker, alertService) {
    	var getData = function(page, st, et, type) {
	    	UriService.send({
	    		url:UriService.action_timespanMonitor,
	    		data: {
	    			"page":page,
	    			"st":st,
	    			"et":et,
	    			"type":type
	    		}
	    	}).then(function(res){
                if(200 != res.status) {
                    alertService.warning(res.err);
                    return;
                }
	    		$scope.data = res.data;
	    	});
    	};
    	//init
    	$scope.getData = function(page){
    		getData(page, $scope.st, $scope.et, $scope.data.type);
    	};
    	$scope.data.type = "1";//初始化默认类型为1
    	$scope.userType = [
    		{"id":"1", "name":"电话组"}, 
    		{"id":"2", "name":"投诉组"}
    	];
    	getData(null, null, null, 1);
    	initDatapicker($scope, datepicker);
    }]);
    //工单明细监控
    angular.module('iss.fragment')
    .controller('TicketDetailMonitorController',['$scope', '$rootScope', 'UriService', 'SearchBarDatePickerService', 'AlertService',
    function($scope, $rootScope, UriService, datepicker, alertService) {
    	var getData = function(page, st, et) {
	    	UriService.send({
	    		url:UriService.action_ticketDetailMonitor,
	    		data: {
	    			"page":page,
	    			"st":st,
	    			"et":et,
	    		}
	    	}).then(function(res){
                if(200 != res.status) {
                    alertService.warning(res.err);
                    return;
                }
	    		$scope.data = res.data;
	    	});
    	};
    	//init
    	$scope.getData = function(page){
    		getData(page, $scope.st, $scope.et);
    	};
    	getData(null, null, null);
    	initDatapicker($scope, datepicker);
    }]);
    //待抢单数据监控(工单量)
    angular.module('iss.fragment')
    .controller('WaitingGrabTicketMonitorController',['$scope', '$rootScope', 'UriService', 'SearchBarDatePickerService', 'AlertService',
    function($scope, $rootScope, UriService, datepicker, alertService) {
    	var getData = function(page, st, et, type) {
	    	UriService.send({
	    		url:UriService.action_waitingGrabMonitor,
	    		data: {
	    			"page":page,
	    			"st":st,
	    			"et":et,
	    			"type":type
	    		}
	    	}).then(function(res){
                if(200 != res.status) {
                    alertService.warning(res.err);
                    return;
                }
	    		$scope.data = res.data;
	    	});
    	};
    	//init
    	$scope.getData = function(page){
    		getData(page, $scope.st, $scope.et, $scope.data.type);
    	};
    	$scope.data.type = 0;//初始化默认类型为0
    	$scope.userType = [
    		{"id":0, "name":"每小时待抢单数据监控"}, 
    		{"id":1, "name":"每日待抢单数据"}
    	];
    	getData(null, null, null, 0);
    	initDatapicker($scope, datepicker);
    }]);
    //待抢单数据监控(工作量)
    angular.module('iss.fragment')
    .controller('WaitingGrabWorkingMonitorController',['$scope', '$rootScope', 'UriService', 'SearchBarDatePickerService', 'AlertService',
    function($scope, $rootScope, UriService, datepicker, alertService) {
    	var getData = function(page, st, et, type) {
	    	UriService.send({
	    		url:UriService.action_waitingGrabMonitor,
	    		data: {
	    			"page":page,
	    			"st":st,
	    			"et":et,
	    			"type":type
	    		}
	    	}).then(function(res){
                if(200 != res.status) {
                    alertService.warning(res.err);
                    return;
                }
                var data = res.data;
                var nameList = data.data.data.name;
                for(var index in data.data.data.data) {
                    var obj = data.data.data.data[index];
                    obj.operatorId = nameList[obj.operatorId];
                }
	    		$scope.data = data;
	    	});
    	};
    	//init
    	$scope.getData = function(page){
    		getData(page, $scope.st, $scope.et, $scope.data.type);
    	};
    	$scope.data.type = 3;//初始化默认类型为2
    	$scope.userType = [
    		{"id":2, "name":"每小时员工工作量"}, 
    		{"id":3, "name":"每日员工工作量"}
    	];
    	getData(null, null, null, 2);
    	initDatapicker($scope, datepicker);
    }]);

    //去空格filter
    angular.module('iss.fragment')
    .filter('block', function(){
    	return function(date){
    		return date.split(' ')[0];
    	};
    });

    var initDatapicker = function($scope, datepicker) {
        $scope.st = '';
        $scope.et = '';
        $scope.dateOptions = datepicker.options;
        $scope.dateCallback = function(start, end, label){
            var patten = 'YYYY-MM-DD';
            $scope.st = start.format(patten);
            $scope.et = end.format(patten);
        }
    };
})(window.angular);