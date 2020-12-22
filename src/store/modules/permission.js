import { constantRoutes } from '@/router'
import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const accessedRoutes = []
      let route = {}
      menus.forEach(({ code, name, url, children }) => {
        if (children) {
          const childMenu = []
          /*  webpack 编译es6 动态引入 import() 时不能传入变量，例如dir =’path/to/my/file.js’ ； import(dir) , 而要传入字符串 import(‘path/to/my/file.js’)，
          这是因为webpack的现在的实现方式不能实现完全动态。但一定要用变量的时候，可以通过字符串模板来提供部分信息给webpack；例如import(./path/${myFile}), 这样编译时
          会编译所有./path下的模块，但运行时确定myFile的值才会加载，从而实现懒加载  */
          children.forEach(({ code, name, url }) => {
            childMenu.push({
              path: code,
              component: (resolve) => require([`@/views/${url}`], resolve),
              //component: () => import(`@/views/${url}`),
              meta: { title: name }
            })
          })
          route = {
            path: `/${code}`,
            component: Layout,
            meta: { title: name },
            children: childMenu
          }
        } else {
          route = {
            path: `/${code}`,
            component: Layout,
            meta: { title: name },
            children: [
              {
                path: '',
                component: (resolve) => require([`@/views/${url}`], resolve),
                //component: () => import(`@/views/${url}`),
                meta: { title: name }
              }
            ]
          }
        }
        accessedRoutes.push(route)
      })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
