(function(angular) {
    'use strict';
    angular.module('iss.icenter').
    controller('ICenterController', ['$scope', '$rootScope', 'UriService', 'PagingService',
    function($scope, $rootScope, uri, PagingService) {
        //初始化个人中心工作空间
        $rootScope.addWorkspace({
            name:'个人中心',
            active:true,
            isRemove: false,
            content: uri.icenter
        });
        
    }]);
})(window.angular);

