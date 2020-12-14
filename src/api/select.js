import request from '@/utils/request'

export function getProplist(params) {
  return request({
    url: `/services/fwcore/prop/${params.code}/proplists`,
    method: 'get',
    params: { group: params.group }
  })
}

export function getFreelist(params) {
  return request({
    url: `/services/fwcore/freelists/${params.code}/freelist`,
    method: 'get',
    params: { params: params.params }
  })
}
