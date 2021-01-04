import request from '@/utils/request'
import * as common from '@/api/common.js'

const URL = {
  frontcomputer: '/services/fwcore/task'
}

// 1、计划任务列表
export function getPage(params) {
  return request({
    url: URL.frontcomputer,
    method: 'get',
    params
  })
}

// 2、新增/保存计划任务
export function submitForm(params) {
  return request({
    url: params.id ? URL.frontcomputer + '/' + params.id + '' : URL.frontcomputer,
    method: params.id ? 'put' : 'post',
    data: params
  })
}

// 3、批量删除
export function batchDelete(params) {
  var ids = common.splitArr(params.items, ',')
  return request({
    url: URL.frontcomputer + '?items=' + ids,
    method: 'DELETE'
    // params
  })
}

// 5、查询字典
export function getPlanOptions(code) {
  return request({
    url: '/services/fwcore/props/getPropListByPropCode?code=' + code,
    method: 'get'
  })
}
