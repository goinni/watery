(function(angular) {
    'use strict';
    angular.module('iss.courier').
    controller('CourierController', ['$scope', '$rootScope', 'UriService', 'PagingService',
    function($scope, $rootScope, uri, PagingService) {
        $scope.courierData = {};
        /**
         * 获取闪送员基础信息
         */
        uri.send({
            url: uri.action_courier_info,
            data:{
                carrierId: $scope.data.courierEntity.courierId
            }
        }).then(function(res){
            if(res.status == 200){
                $scope.courierData = res.data;
            }else{
                console.log(res);
            }
        });
    }]);
})(window.angular);

