 /**
  * 区间日期选择 指令
  * @param dateOptions 指令所在scope 中的配制对象
  * @param dateCallback 
  *         选择日期回调接口
  *         参数： start 开始日期, end 结束日期, label 标签
  */
 (function(angular) {
    'use strict';
    angular.module('iss.datepicker').
    directive("datepickerInput", ['$http',
    function($http) {

        return {
            restrict : 'EA',
            replace: true,
            templateUrl : '/pages/datepicker/datepicker.html',
            link : function(scope, elem, attr) {
                var input = elem.find('input');
                var domi = elem.find('i');
                //添加事件
                domi.click(function() {
                  input.click();
                });
                //日期初始化
                input.daterangepicker(scope.dateOptions, function(start, end, label) { 
                    //日期回调接口
                    scope.dateCallback && scope.dateCallback.call(this, start, end, label);
                    // console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')'); 
                });

            }
        }
    }]);
})(window.angular);

