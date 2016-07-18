(function(angular) {
  'use strict';
  angular.registerModule('iss.workorder', ['app']).
  config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('index.workOrderlist', {
		  url: '/workOrderlist?type&id',
		  templateUrl: '/pages/workorder/list.html'
		})
  });

})(window.angular);