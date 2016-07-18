(function(){
    //Trail
    angular.module('iss.workorder')
    .controller('trail',['$scope', '$rootScope', 'UriService', 'AlertService','MapService',
    function($scope, $rootScope, UriService, alertService, mapService) {
        $scope.orderNumber = $scope.data.orderNumber;
/**
 * 懒加载处理，确保地图能正常显示
 */
mapService.lazyLoading(function(){
        //初始化地图
        mapService.initMap();

        //获取订单轨迹信息
        UriService.send({
            url : UriService.action_trailInfo,
            data : {
                "orderNumber":$scope.orderNumber
            }
        }).then(function(res){
            var order = res.data.order;
            if(!order) {
                alertService.warning('轨迹地图初始化错误!', false);
                return;
            }
            var map = mapService.map;
            /**
             * 创建初始POI点，即客户下单位置
             */
            var frompoint = new BMap.Point(order.fromLng, order.fromLat); //下单点
            var grabpoint = new BMap.Point(order.grabLng, order.grabLat); //抢单点
            var readypoint = new BMap.Point(order.readyLng, order.readyLat); //就位点
            var fetchpoint = new BMap.Point(order.fetchLng, order.fetchLat); //取件点

            map.centerAndZoom(frompoint, 13);

            //----------------------------
            // 取件图标
            //----------------------------            
            var quIcon = new BMap.Icon("/common/images/poi.png", new BMap.Size(25,40),{  
                // 指定定位位置。 
                // 当标注显示在地图上时，其所指向的地理位置距离图标左上  
                // 角各偏移10像素和25像素。您可以看到在本例中该位置即是 
                // 图标中央下端的尖角位置。  
                anchor: new BMap.Size(10, 25),
                // imageSize: new BMap.Size(100, 22),
                // 设置图片偏移。 
                // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您 
                // 需要指定大图的偏移位置，此做法与css sprites技术类似。  
                imageOffset: new BMap.Size(-50, 0)   // 设置图片偏移  
            });
            var quMarker = new BMap.Marker(fetchpoint,{icon: quIcon});  // 创建标注
            map.addOverlay(quMarker);               // 将标注添加到地图中

            //----------------------------
            // 收件图标
            //----------------------------            
            var shouIcon = new BMap.Icon("/common/images/poi.png", new BMap.Size(25,40),{  
                anchor: new BMap.Size(10, 25),   
                imageOffset: new BMap.Size(-100, 0)   // 设置图片偏移  
            });
            //地址可能为多个，当一取多投时
            for(var i = 0; i<order.toAddrList.length; i++){
                var tempp = order.toAddrList[i];
                var shouMarker = new BMap.Marker(new BMap.Point(tempp.toLng, tempp.toLat),{icon: shouIcon});
                map.addOverlay(shouMarker);               // 将标注添加到地图中
                shouMarker.setAnimation(BMAP_ANIMATION_BOUNCE); 
                setTimeout(function(){
                    shouMarker.setAnimation(null); 
                },1000);
            }
            
            //----------------------------
            // 抢单图标
            //----------------------------            
            var qiangIcon = new BMap.Icon("/common/images/poi.png", new BMap.Size(25,40),{  
                anchor: new BMap.Size(10, 25),   
                imageOffset: new BMap.Size(-125, 0)   // 设置图片偏移  
            });
            var qiangMarker = new BMap.Marker(grabpoint,{icon: qiangIcon});  // 创建标注
            map.addOverlay(shouMarker);               // 将标注添加到地图中

            //----------------------------
            // 下单图标
            //----------------------------            
            var xiaIcon = new BMap.Icon("/common/images/poi.png", new BMap.Size(25,40),{  
                anchor: new BMap.Size(10, 25),   
                imageOffset: new BMap.Size(-150, 0)   // 设置图片偏移  
            });
            var xiaMarker = new BMap.Marker(frompoint,{icon: xiaIcon});  // 创建标注
            map.addOverlay(xiaMarker);               // 将标注添加到地图中

            //----------------------------
            // 终点图标
            //----------------------------            
            // var zhongIcon = new BMap.Icon("/common/images/poi.png", new BMap.Size(25,40),{  
            //     anchor: new BMap.Size(10, 25),   
            //     imageOffset: new BMap.Size(-25, 0)   // 设置图片偏移  
            // });
            // var zhongMarker = new BMap.Marker(point,{icon: zhongIcon});  // 创建标注
            // map.addOverlay(zhongMarker);               // 将标注添加到地图中

            //----------------------------
            // 起点图标
            //----------------------------            
            var qidianIcon = new BMap.Icon("/common/images/poi.png", new BMap.Size(25,40),{  
                anchor: new BMap.Size(10, 25),   
                imageOffset: new BMap.Size(0, 0)   // 设置图片偏移  
            });
            var qidianMarker = new BMap.Marker(readypoint,{icon: qidianIcon});  // 创建标注
            map.addOverlay(qidianMarker);               // 将标注添加到地图中

            //----------------------------
            // 设置 跳动的动画
            //---------------------------- 
            quMarker.setAnimation(BMAP_ANIMATION_BOUNCE);
            qiangMarker.setAnimation(BMAP_ANIMATION_BOUNCE); 
            xiaMarker.setAnimation(BMAP_ANIMATION_BOUNCE); 
            // zhongMarker.setAnimation(BMAP_ANIMATION_BOUNCE); 
            qidianMarker.setAnimation(BMAP_ANIMATION_BOUNCE); 
            //1秒后清除动画
            setTimeout(function(){
                quMarker.setAnimation(null);
                qiangMarker.setAnimation(null); 
                xiaMarker.setAnimation(null); 
                // zhongMarker.setAnimation(null); 
                qidianMarker.setAnimation(null); 
            },1000);

        });

        //请求轨迹
        UriService.send({
            url : UriService.action_trail_points,
            data : {
                "orderNumber":$scope.orderNumber
            }
        }).then(function(entity){
            var map = mapService.map;
            var routePoints = [];
            for(var i = 0; i<entity.data.length; i++){
                var pp  = entity.data[i];
                routePoints.push(new BMap.Point(pp.longitude, pp.latitude));
            }
            //生成一条轨迹线
            map.addOverlay(new BMap.Polyline(routePoints, {strokeColor: '#F00'}));

        });

});
        
    }]);
})(window.angular);
