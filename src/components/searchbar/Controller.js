(function(angular) {
  'use strict';
  angular.module('iss.searchbar').
  controller('SearchBarController', ['$rootScope','$scope','SearchBarDatePickerService','UriService','PagingService',
  function($rootScope,$scope,datepicker,UriService,PagingService) {
        //搜索缺省参数
        resetParam();
        function resetParam(){
            $scope.param = {
                from: 1,
                type:'0', // 查所有订单
                cityId : '',
                userType : '',
                channel : '',
                travelWay : '',
                key : '',
                searchValue: '',
                st : '',
                et : '',
                pageNo: 1
            };
        }
        //构造列表数据
        $scope.list = {
            citys : [],
            usertypes: [],
            channels: [],
            traffics: [],
            others: []
        };
        //日期配制
        $scope.dateOptions = datepicker.options;
        //日期选择回调
        $scope.dateCallback = function(start, end, label){
            var patten = 'YYYY-MM-DD';
            $scope.param.st = start.format(patten);
            $scope.param.et = end.format(patten);
        }
        //重置搜索条件
        $scope.reset = function(){
            resetParam();
        }

        //搜索事件
        $scope.search = function(){
            //获取所有交通工具
            //添加工作空间
            $rootScope.addWorkspace({
                name:'搜索结果',
                active:true,
                isRemove: true,
                content: UriService.page_order_list,
                data:{
                    param: $scope.param
                }
            });

        }
        //获取所有城市
        UriService.send({
            url: UriService.action_citylist
        }).then(function(res) {
            if(res.status===200){
                $scope.list.citys = res.data;
                // $scope.param.mcity = $scope.list.citys[0].id;//默认值[注]要和前台显示格式对应上
            }
        });
        //获取所有用户类型
        UriService.send({
            url: UriService.searchBarUsertypelist
        }).then(function(res) {
            if(res.status===200){
                $scope.list.usertypes = res.data;
            }
        });

        //获取所有渠道
        UriService.send({
            url: UriService.action_searchBarChannellist
        }).then(function(res) {
            if(res.status===200){
                $scope.list.channels = res.data;
            }
        });
        //获取所有交通工具
        UriService.send({
            url: UriService.action_searchBarTrafficlist
        }).then(function(res) {
            if(res.status===200){
                $scope.list.traffics = res.data;
            }
        });
        //获取搜索条上其它查询条件, 如：系统单号
        UriService.send({
            url: UriService.searchBarOtherlist
        }).then(function(res) {
            if(res.status===200){
                $scope.list.others = res.data;
                 $scope.param.key = $scope.list.others[0].id;//默认值[注]要和前台显示格式对应上
            }
        });
    }]);
})(window.angular);