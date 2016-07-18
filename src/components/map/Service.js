(function(angular) {
    'use strict';
    angular.module('iss.map').
    service('MapService', ['UriService', function( uriService) {
        var _this = this;
        /**
         * 地图初始化
         */
        this.initMap = function(id){
            var mapid = id || 'map_container';
            _this.map = new BMap.Map(mapid);
            _this.map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
            _this.map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));   // 添加比例尺控件
            _this.map.addControl(new BMap.OverviewMapControl());                            //添加缩略地图控件
            _this.map.enableScrollWheelZoom();                              //启用滚轮放大缩小
            _this.map.addControl(new BMap.MapTypeControl());                //添加地图类型控件

            return _this.map;
        }
        /**
         * 根据IP获取当前位置信息
         */
         this.getLocalCity = function(callback){

            new BMap.LocalCity().get(function(result){
                callback && callback(result);
            });
         }
         /**
          * 延迟加载地图
          * 确保地图能正常加载
          */
         this.lazyLoading = function (callback){
            setTimeout(function(){
                callback && callback(_this.map);
            },200);  
        }
        
    }]);
})(window.angular);

