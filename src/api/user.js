import request from '@/utils/request'
import qs from 'qs'

const URL = {
  user: '/services/fwcore/users'
}

export function login(data) {
  return request({
    url: '/services/fwcore/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/services/fwcore/users/login-user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/services/fwcore/login',
    method: 'delete'
  })
}

// 用户列表
// export function getUserPage(params) {
//   return request({
//     url: URL.user + '/checkAll',
//     method: 'get',
//     params
//   })
// }

// 通过组织获取用户列表
export function getUserList(params) {
  return request({
    // url: URL.user + '/check/' + params.orgId,
    url: URL.user + '/pages/',
    method: 'GET',
    params
  })
}

// 新增用户
export function submitFormAdd(data) {
  return request({
    url: URL.user,
    method: 'POST',
    data
  })
}

// 编辑用户
export function submitFormEdit(data) {
  return request({
    url: URL.user + '/' + data.id,
    method: 'PUT',
    data: data
  })
}

// 组织下拉框数据
export function getOrgList() {
  return request({
    url: URL.user + '/checkOrg',
    method: 'GET'
  })
}

// 批量删除
export function batchDelete(params) {
  const queryParams = qs.stringify(params, { indices: false })
  return request({
    url: URL.user + '?' + queryParams,
    method: 'DELETE'
    // params
  })
}

// 批量锁定
export function batchLocked(params) {
  const queryParams = qs.stringify(params, { indices: false })
  return request({
    url: URL.user + '/status/lock' + '?' + queryParams,
    method: 'PUT'
    // params
  })
}

// 批量解锁
export function batchUnLocked(params) {
  const queryParams = qs.stringify(params, { indices: false })
  return request({
    url: URL.user + '/status/unlock' + '?' + queryParams,
    method: 'PUT'
    // params
  })
}

// 批量重置密码
export function batchResetPsd(params) {
  const queryParams = qs.stringify(params, { indices: false })
  return request({
    url: URL.user + '/default/pwd' + '?' + queryParams,
    method: 'PUT'
    // params
  })
}

// 同步用户
export function syncUser() {
  return request({
    url: URL.user + '/userTemp',
    method: 'POST'
    // params
  })
}

// 获取当前的登陆用户
export function getCurUser() {
  return request({
    url: URL.user + '/currentUser',
    method: 'GET'
    // params
  })
}

// 修改密码
export function modifyPassword(data) {
  return request({
    url: URL.user + '/modifyPwd',
    method: 'PUT',
    data
  })
}
