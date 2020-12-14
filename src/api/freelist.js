import request from '@/utils/request'
import qs from 'qs'

const URL = {
  freelists: '/services/fwcore/freelists',
  deleteItems: '/services/fwcore/freelists/batch'
}

// 1、freelist列表
export function getPage(params) {
  return request({
    url: URL.freelists,
    method: 'get',
    params
  })
}

// 2、新增或更新
export function submitForm(params) {
  return request({
    url: params.id ? URL.freelists + '/' + params.id + '' : URL.freelists,
    method: params.id ? 'put' : 'post',
    data: params
  })
}

//  删除
export function batchDelete(params) {
  const queryParams = qs.stringify(params, { indices: false })
  return request({
    url: URL.deleteItems + '?' + queryParams,
    method: 'DELETE'
    // params
  })
}
