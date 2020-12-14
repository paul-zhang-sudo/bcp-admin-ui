import request from '@/utils/request'

const URL = {
  organization: '/services/fwcore/organizations'
}

// 1、获取所有组织列表
export function orgTree(params) {
  return request({
    url: URL.organization + '/tree',
    method: 'get'
    // params
  })
}

// 2、新增/更新组织
export function updateOrganization(params) {
  return request({
    url: params.id ? URL.organization + '/' + params.id + '' : URL.organization,
    method: params.id ? 'PUT' : 'POST',
    data: params
  })
}

// 3、删除组织
export function delOrganization(params) {
  return request({
    url: URL.organization + '/' + params,
    method: 'DELETE'
  })
}

