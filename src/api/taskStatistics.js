import request from '@/utils/request'
import qs from 'qs'

//获取统计数据
export function getTaskStatistics(param) {
  return request({
    url: `/services/fwcore/task/statistics`,
    method: 'post',
    data: param
  })
}