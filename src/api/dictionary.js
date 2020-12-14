import request from '@/utils/request'
import qs from 'qs'

const URL = {
  dictionary: '/services/fwcore/props'
}

// 1、主表列表
export function getPage(params) {
  return request({
    url: URL.dictionary,
    method: 'get',
    params
  })
}

// 2、新增或编辑
export function submitForm(params) {
  return request({
    url: params.id ? URL.dictionary + '/' + params.id + '' : URL.dictionary,
    method: params.id ? 'PUT' : 'POST',
    data: params
  })
}

// 3、批量删除
export function batchDelete(params) {
  console.log(params)
  const queryParams = qs.stringify(params, { indices: false })
  console.log(queryParams)
  return request({
    url: URL.dictionary + '?' + queryParams,
    method: 'DELETE'
    // params
  })
}

// 4、根据propId获取propList数据
export function getPropListByPropId(params) {
  return request({
    url: URL.dictionary + '/getPropListByPropId/' + params,
    method: 'GET'
    // params
  })
}

// 5、新增行表数据
export function submitPropListForm(params) {
  return request({
    url: params.id ? URL.dictionary + '/propLists/' + params.id : URL.dictionary + '/propLists',
    method: params.id ? 'PUT' : 'POST',
    data: params
  })
}

// 6、批量删除
export function batchDeletePropList(params) {
  const queryParams = qs.stringify(params, { indices: false })
  return request({
    url: URL.dictionary + '/proplists?' + queryParams,
    method: 'DELETE'
    // params
  })
}

// 7、根据propCode获取propList数据
export function getPropListByPropCode(params) {
  return request({
    url: URL.dictionary + '/getPropListByPropCode',
    method: 'GET',
    params
  })
}
