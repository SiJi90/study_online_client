/*
通过 mutation 间接更新 state 的多个方法对象
 */
import {
  RECEIVE_USER_PAGE_INFO,
  RECEIVE_ROLE_LIST
} from "./mutation-types";
import {
  reqUserList,
  delUser,
  repRoleList,
  addUser
} from "../api";

export default {
  // 异步获取用户列表
  async getUserPageInfo({commit, state}, {pageNum, pageSize, activeName}) {
    // 发送异步 ajax 请求
    const result = await reqUserList(pageNum, pageSize, state.value, activeName);
    // 提交一个 mutation
    if (result.code === 200) {
      const userPageInfo = result.extend.pageInfo;
      commit(RECEIVE_USER_PAGE_INFO, {userPageInfo})
    }
  },

  // 删除用户
  async delUser({commit}, ids) {
    // 发送异步 ajax 请求
    await delUser(ids);
  },

  // 获取所有角色
  async getRoleList({commit, state}) {
    const result = await repRoleList();
    if (result.code === 200) {
      const roleList = result.extend.roleList;
      commit(RECEIVE_ROLE_LIST, {roleList})
    }
  },

  // 添加新用户
  async addOneUser({commit}, newUser) {
    await addUser(newUser)
  }

}
