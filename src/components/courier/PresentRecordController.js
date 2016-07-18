(function(angular) {
    'use strict';
    angular.module('iss.courier').
    controller('PresentRecordController', ['$scope', '$rootScope', 'UriService', 'PagingService',
    function($scope, $rootScope, uri, PagingService) {
        $scope.presentRecords = [];
        var courierEntity = $scope.data.courierEntity || {};//闪送员对象
        /**
         * 获取闪送员提现记录
         */
        uri.send({
            url: uri.action_courier_present_record,
            data:{
                carrierId: courierEntity.courierId || ''
            }
        }).then(function(res){
            if(res.status == 200){
                $scope.presentRecords = res.data.result;
            }else{
                console.log(res);
            }
        });

    }]);
})(window.angular);

