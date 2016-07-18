 /**
  * 动态添加标签 内容生成指令
  * @attr tpl 模板地址
  * @scope.workspace.data 对应模板的数据
  */
 (function(angular) {
    'use strict';
    angular.module('iss.tabs').
    directive("dynamicTabcontent", ['$http',
        function($http) {

            return {
                restrict : 'EA',
                replace: true,
                template : '<ng:include src="tpl"></ng:include>',
                link : function(scope, elem, attr) {
                    scope.tpl = attr.tpl;
                    if(scope.workspace && scope.workspace.data){
                        scope.data = scope.workspace.data;
                    }
                }
            }
        }]);
})(window.angular);

