<template lang="html">
  <div class="app-container">
     <div class="background" align="center">
      <img :src="loadSrc" alt="" />
      <span style="display:inherit;font-size: 22px;margin-top: 30px">身份认证中</span>
      <span style="display:inherit;font-size: 15px;margin-top: 10px">请勿关闭页面，稍后会进行跳转</span>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/ssoLogin'
export default {
  data() {
    return {
      loadSrc: require('@/img/loading.gif')
    }
  },
  created() {
    this.ssoLogin()
  },
  methods: {
    ssoLogin(){
      let params = {
        "tenant":this.$route.query.tenant,
        "code":this.$route.query.code
      }
      console.log('开始调用登录接口，参数:'+params)
      api.ssoLogin(params).then(res => {
        console.log('登录接口调用完毕，返回结果:'+res)
        console.log(res)
        this.$store.dispatch('user/token', res.msg).then(rs => {
          console.log('cookie保存完毕,准备进入首页,rs:'+rs)
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        })
      }).catch(e => {
        console.log('单点登录失败,错误信息:'+e)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.background{
    width:100%;
    height:100%;
    z-index:-1;
    position: absolute;
}
</style>

