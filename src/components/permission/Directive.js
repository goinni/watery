/**
 * 用户权限控制指令
 * 使用方法：在dom 元素添加属性  has-permission="1001" ,1001为权限编号
 */
(function(angular) {
    'use strict';
    angular.module('iss.permission')
    .directive('hasPermission',['PermissionService','isDevelop',
    function(permissionService, isDevelop) {

        return {
            link: function(scope, element, attrs) {
                /**
                 * 执行权限更新
                 */ 
                function updatePermission() {
                    //[注]开发环境不进行权限处理
                    if(!isDevelop && !permissionService.hasPermission(attrs.hasPermission)){
                      element.empty().remove();
                    }
                }
                //初始化权限
                updatePermission();
                //监听权限变更事件
                scope.$on('permissionsChanged', updatePermission);
            }
        };
    }]);
})(window.angular);
