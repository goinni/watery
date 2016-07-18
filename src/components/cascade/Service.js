(function(angular) {
    'use strict';
    angular.module('iss.cascade').
    service('CascadeService', ['UriService', function (uri) {
        /**
         * 初始化三级级联
         * @param $scope 
         * @param opt =  {
                            url:'请求级联的地址',
                            data:{
                                pid: 0 //必需字段，但也可以不指定，缺省值pid=0,如需其它请求参数也可以在这里写
                            },
                            default:[6,45,99], //数据回显时的默认值,该值与数据 id 对应,注意字段名称
                            resultKey: 'ticketQaGroups' //请求级联数据的返回结果字段名,[注]返回数据格式{data:{resultKey:[...]},status:200}
                        }
         *
         * PS: 使用时要注意，如果是异步加载完数据后再初始三级级联操作时要先在controller 中初始化 $scope.list={} 和 $scope.param = {};
         */
        this.bulidCascadeSteps = function($scope,opt){
                //三级级联数据
                $scope.list = {
                    qa1:[],
                    qa2:[],
                    qa3:[]
                }
                //级联对应的值
                $scope.param = {
                    qa1:'',
                    qa2:'',
                    qa3:''
                }

                //若未指定父ID，缺省值为0,即第一级数据 
                if(typeof opt.data.pid === undefined){
                    opt.data.pid = 0;
                }
                /**
                 * 在这里初始化第一级内容
                 */
                request(opt.url,opt.data,function(data){
                    $scope.list.qa1 = data[opt.resultKey];
                    //初始化回调
                    opt.init && opt.init($scope.list.qa1);
                    //设置第一级默认值
                    setDefaultValue(function(v){
                        $scope.param.qa1 = v;
                    });
                });
                /**
                 * 设置默认值，数据回显时用
                 * 设置一个删除一个，依次调用，默认值最多有三个
                 */
                function setDefaultValue(callback){
                    if(opt.default && opt.default.length){
                        callback && callback(opt.default[0]);
                        opt.default.splice(0,1);
                    }
                }
                /**
                 *三级级联事件一
                 *在这里发请求获取第二级内容
                 *@param newVal 第一级选择的值
                 */
                $scope.onchangeone = function(newVal){
                    //加载第二级数据
                    opt.data.pid = newVal;//重新指定父ID
                    request(opt.url,opt.data,function(data){
                        $scope.list.qa2 = data[opt.resultKey];
                        //一级改变时回调
                        opt.changeone && opt.changeone($scope.list.qa2);
                        //设置第二级默认值
                        setDefaultValue(function(v){
                            $scope.param.qa2 = v;
                        });
                    });
                }   
                /**
                 *三级级联事件二
                 *在这里发请求获取第三级内容
                 *@param newVal 第二级选择的值
                 */
                $scope.onchangetwo = function(newVal){
                    opt.data.pid = newVal;//重新指定父ID
                    request(opt.url,opt.data,function(data){
                        $scope.list.qa3 = data[opt.resultKey];
                        //二级改变时回调
                        opt.changetwo && opt.changetwo($scope.list.qa3);
                        //设置第三级默认值
                        setDefaultValue(function(v){
                            $scope.param.qa3 = v;
                        });
                    });
                }
        }
        /**
         * 请求数据
         */
        function request(url, param, callback){
            uri.send({
                url: url,
                data: param
            }).then(function(res){
                if(res.status == 200){
                    callback && callback.call(this,res.data);
                }else{
                    console.log(res.err);
                }
            });
        }
      
    }]);
})(window.angular);
