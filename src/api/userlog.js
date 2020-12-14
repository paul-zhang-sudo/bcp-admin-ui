import request from '@/utils/request'

export const URL = {
  userlog: '/services/fwcore/userlogs'
}

// 1、日志列表
export function getPage(params) {
  return request({
    url: URL.userlog,
    method: 'get',
    params
  })
}
