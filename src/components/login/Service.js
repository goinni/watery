(function(angular) {
    'use strict';
    angular.module('iss.login')
    .service('LoginService', ['$rootScope','$window','PermissionService', function ($rootScope, $window, permissionService) {

        /**
         * 设置用户登录信息
         */
        this.setUserSessionInfo = function(entity){
            //缓存权限
            var cacheUserInfo = {
                user: entity.adminUser.admin,
                codes: entity.codes
            };
            $window.sessionStorage._sessionUserEntity = JSON.stringify(cacheUserInfo);
            //将用户信息放到RootScope下
            $rootScope.SessionUserEntity = cacheUserInfo;
            //设置权限
            permissionService.setUserPermissions(entity.codes);
        };
        /**
         * 获取用户登录信息
         */
        this.getUserEntity = function(){
            var user = $window.sessionStorage._sessionUserEntity || null;
            if(user){
                user = JSON.parse(user);
            }
            return user;
        }
    }]);
})(window.angular);
