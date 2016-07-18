(function(angular) {
  	'use strict';
    //bindingUser
    angular.module('iss.fragment')
    .controller('BindingUserController',['$scope', '$rootScope', 'UriService', '$uibModal', 'AlertService',
    function($scope, $rootScope, UriService, $uibModal, alertService) {
        var showBindingUser = function(currentPage, searchStr) {
            UriService.send({
                url : UriService.action_showBindingUser,
                data : {
                    "pageNo" : currentPage,
                    "searchStr" : searchStr || ''
                }
            }).then(function(res) {
                if(200 != res.status) {
                    alertService.warning('获取数据失败！');
                    return;
                }
                $scope.data = res.data;
            });
        };
        var deleteBindingUser = function(id) {
            UriService.send({
                url : UriService.action_delBindingUser,
                data : {
                    "id":id
                }
            }).then(function(res){
                if(200 != res.status) {
                    alertService.warning(res.err);
                    return;
                }
                showBindingUser($scope.data.currentPage, $scope.searchStr);
            });
        };

        //refresh data
        showBindingUser(1, '');
        $scope.paging = function() {
            showBindingUser($scope.data.currentPage, $scope.searchStr);
        };
        $scope.search = function() {
            showBindingUser(1, $scope.searchStr);
        };

        //Reset SearchStr
        $scope.reset = function() {
            $scope.searchStr = '';
        };
        //Delete BindingUser
        $scope.del = function(id) {
            deleteBindingUser(id);
        }
        //Add/Edit BindingUser
        $scope.edit = function(id) {
            $uibModal.open({
                windowTopClass: 'imodel-top-css',
                templateUrl: UriService.page_edit_binding_user,
                controller: 'EditBindingUserController',
                resolve: {
                    modalData: function () {
                      return id;
                    }
                }
            });
        };

    }]);

    //editBindingUser
    angular.module('iss.fragment')
    .controller('EditBindingUserController', ['$scope', '$rootScope', 'UriService', 'modalData', '$modalInstance', 'AlertService',
    function($scope, $rootScope, UriService, modalData, $modalInstance, alertService){
        if(-1 != modalData) {
            $scope.id = modalData;
            UriService.send({
                url : UriService.action_showBindingUserById,
                data : {
                    "id" : modalData
                }
            }).then(function(res){
                if(200 != res.status) {
                    alertService.warning(res.err);
                    return;
                }
                $scope.bindingUser = res.data.bindingUser;
            });
        }
        //取消
        $scope.cancel = function (){
            $modalInstance.dismiss('cancel');
        };
        $scope.submit = function() {
            console.log($scope.bindingUser);
            UriService.send({
                url : UriService.action_saveBindingUser,
                data : $scope.bindingUser
            }).then(function(res){
                if(200 == res.states) {
                    alertService.success('保存成功！');
                }else {
                    alertService.warning(res.err);
                }
            });
        };
    }]);
})(window.angular);