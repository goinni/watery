(function(angular) {
    'use strict';
    angular.module('iss.courier').
    controller('ProfitLossDetailsController', ['$scope', '$rootScope', 'UriService', 'PagingService',
    function($scope, $rootScope, uri, PagingService) {
        $scope.profitLossDetails = [];
        var courierEntity = $scope.data.courierEntity || {};//闪送员对象
        /**
         * 获取闪送员收支明细
         */
        uri.send({
            url: uri.action_courier_lossdetail,
            data:{
                carrierId: courierEntity.courierId || ''
            }
        }).then(function(res){
            if(res.status == 200){
                $scope.profitLossDetails = res.data.result;
            }else{
                console.log(res);
            }
        });  
        

    }]);
})(window.angular);

