(function(angular) {
    'use strict';
    angular.module('iss.tabs').
    controller("TabsParentController", ['$state','$scope', '$rootScope', 'UriService','TabService',
    function ($state, $scope, $rootScope, uri, tabService) {
        //重置所有标签状态
        function setAllInactive() {
                cForEach(function(){
                    this.active = false;
                });
        };
        //根据ID删除一个TAB
        function removeTabById(id) {
            cForEach(function(index, array){
                if(this.id == id){
                    array.splice(index,1);
                    //设置最后一个为当前操作空间
                    var tab = array[array.length-1];
                    tab.active = true;
                }
            });
        };
        
        //根据ID打开指定操作空间
        function wakeupTabById(id){
            cForEach(function(index, array){
                if(this.id == id){
                    this.active = true;
                }
            });
        }
        //通用接口
        function cForEach(callback){
            angular.forEach($scope.workspaces, function(workspace,index,array) {
                callback.call(workspace, index, array);
            });
        }
        // Tab工作空间对象数组
        $scope.workspaces = [];
        /**
         * 添加一个操作空间
         * @param entity 工作空间对象
         * {id:1,name:'space1',active:true,content:'url',data:{空间模板对应的数据}}
         */
        $rootScope.addWorkspace = function (entity) {
            setAllInactive();
            if(entity.id && entity.id.match(/callcenter/)){
                //call center to do .
                $scope.$apply(function(){
                    $scope.workspaces.push(entity);
                });
            }else{
                // this is normal .
                if(!entity.id){
                    //default Id is current time
                    entity.id = moment().format('x');
                }
                $scope.workspaces.push(entity);
            }
        };
        /**
         * 删除一个操作空间
         */
        $rootScope.rmoveWorkspaceById = function (id) {
            setAllInactive();
            removeTabById(id);
        };
        /**
         * 根据ID 激活某个操作空间
         */
        $rootScope.wakeUpWorkspaceById = function (id) {
            setAllInactive();
            wakeupTabById(id);
        };
        //选择操作空间标签事件
        $scope.selectWorkspace = function(entity){
            //TODO .
        }
    }]);

})(window.angular);
