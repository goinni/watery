(function(angular) {
  'use strict';
  angular.registerModule('iss.home', ['app']).
  config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/index/orderlist'); //路径匹配不到时
      $stateProvider
          .state('index', {
              url: '/index',
              views: {
                  '': {
                      templateUrl: 'tpls/index.html'
                  },
                  'topbar@index': {
                      templateUrl: 'tpls/topbar.html'
                  },
                  'main@index': {
                      templateUrl: 'tpls/main.html'
                  }
              }
          })
          
  });


})(window.angular);

