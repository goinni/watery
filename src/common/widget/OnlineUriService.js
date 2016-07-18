angular.registerModule('iss.pageurl.online', ['app']).
service('OnlineUriService', function($http, $q,$window) {
    //构造url
    //@param n true 不加host
    function uri(url, n){
        var loc = $window.document.location;
            curl = loc.href,
            path = loc.pathname,
            pos = curl.indexOf(path),
            localhost = curl.substring(0, pos),
            time = new Date().getTime();
            //构造完整URI
            localhost = (!n ? localhost : '') + url;

        return (localhost + '?v=' + time);
    }
    //命名空间
    this.namespace = "iss.pageurl.online";
    /**
     *  首页
     */
    this.home = uri('/pages/home/home.html');
    /**
     *  个人中心
     */
    this.icenter = uri('/pages/icenter/icenter.html');
    /**
     *  订单详情页
     */
    this.order_detail = uri('/pages/order/detail.html');
    /**
     *  订单详列表页面
     */
    this.page_order_list = uri('/pages/order/list.html');
    /**
     * 订单指派
     */
    this.page_order_assigning = uri('/pages/order/tpls/assigning.html');
    /**
     * 订单收件
     */
    this.page_order_delivery = uri('/pages/order/tpls/delivery.html');
    /**
     * 订单流单
     */
    this.page_order_droporder = uri('/pages/order/tpls/drop_order.html');
    /**
     * 订单详情-创建工单
     */
    this.page_order_createworkorder = uri('/pages/order/tpls/create_workorder.html');
    /**
     * 订单详情-收取件预约
     */
    this.page_order_appointments = uri('/pages/order/tpls/appointments.html');
    /**
     * 订单详情-手机号变更
     */
    this.page_order_modifymobile = uri('/pages/order/tpls/modify_mobile.html');
    /**
     * 订单详情-客服取件
     */
    this.page_order_pickup = uri('/pages/order/tpls/pickup.html');
    /**
     * 订单详情-补贴
     */
    this.page_order_subsidy = uri('/pages/order/tpls/subsidy.html');
    /**
     * 订单详情-处罚
     */
    this.page_order_punishment = uri('/pages/order/tpls/punishment.html');
    /**
     * 合并订单
     */
    this.page_merge_order = uri('/pages/order/tpls/merge_order.html');
    /**
     * 订单详情-积分确认
     */
    this.page_order_sure_score = uri('/pages/order/tpls/order_sure_score.html');
    /**
     * 订单详情-积分调整
     */
    this.page_order_change_score = uri('/pages/order/tpls/order_change_score.html');
    /**
     * 重新推单
     */
    this.page_second_pushorder = uri('/pages/order/tpls/page_second_pushorder.html');
    /**
     *  闪送员档案
     */
    this.page_courier_info = uri('/pages/courier/courier.html');
    /**
     * 用户信息
     */
    this.page_userProfile = uri('/pages/fragment/userProfile.html');

// ------------------------------------------------------------------------
//                      ---| 下面是请求 |---
// ------------------------------------------------------------------------
    /**
     *  登录请求地址  done
     */
    this.action_login = uri('/admin/login');
    /**
     *  退出登录
     */
    this.action_login_out = uri('/admin/logout');
    /**
     *  订单详情-基础信息 done
     */
    this.action_orderdetial_custommer = uri('/admin/order/detail/{orderNumber}');
    /**
     *  订单详情-工单信息 done
     */
    this.action_orderdetial_workorder = uri('/admin/ticket/queryTicketByOrderNumber');
    /**
     * 订单详情-收取件预约
     */
    this.action_order_appointment = uri('/admin/op/appointment');
    /**
     * 订单详情-手机号变更
     */
    this.action_order_mobilechange = uri('/admin/op/change');
    /**
     * 订单详情-客服收件
     */
    this.action_order_delivery = uri('/admin/op/delivery');
    /**
     * 订单详情-客服取件
     */
    this.action_order_pickup = uri('/admin/op/pickup');
    /**
     * 订单详情-订单指派
     */
    this.action_order_assigning = uri('/admin/op/assign');
    /**
     * 订单详情-订单流单
     */
    this.action_order_droporderabort = uri('/admin/op/abort');
    /**
     * 订单详情-订单补贴
     */
    this.action_order_subsidymain = uri('/admin/op/subsidy');
    /**
     * 重新推单
     */
    this.action_second_pushorder = uri('/admin/op/repush');
    /**
     * 并单
     */
    this.action_merge_order = uri('/admin/op/merge');
    /**
     * 订单详情-积分调整
     */
    this.action_order_score = uri('/admin/op/score');
    /**
     * 闪送员订单信息
     */
    this.action_courier_orderInfo = uri('/admin/op/checkCourier');
    /**
     *  工单列表 done
     */
    this.action_workorder_list = uri('/admin/ticket/list');
    /**
     * 工单列表-领单
     */
    this.action_workorder_list_catchOrder = uri('/admin/ticket/collarTicket');
    
    /**
     *  获取订单分页列表 done
     */
    this.action_orderlist = uri('/admin/order/list');
    /**
     *  闪送员档案 - 基础信息 done
     */
    this.action_courier_info = uri('/admin/courier/info');
    /**
     *  闪送员档案 - 提现记录
     */
    this.action_courier_present_record = uri('/admin/courier/withdrawDetails');
    /**
     *  闪送员档案 - 收支明细
     */
    this.action_courier_lossdetail = uri('/admin/courier/accountDetails');
    /**
     *  搜索条上所有城市列表 done
     */
    this.action_citylist = uri('/admin/cityList');
    /**
     *  搜索条上所有用户类型
     */
    this.searchBarUsertypelist = uri('/tempdata/searchBarUsertypelist.json',true);
    /**
     *  搜索条上所有渠道 done
     */
    this.action_searchBarChannellist = uri('/admin/orderChannel');
    /**
     *  搜索条上所有交通工具 done
     */
    this.action_searchBarTrafficlist = uri('/admin/travelWay');
    /**
     *  搜索条上所有其它查询条件，如：系统单号等 done
     */
    this.searchBarOtherlist = uri('/admin/search');
    /**
     *  订单详情-补贴-补贴用户类型
     */
    this.action_subsidy_usertype = uri('/admin/subsidyType');
    /**
     *  订单详情-补贴-补贴类型
     */
    this.action_subsidy_type = uri('/admin/courierSubsidy');
    /**
     *  订单详情-补贴-补贴收款账户类型
     */
    this.action_subsidy_moneytype = uri('/admin/drawSubsidy');
    /**
     * 订单详情-补贴-扣款类型
     */
    this.action_subsidy_courierDebit = uri('/admin/courierDebit');
    /**
     * 订单详情-闪送员处罚
     */
    this.action_order_punishment = uri('/admin/rank/punish');
    /**
     * 订单详情-闪送员处罚-类型
     */
    this.action_order_punishment_type = uri('/admin/rank/queryPunishRuleByType');
    /**
     * 订单详情-投诉信息列表
     */
    this.action_order_complaints = uri('/admin/rank/list');

    /*****************************************************************/
    /**
     * 工单弹屏页
     */
    this.page_ticket_eject = uri('/pages/workorder/eject.html');
    /**
     * 我的工单
     */
    this.page_my_ticket = uri('/pages/workorder/myTicket.html');
    /**
     * 工单详情页
     */
    this.page_ticket_detail = uri('/pages/workorder/detail.html');
    /**
     * 工单列表
     */
    this.page_ticket_list = uri('/pages/workorder/list.html');
    /**
     * 订单地图页
     */
    this.page_order_map = uri('/pages/workorder/orderMap.html');
    /**
     * 轨迹地图页
     */
    this.page_trail_map = uri('/pages/workorder/trailMap.html');
    /**
     * 待抢单
     */
    this.page_waitingGrab = uri('/pages/order/waitingGrab.html');
    /**
     * 取消单
     */
    this.page_cancel = uri('/pages/order/cancel.html');
    /**
     * 新建工单模态
     */
    this.page_new_work_order = uri('/pages/workorder/tpls/newWorkOrder.html');
    /**
     * 系统设置
     */
    this.page_binding_user_list = uri('/pages/fragment/bindingUser.html');
    this.page_edit_binding_user = uri('/pages/fragment/tpls/editBindingUser.html');
    this.page_ticket_type_list = uri('/pages/fragment/ticketType.html');
    this.page_edit_ticket_type = uri('/pages/fragment/tpls/editTicketType.html');
    /**
     * 数据报表
     */
    // this.page_ticket_amount_monitor = uri('/pages/fragment/tpls/page_ticket_amount_monitor.html');
    this.page_timespan_monitor = uri('/pages/fragment/timespan_monitor.html');
    this.page_ticket_detail_monitor = uri('/pages/fragment/ticket_detail_monitor.html');
    this.page_waiting_grab_ticket_monitor = uri('/pages/fragment/waiting_grab_ticket_monitor.html');
    this.page_waiting_grab_working_monitor = uri('/pages/fragment/waiting_grab_working_monitor.html');
    this.page_ticket_statistic = uri('/pages/fragment/ticket_statistic.html');
    /**
     * 用户信息
     */
    this.page_userProfile = uri('/pages/fragment/userProfile.html');
    /**
     * 工单备注
     */
    this.page_orderRemark = uri('/pages/order/tpls/orderRemark.html');
    /*****************************************************************/
    /**
     * 登录获取合力账号
     */
    this.action_initPhonebar = uri('/admin/bindingUser/findByLoginName');
    /**
     * 工单弹屏
     */
    this.action_ticketEject = uri('/admin/ticket/index');
    this.action_saveTicketUser = uri('/admin/ticket/saveTicketUser');
    /**
     * 工单三级级联操作数据 
     */
    this.action_ticket_cascade = uri('/admin/ticket/queryTicketQaGroupsByPid');
    /**
     * 工单详情
     */
    this.action_workOrderDetail = uri('/admin/ticket/detail');
    /**
     * 工单维护
     */
    this.action_saveTicket = uri('/admin/ticket/saveTicket');
    this.action_updateTicket = uri('/admin/ticket/updateTicketStatusById');
    this.action_cascade = uri('/admin/ticket/queryTicketQaGroupsByPid');
    this.action_showTicketType = uri('/admin/question/query_question');
    this.action_saveTicketType = uri('/admin/question/merge_question');
    this.action_delTicketType = uri('/admin/question/delete_question');
    /**
     * 地图
     */
    this.action_mapInfo = uri('/admin/map/page');
    this.action_trailInfo = uri('/admin/map/trail');
    this.action_trail_points = uri('/tempdata/action_trail_points.json');
    this.action_markAsAvailable = uri('/admin/map/available');
    this.action_markAsUnavailable = uri('/admin/map/unavailable');
    this.action_orderAssign = uri('/admin/op/assign');
    this.action_finishPending = uri('/admin/order/finishPending');
    /**
     * 账号绑定信息
     */
    this.action_showBindingUser = uri('/admin/bindingUser/pageList');
    this.action_showBindingUserById = uri('/admin/bindingUser/findById');
    this.action_saveBindingUser = uri('/admin/bindingUser/save');
    this.action_delBindingUser = uri('/admin/bindingUser/delete/');
    /**
     * 我的工单
     */
    this.action_myTicket = uri('/admin/ticket/queryMyTicketByStatus');
    /**
     * 待抢单和取消单
     */
    this.action_pickupPending = uri('/admin/order/pickupPending');
    this.action_showPending = uri('/admin/order/showPending');
    this.action_finishPending = uri('/admin/order/finishPending');
    this.action_pickupComplain = uri('/admin/order/pickupComplain');
    this.action_showComplain = uri('/admin/order/showComplain');
    /**
     * 数据报表
     */
    //this.action_ticketAmountMonitor = uri('/pages/fragment/tpls/page_ticket_amount_monitor.html');
    this.action_timespanMonitor = uri('/admin/monitor/timespan-monitor');
    this.action_ticketDetailMonitor = uri('/admin/monitor/workOrder-detail');
    this.action_waitingGrabMonitor = uri('/admin/quality_control/show_data');
    /**
     * 用户信息
     */
    this.action_userProfile = uri('/admin/invoice/findByMobile');
    /**
     * 订单备注
     */
    this.action_orderRemark = uri('/admin/rank/remark');
    /*****************************************************************/

});