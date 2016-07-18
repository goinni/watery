(function(angular){
	'use strict';
    angular.module('iss.fragment')
    .controller('TicketStatisticController',['$scope', '$rootScope', 'UriService', '$uibModal', 'AlertService', 'SearchBarDatePickerService',
    function($scope, $rootScope, UriService, $uibModal, alertService, datepicker) {
	    var $newTR = '<tr><td>@id1</td><td>@id2</td><td class="qa_qroup_id3" id="@index">@id3</td></tr>';
	    var $total = '<tr><td colspan="3" id="total">总计</td></tr>'
	    var $newTD = '<td class="number @index">@number</td>';
	    var $newTime = '<td rowspan="2" class="time">@time</td>'
    	var getModel = function() {
	    	UriService.send({
	    		url:UriService.action_ticketStatisticModel
	    	}).then(function(res){
                if(200 != res.status) {
                    alertService.warning("加载模板错误！");
                    return;
                }
                drawTable(res.data.dictionary, res.data.isExist, res.data.model);
                mc('tb', 0, 0, 0);
	    	});
    	};
    	var drawTable = function(dictionary, exist, model) {
    		for(var index in model) {
    			var m = model[index];
    			$('#tbd').append($newTR.replace(/@id1/g, dictionary[m.id1])
    				.replace(/@id2/g, dictionary[m.id2]||'')
    				.replace(/@id3/g, dictionary[m.id3]||'')
    				.replace(/@index/g, (m.id1||'')+'_'+(m.id2||'')+'_'+(m.id3||'')));
    		}
    	};
    	var generateTime = function(timeList) {
            for(var i in timeList) {
	            $('#timeHead').after($newTime.replace(/@time/g, timeList[i]));
            }
    	}
    	var generateRanking = function(key, list) {
    		var counter = 1;
            for(var i in list) {
	            $('#'+key).after($newTD.replace(/@number/g, list[i])
	            	.replace(/@index/g, 'index'+counter++));
            }
    	};
    	var generateTotal = function() {
    		var counter = 1;
			$('#tbd').append($total);
			while($('.number'+counter).exist()) {
				var sum = 0.0
	            $('#total').after($newTD.replace(/@number/g, list[i]));
	            counter++
			}
    	};
    	var getData = function(type) {
	    	UriService.send({
	    		url:UriService.action_ticketStatisticData,
	    		data:{
	    			"type":type,
	    			"st":$scope.st,
	    			"et":$scope.et
	    		}
	    	}).then(function(res){
                if(200 != res.status) {
                    alertService.warning("获取数据错误！");
                    return;
                }
                $('.time').remove();
                $('.number').remove();
                generateTime(res.data.timeList);
                for(var key in res.data.data) {
                	generateRanking(key, res.data.data[key]);
                }
			});
    	};

    	$scope.getData = function() {
			getData($scope.selectedType);
    	};

    	getModel()
		$scope.selectedType = 0;
    	$scope.statisticType = [
    		{"id":0, "name":"工单排名"}, 
    		{"id":1, "name":"工单占比"},
    		{"id":2, "name":"订单占比"}
    	];
    	initDatapicker($scope, datepicker);
	}]);

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
	function mc(tableId, startRow, endRow, col) {
	    var tb = document.getElementById(tableId);
	    if (col >= tb.rows[0].cells.length) {
	        return;
	    }
	    if (col == 0) { endRow = tb.rows.length-1; }
	    for (var i = startRow; i < endRow; i++) {
	        if (tb.rows[startRow].cells[col].innerHTML == tb.rows[i + 1].cells[0].innerHTML) {
	            tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[0]);
	            tb.rows[startRow].cells[col].rowSpan = (tb.rows[startRow].cells[col].rowSpan | 0) + 1;
	            if (i == endRow - 1 && startRow != endRow) {
	                mc(tableId, startRow, endRow, col + 1);
	            }
	        } else {
	            mc(tableId, startRow, i + 0, col + 1);
	            startRow = i + 1;
	        }
	    }
	}
})(window.angular);