(function(angular) {
    'use strict';
    angular.module('iss.searchbar').
    service('SearchBarDatePickerService', function($http, $q) {
    //日期配制
        this.options = {
            ranges: {
              '今天': [moment(), moment()],
              '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              '前7天': [moment().subtract(6, 'days'), moment()],
              '前30天': [moment().subtract(29, 'days'), moment()],
              '本月': [moment().startOf('month'), moment().endOf('month')],
              '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
              '全部': [moment('2000-01-01'), moment()]
            },
            locale: {
              format: 'YYYY-MM-DD HH:mm',
              separator: ' 至 ',
              applyLabel: '确定',
              cancelLabel: '取消',
              fromLabel: 'From',
              toLabel: 'To',
              customRangeLabel: '自定义',
              daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
              monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
              firstDay: 1
            }, 
            showDropdowns: true
        };
    });

})(window.angular);