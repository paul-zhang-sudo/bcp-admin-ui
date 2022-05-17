import request from '@/utils/request'
import qs from 'qs'

const URL = {
    role: '/services/fwcore/warnConfig',
    baseConfig: '/services/fwcore/warnBaseConfig'
}

export function getId(id) {

}

// 1、列表
export function getPage(params) {
    return request({
        url: URL.role,
        method: 'get',
        params: params
    })
}

export function getBaseConfig(params) {
    return request({
        url: URL.baseConfig,
        method: 'get',
        params: params
    })
}

// 2、新增/编辑
export function submitForm(params) {
    return request({
        url: params.id ? URL.role + '/' + params.id + '' : URL.role,
        method: params.id ? 'PUT' : 'POST',
        data: params
    })
}

// 3、批量删除
export function batchDelete(params) {

}

//4.单个删除
export function singleDelete(id) {
    return request({
        url: URL.role + '/' + id + '',
        method: 'DELETE',
        data: null
    })
}

export function getWarnMethodsByTenantId(tenantId) {
    return request({
        url: '/services/fwcore/warnMethod/getByTenant/' + tenantId,
        method: 'GET'
    })
}

export function sendConf(id) {
    return request({
        url: URL.role+ '/send/' + id,
        method: 'GET'
    })
}
