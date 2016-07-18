(function(angular) {
    'use strict';
    angular.registerModule('iss.alert', ['app']).
    service('AlertService',['$rootScope','$timeout',function($rootScope, $timeout){
        $rootScope.alerts = [];
        /**
         * 添加
         * @param msg 提示消息
         * @param type [success,info,warning,danger]
         * @param time 自动消失时间 单位：ms (值为false时不自动关闭)
         */ 
        this.add = function(msg, type, time){
            var _this = this, t = 3000;
            if(time===false){
                //不自动关闭的盒子
                t = null;
            }else{
                //缺省时自动关闭的盒子, 默认3秒关闭提示
                t = time || 3000; //缺省时
            }
            var entity = {
                    type: type || 'success', 
                    msg: msg,
                    close: function(){
                        _this.close(this);
                    }
                };
            $rootScope.alerts.push(entity);
            //自动关闭
            if(t){
                $timeout(function(){
                    _this.close(entity)
                }, t);
            }
            return entity; //将一提示对象返回，方便在外部零活控制
        };

        /**
         * 关闭
         */
        this.close = function(alert){
            $rootScope.alerts.splice($rootScope.alerts.indexOf(alert), 1);
        };
        /**
         * 清空所有提示
         */
        this.clear = function(){
            $rootScope.alerts=[];
        }
        //成功
        this.success = function(msg,time){
            return this.add(msg,'success', time);
        }
        //危险
        this.danger = function(msg,time){
            return this.add(msg,'danger', time);
        }
        //信息
        this.info = function(msg,time){
            return this.add(msg,'info', time);
        }
        //警告
        this.warning = function(msg,time){
            return this.add(msg,'warning', time);
        }

        /**
         * 全屏
         * @param element 
         */
        this.launchFullscreen = function (ele) {
            //按要求，暂时去掉
            // var element = ele || document.documentElement;//缺省时整个网页全屏
            // if(element.requestFullscreen) {
            //     element.requestFullscreen();
            // } else if(element.mozRequestFullScreen) {
            //     element.mozRequestFullScreen();
            // } else if(element.webkitRequestFullscreen) {
            //     element.webkitRequestFullscreen();
            // } else if(element.msRequestFullscreen) {
            //     element.msRequestFullscreen();
            // }
        }
    }]);

})(window.angular);

