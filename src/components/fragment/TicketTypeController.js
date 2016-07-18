(function(angular){
    //TicketType
    angular.module('iss.fragment')
    .controller('TicketTypeController',['$scope', '$rootScope', 'UriService', '$uibModal', 'AlertService',
    function($scope, $rootScope, UriService, $uibModal, alertService) {
    	//type是树的层数 对应 1 2 3
    	//qaType是工单类型  对应 0 闪送员 1客户
    	//但是res.data.type是工单类型
    	var getData = function(type, pid) {
	    	UriService.send({
	    		url : UriService.action_showTicketType,
	    		data : {
	    			"qaType" : type,
	    			"pid" : pid
	    		}
	    	}).then(function(res) {
				if(200 != res.status) {
				    alertService.warning(res.err);
				    return;
				}
	    		//设置闪送员 | 客户
	    		$scope.type = res.data.type;
	    		if(-1 == res.data.type) {
	    			$scope.typeName = '';
	    		}

	    		if(-1 == res.data.type) {
	    			res.data.list = [
	    				{
	    					"name" : "闪送员",
	    					"id" : 0,
	    					"type" : 0
	    				},
	    				{
	    					"name" : "用户",
	    					"id" : 0,
	    					"type" : 1
	    				}
	    			]
	    		}
	    		$scope.list = res.data.list;
	    		$scope.path = res.data.root;
	    		$scope.insertPid = res.data.insertPid;
	    		$scope.insertQaType = res.data.insertQaType;
	    		$scope.insertType = res.data.insertType;
	    	});
    	};
		var backToRoot = function() {
			getData(-1, 0);
		}

		//init
		backToRoot();
		$scope.backToRoot = function() {
			backToRoot();
		};
		$scope.getData = function(type, pid) {
			if(-1 != $scope.type) {
				type = $scope.type;
			}else {
				$scope.type = type;
				$scope.typeName = (type==0?'闪送员':'用户');
			}
			getData(type, pid);
		};
        //Add TicketType
        $scope.add = function(){
            $uibModal.open({
                windowTopClass: 'imodel-top-css',
                templateUrl: UriService.page_edit_ticket_type,
                controller: 'EditTicketTypeController',
                resolve: {
                    modalData: function () {
                      return {
						"pid":$scope.insertPid,
						"qaType":$scope.insertQaType,
						"type":$scope.insertType,
						"path":$scope.path
                      };
                    }
                }
            }).result.then(function() {
                getData($scope.type, $scope.insertPid);
            }, function() {
                getData($scope.type, $scope.insertPid);
            });
        };

        //Delete TicketType
        $scope.del = function(id) {
            UriService.send({
            	url : UriService.action_delTicketType,
            	data : {
            		"id":id
            	}
            }).then(function(res){
	        	if(200 == res.status) {
	        		getData($scope.type, $scope.insertPid);
	        	}else {
	        		alert(res.err);
	        		getData($scope.type, $scope.insertPid);
	        	}
            });
        };
    }]);

    //editTicketType
    angular.module('iss.workorder')
    .controller('EditTicketTypeController', ['$scope', '$rootScope', 'UriService', 'modalData', '$modalInstance', 'AlertService',
    function($scope, $rootScope, UriService, modalData, $modalInstance, alertService){
    	if(0 == modalData.qaType) {
    		$scope.typeName = '闪送员';
    	}else {
    		$scope.typeName = '客户';
    	}
    	$scope.path = modalData.path;
        $scope.submit = function() {
	        UriService.send({
	        	url : UriService.action_saveTicketType,
	        	data : {
	        		"pid":modalData.pid,
	        		"qaType":modalData.qaType,
	        		"type":modalData.type,
	        		"name":$scope.name,
	        		"deleteState":0
	        	}
	        }).then(function(res){
	        	if(200 == res.status) {
	        		alertService.success('保存成功！');
	        		$modalInstance.dismiss('cancel');
	        	}else {
	        		alertService.warning(res.err);
	        	}
	        });
        };
        //取消
        $scope.cancel = function (){
            $modalInstance.dismiss('cancel');
        };
    }]);
})(window.angular);