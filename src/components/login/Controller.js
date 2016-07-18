angular.module('iss.login').
controller('loginController', ['$scope', '$state','UriService','LoginService', 'AlertService',
function($scope, $state, uri, loginService, alertService) {
    //登录信息
    $scope.user = {
      username:'',
      password: ''
    }
    //设置登录页面的高度
    $scope.LoginBodyStyle = {
        height: screen.height
    };
    //登录事件
    $scope.play = function(){
      // 启动全屏!
      alertService.launchFullscreen();
      alertService.warning('登录中..', false);
      //登录请求
      uri.send({
        url: uri.action_login,
        data: $scope.user
      }).then(function(res){
            if(res.status == 200){
                alertService.clear();
                //处理登录相关操作,如：权限处理
                loginService.setUserSessionInfo(res.data);
                //登录成功后跳转到首页
                $state.go('index.orderlist');
            }else{
                alertService.danger(res.err);
            }
      });
    }
    //退出登录
    $scope.loginOut = function(){
        alertService.warning('正在退出登录...',false)
        uri.send({
            url: uri.action_login_out
        }).then(function(res){
                if(res.status == 200){
                    alertService.clear();
                    $state.go('login');
                }else{
                    alertService.danger(res.err);
                }
        });
    }

}]);