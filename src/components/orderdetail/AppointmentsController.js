(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalAppointmentsController', ['$scope', '$modalInstance','modalData','UriService','AlertService',
    function( $scope, $modalInstance, modalData, uri,alertService) {
        $scope.modalData  = modalData;
        $scope.remark = ''; //预约说明
        $scope.isDisabled = false; //请求按钮控制

        //预约日期
        $scope.date = {
            opened: false,
            options: {
                formatYear: 'yy',
                startingDay: 1
            },
            format: 'yyyy-MM-dd',
            value: moment().format("YYYY-MM-DD"),
            min: moment(),
            max: moment().add(1, 'days')
        }
        //预约时间
        $scope.time = {
            value: moment(),
            hstep: 1,
            mstep: 5,
            ismeridian: true
        }
        //时间设置
        $scope.changedtime = function(){};
        //日历开关
        $scope.opendate = function($event) {
            $scope.date.opened = true;
        };

        //确定
        $scope.ok = function (){
            $scope.isDisabled = true;
            uri.send({
                url: uri.action_order_appointment,
                data: {
                    infoId: modalData.type.id,
                    appDate: moment($scope.date.value).format("YYYY-MM-DD"),
                    appTime: moment($scope.time.value).format('HH:mm'),
                    appointmentReason: $scope.remark,
                    orderNumber: modalData.orderNumber,
                    appointType: modalData.type.id ? 2 : 1 //1, "取件预约"; 2, "收件预约"
                }
            }).then(function(res){
                if(res.status == 200){
                    alertService.add('预约成功~!');
                    $modalInstance.close();
                }else{
                    $scope.isDisabled = false;
                    alertService.add(res.err,'danger');
                }
            });
        };
        //取消
        $scope.cancel = function (){
            $modalInstance.dismiss('cancel');
        };


    }]);

})(window.angular);

