(function(angular) {
    'use strict';
    angular.registerModule('iss.permission', ['app'])
    .run(function($log, PermissionService, LoginService, $window, $rootScope) {
        //从session中获取用户信息
        var entity = LoginService.getUserEntity();
        //刷新页面时如果权限存在设置权限,重新登录时会再次更新权限
        if(entity){
            PermissionService.setUserPermissions(entity.codes);
            //将用户信息放到RootScope下
            $rootScope.SessionUserEntity = entity;
        }else{
            $log.warn('权限不存在-请重新登录');
            $window.location.href="/pages/home/home.html#/login";
        }

    });
})(window.angular);

