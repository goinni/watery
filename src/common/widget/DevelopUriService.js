angular.registerModule('iss.pageurl.develop', ['app']).
service('DevelopUriService', function($http, $q) {
    var version = new Date().getTime();

    this.namespace = "iss.pageurl.develop";
    /**
     *  首页
     */
    this.home = '/pages/home/home.html';
    /**
     *  个人中心
     */
    this.icenter = '/pages/icenter/icenter.html';
    /**
     *  订单详情页
     */
    this.order_detail = '/pages/order/detail.html?v='+version;
    /**
     *  订单详列表页面
     */
    this.page_order_list = '/pages/order/list.html?v='+version;
    /**
     * 订单指派
     */
    this.page_order_assigning = '/pages/order/tpls/assigning.html?v='+version;
    /**
     * 订单收件 
     */
    this.page_order_delivery = '/pages/order/tpls/delivery.html?v='+version;
    /**
     * 订单流单
     */
    this.page_order_droporder = '/pages/order/tpls/drop_order.html?v='+version;
    /**
     * 订单详情-创建工单
     */
    this.page_order_createworkorder = '/pages/order/tpls/create_workorder.html?v='+version;
    /**
     * 订单详情-收取件预约
     */
    this.page_order_appointments = '/pages/order/tpls/appointments.html?v='+version;
    /**
     * 订单详情-手机号变更
     */
    this.page_order_modifymobile = '/pages/order/tpls/modify_mobile.html?v='+version;
    /**
     * 订单详情-客服取件
     */
    this.page_order_pickup = '/pages/order/tpls/pickup.html?v='+version;
    /**
     * 订单详情-补贴
     */
    this.page_order_subsidy = '/pages/order/tpls/subsidy.html?v='+version;
    /**
     * 订单详情-处罚
     */
    this.page_order_punishment = '/pages/order/tpls/punishment.html?v='+version;
    /**
     * 重新推单
     */
    this.page_second_pushorder = '/pages/order/tpls/page_second_pushorder.html?v='+version;
    /**
     * 合并订单
     */
    this.page_merge_order = '/pages/order/tpls/merge_order.html?v='+version;
    /**
     * 订单详情-积分确认
     */
    this.page_order_sure_score = '/pages/order/tpls/order_sure_score.html?v='+version;
    /**
     * 订单详情-积分调整
     */
    this.page_order_change_score = '/pages/order/tpls/order_change_score.html?v='+version;
    /**
     *  闪送员档案
     */
    this.page_courier_info = '/pages/courier/courier.html?v='+version;


// ------------------------------------------------------------------------
//                      ---| 下面是请求 |---
// ------------------------------------------------------------------------
    /**
     *  登录请求地址
     */
    this.action_login = '/tempdata/login.json?v='+version;
    /**
     *  退出登录
     */
    this.action_login_out = '/tempdata/login_out.json?v='+version;
    /**
     *  订单详情-基础信息
     */
    this.action_orderdetial_custommer = '/tempdata/order_detial_customer_info.json?v='+version;
    /**
     *  订单详情-工单信息
     */
    this.action_orderdetial_workorder = '/tempdata/order_detial_workorderlist.json?v='+version;
    /**
     * 订单详情-收取件预约
     */
    this.action_order_appointment = '/tempdata/action_order_appointment.json?v='+version;
    /**
     * 订单详情-手机号变更
     */
    this.action_order_mobilechange = '/tempdata/action_order_mobilechange.json?v='+version;
    /**
     * 订单详情-客服收件
     */
    this.action_order_delivery = '/tempdata/action_order_delivery.json?v='+version;
    /**
     * 订单详情-客服取件
     */
    this.action_order_pickup = '/tempdata/action_order_pickup.json?v='+version;
    /**
     * 订单详情-订单指派
     */
    this.action_order_assigning = '/tempdata/action_order_assigning.json?v='+version;
    /**
     * 订单详情-订单流单
     */
    this.action_order_droporderabort = '/tempdata/action_order_droporderabort.json?v='+version;
    /**
     * 订单详情-订单补贴
     */
    this.action_order_subsidymain = '/tempdata/action_order_subsidymain.json?v='+version;
    /**
     * 重新推单
     */
    this.action_second_pushorder = '/tempdata/action_second_pushorder.json?v='+version;
    /**
     * 并单
     */
    this.action_merge_order = '/tempdata/action_merge_order.json?v='+version;
    /**
     * 订单详情-积分调整
     */
    this.action_order_score = '/tempdata/action_order_score.json?v='+version;
    
    /**
     * 闪送员订单信息
     */
    this.action_courier_orderInfo = '/tempdata/action_courier_orderInfo.json?v='+version;
    /**
     * 订单详情-闪送员处罚
     */
    this.action_order_punishment = '/tempdata/action_courier_punishment.json?v='+version;
    /**
     * 订单详情-闪送员处罚-类型
     */
    this.action_order_punishment_type = '/tempdata/action_courier_punishment_type.json?v='+version;
    /**
     *  工单列表
     */
    this.action_workorder_list = '/tempdata/workorder_list.json?v='+version;
    /**
     * 工单列表-领单
     */
    this.action_workorder_list_catchOrder = '/tempdata/workorder_list_catchOrder.json?v='+version;
    /**
     *  闪送员档案 - 基础信息
     */
    this.action_courier_info = '/tempdata/courier_info.json?v='+version;
    /**
     *  闪送员档案 - 提现记录
     */
    this.action_courier_present_record = '/tempdata/action_courier_present_record.json?v='+version;
    /**
     *  闪送员档案 - 收支明细
     */
    this.action_courier_lossdetail = '/tempdata/action_courier_lossdetail.json?v='+version;
    /**
     *  获取订单分页列表
     */
    this.action_orderlist = '/tempdata/orderlist.json?v='+version;
    /**
     *  搜索条上所有城市列表
     */
    this.action_citylist = '/tempdata/citys.json?v='+version;
    /**
     *  搜索条上所有用户类型
     */
    this.searchBarUsertypelist = '/tempdata/searchBarUsertypelist.json?v='+version;
    /**
     *  搜索条上所有渠道
     */
    this.action_searchBarChannellist = '/tempdata/searchBarChannellist.json?v='+version;
    /**
     *  搜索条上所有交通工具
     */
    this.action_searchBarTrafficlist = '/tempdata/searchBarTrafficlist.json?v='+version;
    /**
     *  搜索条上所有其它查询条件，如：系统单号等
     */
    this.searchBarOtherlist = '/tempdata/searchBarOtherlist.json?v='+version;
    /**
     *  订单详情-补贴-补贴用户类型
     */
    this.action_subsidy_usertype = '/tempdata/subsidy_usertype.json?v='+version;
    /**
     *  订单详情-补贴-补贴类型
     */
    this.action_subsidy_type = '/tempdata/subsidy_type.json?v='+version;
    /**
     *  订单详情-补贴-补贴收款账户类型
     */
    this.action_subsidy_moneytype = '/tempdata/subsidy_moneytype.json?v='+version;
    /**
     * 订单详情-补贴-扣款类型
     */
    this.action_subsidy_courierDebit = '/tempdata/action_subsidy_courierDebit.json?v='+version;
    /**
     * 订单详情-投诉信息列表
     */
    this.action_order_complaints = '/tempdata/action_order_complaints.json?v='+version;

    /*****************************************************************/
    /**
     * 工单弹屏页
     */
    this.page_ticket_eject = '/pages/workorder/eject.html?v='+version;
    /**
     * 我的工单
     */
    this.page_my_ticket = '/pages/workorder/myTicket.html?v='+version;
    /**
     * 工单详情页
     */
    this.page_ticket_detail = '/pages/workorder/detail.html?v='+version;
    /**
     * 工单列表
     */
    this.page_ticket_list = '/pages/workorder/list.html?v='+version;
    /**
     * 订单地图页
     */
    this.page_order_map = '/pages/workorder/orderMap.html?v='+version;
    /**
     * 轨迹地图页
     */
    this.page_trail_map = '/pages/workorder/trailMap.html?v='+version;
    /**
     * 待抢单
     */
    this.page_waitingGrab = '/pages/order/waitingGrab.html?v='+version;
    /**
     * 取消单
     */
    this.page_cancel = '/pages/order/cancel.html?v='+version;
    /**
     * 新建工单模态
     */
    this.page_new_work_order = '/pages/workorder/tpls/newWorkOrder.html?v='+version;
    /**
     * 绑定用户编辑页
     */
    this.page_edit_binding_user = '/pages/fragment/tpls/editBindingUser.html?v='+version;
    /**
     * 数据报表
     */
    // this.page_ticket_amount_monitor = '/pages/fragment/tpls/page_ticket_amount_monitor.html?v='+version;
    this.page_timespan_monitor = '/pages/fragment/timespan_monitor.html?v='+version;
    this.page_ticket_detail_monitor = '/pages/fragment/ticket_detail_monitor.html?v='+version;
    this.page_waiting_grab_ticket_monitor = '/pages/fragment/waiting_grab_ticket_monitor.html?v='+version;
    this.page_waiting_grab_working_monitor = '/pages/fragment/waiting_grab_working_monitor.html?v='+version;
    this.page_ticket_statistic = '/pages/fragment/ticket_statistic.html?v='+version;
    /**
     * 用户信息
     */
    this.page_userProfile = '/pages/fragment/userProfile.html?v='+version;
    /**
     * 工单备注
     */
    this.page_orderRemark = '/pages/order/tpls/orderRemark.html?v='+version;
    /*****************************************************************/
    /**
     * 登录获取合力账号
     */
    this.action_initPhonebar = '/tempdata/initPhonebar.json?v='+version;
    /**
     * 工单弹屏
     */
    this.action_ticketEject = '/tempdata/ticketEject.json?v='+version;
    this.action_saveTicketUser = '/tempdata/saveTicketUser.json?v='+version;
    /**
     * 工单三级级联操作数据 
     */
    this.action_ticket_cascade = '/tempdata/action_ticket_cascade.json?v='+version;
    /**
     * 工单详情
     */
    this.action_workOrderDetail = '/tempdata/ticketDetail.json?v='+version;
    /**
     * 工单维护
     */
    this.action_saveTicket = '/tempdata/action_save_ticket.json?v='+version;
    this.action_updateTicket = '/tempdata/updateTicketStatusById.json?v='+version;
    this.action_cascade = '/tempdata/cascade.json?v='+version;
    this.action_showTicketType = '/tempdata/ticketTypeList.json?v='+version;
    this.action_saveTicketType = '/tempdata/updateTicketStatusById.json?v='+version;
    this.action_delTicketType = '/tempdata/updateTicketStatusById.json?v='+version;
    /**
     * 地图
     */
    this.action_mapInfo = '/tempdata/orderMap.json?v='+version;
    this.action_trailInfo = '/tempdata/action_trailInfo.json?v='+version;
    this.action_trail_points = '/tempdata/action_trail_points.json?v='+version;
    this.action_markAsAvailable = '/tempdata/markAsAvailable.json?v='+version;
    this.action_markAsUnavailable = '/tempdata/markAsUnavailable.json?v='+version;
    this.action_orderAssign = '/tempdata/markAsUnavailable.json?v='+version;
    this.action_finishPending = '/tempdata/finishPending.json?v='+version;
    /**
     * 账号绑定信息
     */
    this.action_showBindingUser = '/tempdata/bindingUserList.json?v='+version;
    this.action_showBindingUserById = '/tempdata/editBindingUser.json?v='+version;
    this.action_saveBindingUser = '/tempdata/markAsAvailable.json?v='+version;
    this.action_delBindingUser = '/tempdata/markAsAvailable.json?v='+version;
    /**
     * 我的工单
     */
    this.action_myTicket = '/tempdata/myTicket.json?v='+version;
    /**
     * 待抢单和取消单
     */
    this.action_pickupPending = '/tempdata/waitingGrabOrderGet.json?v='+version;
    this.action_showPending = '/tempdata/waitingGrabOrderList.json?v='+version;
    this.action_finishPending = '/tempdata/waitingGrabOrderFinish.json?v='+version;
    this.action_pickupComplain = '/tempdata/cancelOrderGet.json?v='+version;
    this.action_showComplain = '/tempdata/cancelOrderList.json?v='+version;
    /**
     * 数据报表
     */
    //this.action_ticketAmountMonitor = uri('/pages/fragment/tpls/page_ticket_amount_monitor.html');
    this.action_timespanMonitor = '/tempdata/timespanMonitor.json?v='+version;
    this.action_ticketDetailMonitor = '/tempdata/ticketDetailMonitor.json?v='+version;
    this.action_waitingGrabMonitor = '/tempdata/waitingGrabMonitor0.json?v='+version;
    this.action_ticketStatisticModel = '/tempdata/ticketStatisticModel.json?v='+version;
    this.action_ticketStatisticData = '/tempdata/ticketStatisticData.json?v='+version;
    /**
     * 用户信息
     */
    this.action_userProfile = '/tempdata/userProfile.json?v='+version;
    /**
     * 订单备注
     */
    this.action_orderRemark = '/tempdata/orderRemark.json?v='+version;
    /*****************************************************************/
});
