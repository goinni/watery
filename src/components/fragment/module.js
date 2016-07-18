(function(angular) {
  'use strict';
  angular.registerModule('iss.fragment', ['app']).
  config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index.bindingUser', {
        url: '/bindingUser',
        views: {
            'main@index': {
                templateUrl: '/pages/fragment/bindingUser.html',
                controller: 'bindingUser'
            }
        }
    })
  });
})(window.angular);