(function(angular) {
  	'use strict';
    //Map
    angular.module('iss.workorder')
    .controller('baiduMap',['$scope', '$rootScope', 'UriService', 'AlertService',
    function($scope, $rootScope, UriService, alertService) {
    	var orderNumber = $scope.data.orderNumber;
        var time = $scope.data.time;
        UriService.send({
            url:UriService.action_mapInfo,
            data:{
                "orderNumber":orderNumber
            }
        }).then(function(res) {
            if(0 == res.status) {
                alertService.warning(res.err);
            }

            if(undefined == res.data || undefined == res.data.order) {
                alertService.warning('地图初始化失败！');
                return;
            }else if(null != res.data.order.courierMobile) {
                alertService.warning('该订单已有闪送员接单！');
            }
            var order = res.data.order;
            var carrier = res.data.carrierMapDto;
            var user = res.data.bindingUserVo;
            var operatorId = res.data.operatorId;
            var travelArray = ['未指定工具','电动车','摩托','公交','汽车'];
            // Init Map
            var map = new BMap.Map("map" + $scope.data.time);
            map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
            map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));                    // 添加比例尺控件
            //map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
            map.enableScrollWheelZoom();                            //启用滚轮放大缩小
            map.addControl(new BMap.MapTypeControl());          //添加地图类型控件
            map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的


            //标注客户位置并设置地图中心点
            var lat = order.fromLat;
            var lng = order.fromLng;
            var fromAddress = order.fromAddr;
            var ccontent = '<h4>客户信息</h4>' + '<div style="margin-top:5px;"><strong style="color:red">客户地址:'+fromAddress
                +'</strong></div>';
            var infoWindow1 = new BMap.InfoWindow(ccontent);
            var point = new BMap.Point(lng,lat);
            map.centerAndZoom(point, 14);//查看五公里范围内的闪送员，比例尺固定14
            var myIcon = new BMap.Icon("/common/images/customer_48.png", new BMap.Size(48, 48), {
                // 指定定位位置。
                // 当标注显示在地图上时，其所指向的地理位置距离图标左上
                // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
                // 图标中央下端的尖角位置。
                offset: new BMap.Size(10, 25),
                // 设置图片偏移。
                // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
                // 需要指定大图的偏移位置，此做法与css sprites技术类似。
                imageOffset: new BMap.Size(0, 0)   // 设置图片偏移
            });
            var marker1 = new BMap.Marker(point,{icon: myIcon});
            map.addOverlay(marker1);
            //创建信息窗口
            marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});
            var circle = new BMap.Circle(point,5000,{fillColor:"black", strokeWeight: 1 ,fillOpacity: 0.1, strokeOpacity: 0.1});
            map.addOverlay(circle);

            //绑定闪送员处理事件


            //设置闪送员数量和位置
            $scope.online3H = carrier.online3H;
            $scope.online20Min = carrier.online20Min;
            $scope.unavailable = carrier.unavailable;
            $scope.working = carrier.working;
            $scope.forbidden = carrier.forbidden;
            for(var index in carrier.carrierList) {
                var c = carrier.carrierList[index];
                var cpoint = new BMap.Point(c.latitude, c.longitude);
                var search = false;
                addMarker(cpoint, map, c, orderNumber, search, travelArray, operatorId, order);
            }
        });

        /*标注闪送员方法start*/
        function addMarker(point, map, carrier, orderNumber, search, travelArray, operatorId, order) {
            var blocked = false;
            var atWork = carrier.atWork;
            var unavailable = false;
            var volatile = false;
            var travelWay = carrier.travelWay;

            var imageURL = "/common/images/travelWay.png";

            // X交通工具偏移
            var offsetX = 0;
            if (travelWay > 0) {
                offsetX = Math.log(travelWay) / Math.log(2) + 1;
            }
            // Y颜色偏移
            var offsetY= 0;
            // 图标尺寸
            var iconSize=24;

            if(atWork){
                offsetY = 1;
            } else {
                if(carrier.status == '01'){
                    offsetY = 2;
                    blocked = true;
                }else if (carrier.status == '05') {
                    offsetY = 3;
                    //暂时不可用的闪送员（2小时内不可用）
                    unavailable = true;
                }else if (carrier.status == '06') {
                    offsetY = 4;
                    //游离状态的闪送员
                    volatile = true;
                }
            }

            var myIcon = new BMap.Icon(imageURL, new BMap.Size(24, 24), {
                // 指定定位位置。
                // 当标注显示在地图上时，其所指向的地理位置距离图标左上
                // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
                // 图标中央下端的尖角位置。
                offset: new BMap.Size(0, 0),
                // 设置图片偏移。
                imageOffset: new BMap.Size(-iconSize * offsetX, -iconSize * offsetY)   // 设置图片偏移
            });
            var marker = new BMap.Marker(point, {icon: myIcon});
            map.addOverlay(marker);
            if(search){
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            }
            var endHTML = "</div>";
            var carrierName = carrier.name;
            if(!blocked){
                if(atWork){
                    carrierName = '<span style="color:black;">'+carrierName+'[闪送中]</span>';
                } else if (unavailable) {
                    //暂时不可用的闪送员
                    carrierName = '<span style="color:black;">'+carrierName+'[暂不接单]</span>';
                    endHTML= '<br><button class="btn btn-success" onclick="markAsAvailable(' + carrier.loginName + ');">恢复接单</button></div>';
                } else{
                    endHTML = '<input type="text" id="' + carrier.loginName + '" size="30"/>&nbsp;&nbsp;'
                    + '<button class="btn btn-success" type="button" onclick="assign(\'' + operatorId + '\',' + carrier.loginName + ',\'' + orderNumber + '\');">指派给他</button>&nbsp;&nbsp;'
                    + '<button class="btn btn-success" type="button" onclick="markAsUnavailable(' + carrier.loginName + ',\'' + operatorId + '\',\'' + orderNumber + '\',' +'true);">暂不接单</button>&nbsp;&nbsp;'
                    + '<button class="btn btn-success" type="button" onclick="markAsUnavailable(' + carrier.loginName + ',\'' + operatorId + '\',\'' + orderNumber + '\',' +'false);">备注</button>&nbsp;&nbsp;'
                    + '<button class="btn btn-success" type="button" onclick="finish(\'' + orderNumber + '\');">结案</button>&nbsp;&nbsp;'
                    + '<button class="btn btn-success" type="button" onclick="dialoutInMap(\'' + operatorId + '\',\'' + carrier.loginName + '\');" id="dialout'+ operatorId + '">呼叫</button>&nbsp;&nbsp;'
                    + '<button class="btn btn-danger"  type="button" onclick="hangupInMap(\'' + operatorId + '\');">挂断</button>&nbsp;&nbsp;'
                    + '</div>';
                }
            }else {
                carrierName = '<span style="color:black;">'+carrierName+'[被冻结]</span>';
            }
            var content = '<h4>闪送员['+carrier.name+']信息</h4>' + '<div style="margin-top:5px;"><strong style="color:red">姓名:'
                +carrierName + '(' + travelArray[offsetX] +'),手机号码:'+carrier.loginName+',距离客户:'+carrier.distance+'km,位置上传时间:'+carrier.latestLocationRecordDate+'</strong>'+endHTML;

            var infoWindow1 = new BMap.InfoWindow(content);
            marker.addEventListener("click", function(){
                this.openInfoWindow(infoWindow1);
            });

            //划线
            var takedUserLoginName = order.courierMobile;
            if(carrier.loginName == takedUserLoginName) {
                var status = carrier.status;

                if(status == '30' || status == '32' || status == '40') { //取件前
                    var fromLat = order.fromLat;
                    var fromLng = order.fromLng;
                    var fromPoint = new BMap.Point(fromLng,fromLat);

                    var polyline = new BMap.Polyline([point, fromPoint],
                        {strokeColor:"red", strokeWeight:3, strokeOpacity:0.5}
                    );
                    map.addOverlay(polyline);
                }
            }
        }
        /*标注闪送员方法end*/

        /*提交表单方法start*/
        //恢复接单
        window.markAsAvailable = function(loginname) {
            UriService.send({
                url:UriService.action_markAsAvailable,
                restdata:{
                    "loginname": loginname
                }
            }).then(function(res){
                if(200 == res.status) {
                    alert('操作成功！');
                }else {
                    alert('操作失败！');
                }
            });
        };
        //暂不接单
        window.markAsUnavailable = function(loginname, operatorId, orderNumber, needToMark) {
            if(needToMark) {
                //创建工单并标注暂不接单
                UriService.send({
                    url:UriService.action_markAsUnavailable,
                    data:{
                        "loginname":loginname,
                        "memo":$("#"+loginname).val()
                    }
                }).then(function(res){
                    if(200 == res.status) {
                        if('' != $.trim($('#'+loginname).val())) {
                            $.post(UriService.action_saveTicket, {"operatorId": operatorId, "mobile":loginname, "orderNumber":orderNumber, "remark":$("#"+loginname).val(), autoType:2}, function(r){
                                successOrFail(r);
                            });
                        }else {
                            alert('请输入备注内容！');
                        }
                    }else {
                        alert('操作失败！');
                    }
                });
            }else {
                //只创建工单
                if('' != $.trim($('#'+loginname).val())) {
                    $.post(UriService.action_saveTicket, {"operatorId": operatorId, "mobile":loginname, "orderNumber":orderNumber, "remark":$("#"+loginname).val(), autoType:2}, function(r){
                        successOrFail(r);
                    });
                }else {
                    alert('请输入备注内容！');
                }
            }
        };
        //指派给他
        window.assign = function(operatorId, mobile, orderNumber) {
            $.post(UriService.action_orderAssign, {"remark":$("#"+mobile).val(), "takedMobile":mobile, "orderNumber":orderNumber}, function(r){
                var res = eval("(" + r + ")");
                if(200 == res.status) {
                    $.post(UriService.action_saveTicket, {"operatorId":operatorId, "mobile":mobile, "orderNumber":orderNumber, autoType:3}, function(r){
                        successOrFail(r);
                    });
                }else {
                    alert(res.err);
                }
            });
        };
        //结案
        window.finish = function(orderNumber) {
            $.post(UriService.action_finishPending, {"orderNumber":orderNumber}, function(r){
                successOrFail(r);
            });
        };
        //呼出
        window.dialoutInMap = function(operatorId, mobile) {
            $('#dialout'+operatorId).attr('disabled', true);
            if(softphoneBar) {
                //TODO
                softphoneBar.dialout(/*mobile*/18601911202);
            }else {
                alert('电话条未初始化，请登录重试！');
            }
        };
        //挂机
        window.hangupInMap = function(operatorId) {
            $('#dialout'+operatorId).attr('disabled', false);
            phone.hangup();
        };
        //呼叫成功创建工单
        window.callSuccessfully = function(item){
            if(true == item.Link) {
                $.post(UriService.action_saveTicket, {"operatorId":operatorId, "mobile":item.FromDid, "orderNumber":orderNumber}, function(r){
                    successOrFail(r);
                });
            }
        };
        window.successOrFail = function(r) {
            var res = eval("(" + r + ")");
            if(200 == res.status) {
                alert("操作成功！");
            }else {
                alert("操作失败！");
            }
        };
        /*提交表单方法end*/

    }]);

})(window.angular);