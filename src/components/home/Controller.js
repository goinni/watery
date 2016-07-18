(function(angular) {
    'use strict';
    angular.module('iss.home').
    controller('HomeController', ['$scope', '$rootScope', 'UriService', 'PagingService','isDevelop',
    function($scope, $rootScope, uri, PagingService, isDevelop) {
        // [注] 个人操作初始化权限，可以从$rootScope.SessionUserEntity 中获取对应的权限信息,进行有选择的初始化工作

        /**
         * 初始化个人中心工作空间
         */
        if(check('151200')){
            $rootScope.addWorkspace({
                name:'个人中心',
                active:true,
                isRemove: false,
                content: uri.icenter
            });
        }
        /**
         * 初始化一个工单中心工作空间
         */
        if(check('150309')){
            $rootScope.addWorkspace({
                name:'工单中心',
                active:true,
                isRemove: false,
                content: uri.page_ticket_list
            });
        }
        /**
         * 初始化一个订单中心工作空间
         */
        if(check('150400')){
            $rootScope.addWorkspace({
                name:'订单中心',
                active:true,
                isRemove: false,
                content: uri.page_order_list
            });
        }
        /**
         * 校验权限
         * @param code 权限编码 
         * [注] 开发环境无权限控制
         */
        function check(code){
            var premissionCodes = $rootScope.SessionUserEntity.codes || [];
            return isDevelop || premissionCodes.indexOf(code)!=-1;
        }
    }]);
})(window.angular);

