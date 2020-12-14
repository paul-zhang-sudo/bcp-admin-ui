import request from '@/utils/request'

const URL = {
  menu: '/services/fwcore/menus'
}

// 1、获取所有的菜单
export function listAll(params) {
  return request({
    url: URL.menu + '/listAll',
    method: 'get'
    // params
  })
}

// 2、获取所有菜单的菜单树
export function getMenuTree() {
  return request({
    url: URL.menu + '/getTotalTree',
    method: 'get'
    // params
  })
}

// 3、新增/更新组织
export function updateMenu(params) {
  return request({
    url: params.id ? URL.menu + '/' + params.id + '' : URL.menu,
    method: params.id ? 'PUT' : 'POST',
    data: params
  })
}

// 4、查询字典
export function getSourceTypeOptions(code) {
  return request({
    // url: '/services/fwcore/prop/' + code + '/proplists',
    url: '/services/fwcore/props/getPropListByPropCode?code=' + code,
    method: 'get'
  })
}

// 5、删除菜单
export function delMenu(params) {
  return request({
    url: URL.menu + '/' + params,
    method: 'DELETE'
  })
}

// 6、详细
export function detailMenu(params) {
  return request({
    url: URL.menu + '/' + params,
    method: 'GET'
  })
}

// 7、获取所有的业务菜单
export function getBusinessMenu() {
  return request({
    url: URL.menu + '/businessMenuTrees',
    method: 'get'
    // params
  })
}
