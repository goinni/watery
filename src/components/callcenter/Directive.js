(function(angular) {
  'use strict';
  angular.module('iss.callcenter').
  directive("call", [function() {
        return {
            restrict : 'AE',
            replace: true,
            scope : {
                ev : '=click',
                tel : '=number'
            },
            template : '<span><font ng-click="ev(tel)">{{tel}}</font><span ng-click="dialout(tel)" class="glyphicon glyphicon-earphone text-primary"></span>',
            link: function(scope, elem, attrs) {
                scope.dialout = function(tel){
                    dialout(tel);
                }
            }
        }
    }]);
})(window.angular);