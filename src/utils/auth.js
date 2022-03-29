import Cookies from 'js-cookie'

const TokenKey = 'VSESSIONID'// 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  //return Cookies.set(TokenKey, token)
  //解决https跨域问题
  console.log(process.env.NODE_ENV)
  let result
  if( process.env.NODE_ENV==='production' ){
    result = Cookies.set(TokenKey, token)
  }else{
    result = Cookies.set(TokenKey, token, { secure: true,sameSite: 'None' })
  }
  return result
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
