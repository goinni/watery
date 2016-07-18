angular.registerModule('iss.pageurl', ['app']).
service('UriService', function($state, $log, $http, $q, isDevelop, OnlineUriService, DevelopUriService) {
    var _this = this;
    /**
     * develop or online!
     */
    (function(){
        var uris = OnlineUriService || [];
        if(isDevelop){ 
            uris = DevelopUriService; 
        }
        angular.forEach(uris, function(data,index){
            _this[index] = data;
        });
        $log.warn('is develop',isDevelop);
    })();
    /**
     * ajax request
     * opt = {
     *      method: 'GET',      // 请求的方法缺省为POST，当为isDevelop 为true时 请求方法为GET
     *      url: 'jerry.com',   // 请求地址
     *      data: {},            // 请求时的参数
     *      restdata: {ordernumber:'DDH00011'}   //rest请求风格对应的URL参数 URL用{name}进行占位，占位名字与对象名字一一对应
     * }
     */
    this.send = function(opt){
        var deferred = $q.defer();
        var restdata = opt.restdata || {};
        var method = opt.method || 'POST';
        if(isDevelop || opt.url.match(/.json/)){method = "GET"};
        //rest style
        var tempUrl = opt.url;
        for(var key in restdata){
            // console.log(restdata[key],key)
            var x = '{'+key+'}';
            tempUrl = tempUrl.replace(x,restdata[key]);
        }   
        opt.url = tempUrl;
        //requeset server
        $http({
             method: method,
             url: opt.url || '',
             data: opt.data || {},
        }).success(function(data){
            if(data.status == 401){
                // console.log(data.status,opt);
                // 401 is no login .
                $log.warn(data.err); // tip
                $state.go('login'); // go!
            }
            deferred.resolve(data);
        }).error(function(){
          deferred.reject("Request service error !");
        });
        return deferred.promise;
    }
});