(function(angular) {
    'use strict';
    angular.registerModule('iss.login', ['app']).
    config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                  url: '/login',
                  templateUrl: '/pages/login/login.html'
              })
    });
})(window.angular);

