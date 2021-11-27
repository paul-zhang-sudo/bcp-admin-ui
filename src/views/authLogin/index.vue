<template lang="html">
  <div class="app-container">
     <div class="background" align="center">
      <img :src="loadSrc" width="508" height="381" alt="" />
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
      console.log(this.$route.query)
      let params = {
        "tenant":this.$route.query.tenant,
        "code":this.$route.query.code
      }
      api.ssoLogin(params).then(res => {
        console.log(res)
        this.$store.dispatch('user/token', res.msg).then(res => {
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

