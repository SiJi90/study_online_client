
import ajax from './ajax'
import qs from 'qs'
const BASE_URL = '/api';

/*
关于用户表的 api
 */
// 获取所有用户信息
export const reqUserList = (pageNum, pageSize, value, activeName) => ajax(`${BASE_URL}/user/list`, {
  params: {
    pageNum,
    pageSize,
    value,
    activeName
  }
});

// 删除用户
export const delUser = (ids) => ajax(`${BASE_URL}/user/list`, {
  params: {
    ids
  }
}, 'DELETE');

// 获取所有用户角色
export const repRoleList = () => ajax(`${BASE_URL}/role/list`);

// 添加用户
export const addUser = (newUser) => ajax(`${BASE_URL}/user/list`, qs.stringify(newUser), 'POST');
