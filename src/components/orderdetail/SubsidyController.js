(function(angular) {
    'use strict';
    angular.module('iss.order').
    controller('ModalSubsidyController', ['$scope', '$modalInstance','modalData','UriService','AlertService',
    function($scope, $modalInstance, modalData, uri, alertService) {
        //传入窗口的数据
        $scope.modalData  = modalData;
        //表单参数 
        $scope.param = {
            orderNumber: modalData.orderInfo.orderNumber,
            category: '',   //补贴的用户类型
            type:'',        //补贴类型
            amount: '',      //补贴金额
            name: '',   //补贴客户名
            renewalWay: '',  //补款方式，支付宝？银行?...
            customerAccount: '',   //客户收款账号
            remark:''           //补贴备注
        }
        //下拉列表 
        $scope.list = {
            usertype: [],
            takemoneytype: [],
            type: [],
            temptype: [],
            debit: []  
        }
        //补贴用户类型切换时触发
        $scope.userChange = function(){
            //根据用户类型加载对应的补贴类型,更新$scope.param.type值
            if($scope.param.category == 3){
               $scope.list.type = $scope.list.debit;
            }else{
               $scope.list.type = $scope.list.temptype; 
            }
        }
        //确定
        $scope.ok = function (){
            uri.send({
                url: uri.action_order_subsidymain,
                data: $scope.param
            }).then(function(res){
                if(res.status == 200){
                    alertService.success('操作成功~!');
                    $modalInstance.close();
                }else{
                    $scope.isDisabled = false;
                    alertService.danger(res.err);
                }
            });
        };
        //取消
        $scope.cancel = function (){
            $modalInstance.dismiss('cancel');
        };

        //获取补贴用户类型
        uri.send({
            url: uri.action_subsidy_usertype,
            data: {
                orderNumber: modalData.orderInfo.orderNumber,
            }
        }).then(function(res){
            if(res.status == 200){
                $scope.list.usertype = res.data;
            }else{ 
                console.log(res.err);
            }
        });
        //获取补贴类型
        uri.send({
            url: uri.action_subsidy_type
        }).then(function(res){
            if(res.status == 200){
                $scope.list.type = res.data;
                $scope.list.temptype = res.data;
            }else{ 
                console.log(res.err);
            }
        });
        //获取补贴账户类型
        uri.send({
            url: uri.action_subsidy_moneytype
        }).then(function(res){
            if(res.status == 200){
                $scope.list.takemoneytype = res.data;
            }else{ 
                console.log(res.err);
            }
        });
        //获取扣款类型
        uri.send({
            url: uri.action_subsidy_courierDebit
        }).then(function(res){
            if(res.status == 200){
                $scope.list.debit = res.data;
            }else{ 
                console.log(res.err);
            }
        });

    }]);

})(window.angular);

