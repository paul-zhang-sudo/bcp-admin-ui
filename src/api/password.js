import request from '@/utils/request'
// import qs from 'qs'

const URL = {
  psd: '/services/fwcore/PasswordStrategy'
}

// 获取数据
export function getDetail() {
  return request({
    url: URL.psd + '/info',
    method: 'GET'
  })
}

// 修改密码策略
export function submitFormEdit(data) {
  return request({
    url: URL.psd,
    method: 'PUT',
    data
  })
}

