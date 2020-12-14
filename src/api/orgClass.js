import request from '@/utils/request'
import * as common from '@/api/common.js'

const URL = {
  orgClass: '/services/fwcore/orgClasses'
}

// 1、租户列表
export function getPage(params) {
  return request({
    url: URL.orgClass,
    method: 'get',
    params
  })
}

// 2、新增/保存租户
export function submitForm(params) {
  return request({
    url: params.id ? URL.orgClass + '/' + params.id + '' : URL.orgClass,
    method: params.id ? 'put' : 'post',
    data: params
  })
}

// 3、批量删除
export function batchDelete(params) {
  var ids = common.splitArr(params.items, ',')
  return request({
    url: URL.orgClass + '?items=' + ids,
    method: 'DELETE'
    // params
  })
}
