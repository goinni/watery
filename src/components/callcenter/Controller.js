(function(angular) {
  // 'use strict';
  angular.module('iss.callcenter').
  controller("phonebar", ['$scope', '$rootScope', 'UriService','$window', 'AlertService','$timeout',
    function ($scope, $rootScope, UriService, window, alertService, $timeout) {
    /**
     * 通话计时器
     */
    (function(){
        $scope.callTime = "00:00";
        $scope.timeCount = 0; // 值为 -1 时，停止计时.
        $scope.$on('callCenterOnTimer', function(){
            $scope.timeCount = 0; //开始计时
            // 递归处理器
            (function(){
                ++$scope.timeCount;
                var ms = $scope.timeCount%60; 
                    ms = ms<10 ? '0'+ms : ms; //秒
                var min = parseInt($scope.timeCount/60);
                    min = min<10? '0'+min : min; //分
                $scope.callTime = min + ':' + ms;
                if($scope.timeCount){
                    $timeout(arguments.callee, 1000);
                }
            })();
        }); 
    })();
    /**
     * 初始化电话条
     */
    UriService.send({
        url : UriService.action_initPhonebar
    }).then(function(res){
        if(undefined != res.data) {
            hojo.registerModulePath("icallcenter", "/common/edb/js/icallcenter");
            hojo.require("icallcenter.logon");
            hojo.require("hojo.io.script");
            hojo.addOnLoad(function () {
                var loginName = res.data.ticketName;//icallcenter.logon.getUrlValue("loginName");
                var password = res.data.password;//icallcenter.logon.getUrlValue("password");
                var extenType = 'Local';//icallcenter.logon.getUrlValue("loginType");
                console.log("呼叫中心账号",loginName,password, extenType)
                icallcenter.logon.startLogon(loginName, password, extenType);
            });
        }
    });

    /**
     * 来电弹屏
     * @param tel 来电号码
     * @param id 特定工作空间编号 (来电弹屏时的ID必需要包含 'callcenter' )
     */
    window.eject = function(tel, id) {
        if(undefined == id) {
            id = moment().toString();
        }
        $rootScope.addWorkspace({
            id: id,
            name:'工单弹屏[' +tel+ ']',
            active:true,
            isRemove: true,
            content:UriService.page_ticket_eject,
            data:{
                "tel": tel
            }
        });
    };
    /**
     * 来电响玲事件
     * @param tel 来电号码
     */
    $scope.$on('callCenterOnRing', function(event, tel){
        eject(tel, 'callcenter' + moment());
    });
    /**
     * 电话呼出回调
     * @param index 是否成功呼出
     * @param phoneNumber 呼出的电话
     */
    window.dialoutCenterCallback = function(index, phoneNumber){
        var msg = "成功呼出:"+phoneNumber.substring(1);
        if(index){
            //通知开始计时
            $rootScope.$broadcast('callCenterOnTimer');
            alertService.warning(msg);
        }else{
            // $scope.timeCount = -1; //停止计时
            msg = "呼出失败:"+phoneNumber.substring(1)+" , 异常信息："+this.Message;
            alertService.danger(msg, 6000);
        }
    }
    /**
     * 通话结束回调
     * @param data 本次通话信息对象
     */
    window.callCenterOnHangup = function(data){
        callOver();
    }
    /**
     * 主动挂机接口 
     * @param succeed 是否挂机成功
     * PS: this 是挂机操作返回的对象
     */
    window.callCenterDoHangup = function(succeed){
        if(succeed){
            callOver();
        }else{
            console.log(this);
            alertService.warning('挂机失败~');
        }
    }
    //停止通话计时器
    function callOver(){
        $scope.timeCount = -1; //停止计时
        alertService.warning('通话结束~');
    }
    /**
     * 电话呼入事件
     * @param data 呼入信息对象
     */
    window.callCenterOnRing = function(data){
        alertService.warning('亲，电话呼入了哇~');
        //弹屏
        $rootScope.$broadcast('callCenterOnRing', data.originCallNo);
        //通知开始计时
        $rootScope.$broadcast('callCenterOnTimer');
    };

    /**
     * 打电话
     * @param tel 呼出电话号码
     */
    window.dialout = function(tel){
        if(null == softphoneBar) {
            alertService.danger('电话条登录失败');
        }else {
            if($scope.timeCount>0){
                alertService.warning('正在通话中，请稍后再试!',5000);
                return ;
            }
            alertService.success('正呼叫:'+tel);
            softphoneBar.dialout(tel);
        }
    };
    /**
     * 电话条加载完成 - 可以呼入呼出.
     */
    window.loadedPhoneIsOk = function (){
        var busyEntity = sessionStorage._isBusy || "";
        if(busyEntity){
            busyEntity = eval("("+busyEntity+")");
            console.log(busyEntity);
            if(busyEntity.state){
                var n = busyEntity.type;
            }
        }
    };
    /**
     * 电话条异常回调
     */
    window.callCenterHojotoolError = function(message){
        alertService.danger(message);
        //应要求，暂时不处理电话条异常
        // var msg ="座席使用相同的帐号（或相同的分机）登录\n【确定】将刷新页面重新开始 【取消】将退出登录。"
        // if(confirm(msg)){
        //     window.location.reload(true);
        // }else{
        //     $scope.$state.go('login');
        // }
    }
    //Call Back
    window.setBusyCallBack = function(isBusy, busyType){
        sessionStorage._isBusy = "{state: "+isBusy+",type: "+busyType+"}";
    };
    //Dialout Eject
    $scope.dialout = function(tel){
        if(!tel){
            alertService.danger('手机号码不能为空');
            return ;
        }
        dialout(tel);
    };
    //Just Eject
    $scope.eject = function(tel){
        eject(tel);
    };
    //Hangup
    $scope.exit = function(status){
        phone.hangup();
    };
    //Set Status
    $scope.setBusy = function(isBusy, busyType) {
        if(null == phone) {
            alertService.danger('电话条登录失败！');
        }else {
            phone.setBusy(isBusy, busyType);
            // $scope.timeCount = -1; //停止计时
        }
    };
    //Listening Enter
    $scope.inputEnter = function() {
        if(event.keyCode == 13) {
            dialout($scope.tel);
        }
    };
  }]);

})(window.angular);