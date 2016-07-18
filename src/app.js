//Module 仓库
angular.moduleStroe = [];
/**
 * 注册Module，待页面加载完成后统一处理
 * @param name  模块名
 * @param requires  引用的模块
 * @param configFn
 */
angular.registerModule = function (name, requires, configFn) {
    angular.moduleStroe.push(name);
    return angular.module(name, requires, configFn);
}
//创建基础 Module
angular.issApp = angular.registerModule('app', ['ui.router','ui.bootstrap'], function($httpProvider){
	/**
	* The workhorse; converts an object to x-www-form-urlencoded serialization.
	* @param {Object} obj
	* @return {String}
	*/
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';  
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';  
    $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

	var param = function(obj) {
	var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
	   
	for(name in obj) {
	  value = obj[name];
	     
	  if(value instanceof Array) {
	    for(i=0; i<value.length; ++i) {
	      subValue = value[i];
	      fullSubName = name + '[' + i + ']';
	      innerObj = {};
	      innerObj[fullSubName] = subValue;
	      query += param(innerObj) + '&';
	    }
	  }
	  else if(value instanceof Object) {
	    for(subName in value) {
	      subValue = value[subName];
	      fullSubName = name + '[' + subName + ']';
	      innerObj = {};
	      innerObj[fullSubName] = subValue;
	      query += param(innerObj) + '&';
	    }
	  }
	  else if(value !== undefined && value !== null)
	    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	}
	   
	return query.length ? query.substr(0, query.length - 1) : query;
	};

	// Override $http service's default transformRequest
	$httpProvider.defaults.transformRequest = [function(data) {
	return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];
});
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
angular.issApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});
/**
 * 开发环境与线上环境开关
 * [ 注 ] 上线 或 与后台联调时一定要把 isDevelop 设置为 false !
 */
angular.issApp.constant('isDevelop', true);

/**
 * 模块的手动加载
 */
 angular.element(document).ready(function () {
    angular.bootstrap(document, angular.moduleStroe);
});   

