import request from '@/utils/request'
import qs from 'qs'

// sso登录
export function ssoLogin(params) {
  return request({
    url: '/authLogin',
    method: 'get',
    params
  })
}
