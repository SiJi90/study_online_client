/*
直接更新 state 的多个方法对象
 */

import {
  RECEIVE_USER_PAGE_INFO,
  CHANGE_VALUE,
  IS_SHOW,
  RECEIVE_ROLE_LIST
} from "./mutation-types";

export default {
  // 更新用户分页列表信息
  [RECEIVE_USER_PAGE_INFO](state, {userPageInfo}) {
    state.userPageInfo = userPageInfo
  },
  // 更新模糊查询值
  [CHANGE_VALUE](state, newVal) {
    state.value = newVal
  },
  // 是否显示 dialog
  [IS_SHOW](state, newVal) {
    state.isShow = newVal
  },
  // 更新角色列表
  [RECEIVE_ROLE_LIST](state, {roleList}) {
    state.roleList = roleList;
  }
}
