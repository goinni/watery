angular.registerModule('iss.paging', ['app']).
service('PagingService', function($http, $q) {

    // total-items="100" max-size="6" ng-model="currentPage" ng-change="pageChanged()"
    this.pagingEntity = {
        row: 10,//每页显示10条记录
        totalItems: 100,  //总记录数
        maxSize: 5,     //分页条上最多显示5个页码
        currentPage: 1  //当前页码
    }
    /**
     * 重置分页信息
     */
    this.resetPaging = function(scope){
        scope.data.paging = {
            row: 10,    //每页显示10条记录
            totalItems: 0,  //总记录数
            maxSize: 5,     //分页条上最多显示5个页码
            currentPage: 1,  //当前页码
            changed: function(){} //分页事件
        }
    }
    /** 
     * 设置分页信息
     */
    this.setPaging = function(scope, opt){
            var paging = scope.data.paging;
            paging.row = opt.row || paging.row;
            paging.totalItems = opt.totalItems || paging.totalItems;
            paging.maxSize = opt.maxSize || paging.maxSize;
            paging.currentPage = opt.currentPage || paging.currentPage;
            paging.changed = opt.changed || paging.changed;
    }

});