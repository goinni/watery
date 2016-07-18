(function(angular) {
    'use strict';
    angular.module('iss.fragment').
    controller("UserProfileController", ['$scope', '$rootScope', 'UriService', 'AlertService',
    function ($scope, $rootScope, UriService, alertService) {
        var mobile = $scope.data.mobile;
        UriService.send({
            url : UriService.action_userProfile,
            data : {
                "mobile":mobile
            }
        }).then(function(res){
            if(200 != res.status) {
                alertService.warning(res.err);
                return;
            }
            $scope.data = res.data;
        });
    }]);
})(window.angular);