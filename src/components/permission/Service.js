(function(angular) {
    'use strict';
    angular.module('iss.permission')
    .service('PermissionService', ['$rootScope', function ($rootScope) {
        var userPermission = "";
        /**
         * 获取权限
         */
        this.getUserPermissions = function(){
            return userPermission;
        };
        /**
         * 设置权限 
         */
        this.setUserPermissions = function(per){
            userPermission = per;
            //广播事件,通知监听者更新权限
            $rootScope.$broadcast('permissionsChanged');
        };
        /**
         * 校验是否有权限
         */
        this.hasPermission = function(per){
            if(!angular.isString(per)){
                throw "hasPermission value must be a string.";
            }
            per = per.replace(/ /g,'');
            //[注] userPermission 字符串 集合
            if(per && userPermission.indexOf(per) != -1){
                return true;
            }
            return false;
        };

    }]);
})(window.angular);
