(function(angular) {
  'use strict';
  angular.registerModule('iss.order', ['app']).
  config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('index.orderlist', {
              url: '/orderlist?type&id',
              templateUrl: '/pages/order/list.html'
          })
  });


})(window.angular);

