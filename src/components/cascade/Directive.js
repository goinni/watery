 /**
  * 级联操作指令
  * <cascade-steps></cascade-steps>
  */
 (function(angular) {
    'use strict';
    angular.module('iss.cascade').
    directive("cascadeSteps", ['$http',
        function($http) {

            return {
                restrict : 'EA',
                replace: true,
                templateUrl : '/pages/cascade/cascade.html',
                link : function(scope, elem, attr) {
                    /**
                     * 监听一级分类变更
                     */
                    scope.$watch('param.qa1',function(newVal){
                        if (newVal){
                            scope['onchangeone'](newVal);
                         }else{
                            scope.list.qa2 = [];
                            scope.list.qa3  =[];
                         }
                    });
                    /**
                     * 监听二级分类变更
                     */
                    scope.$watch('param.qa2',function(newVal){
                        if (newVal){
                            scope['onchangetwo'](newVal);
                         }else{
                             scope.list.qa3  =[];
                         }
                    });
                }
            }
        }]);
})(window.angular);

