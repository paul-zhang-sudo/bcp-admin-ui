<template lang="html">
  <div class="app-container">
    <el-form ref="subFormData" :model="subFormData" :rules="subFormDataRule" class="subFormData" label-width="140px">
      <el-form-item label="旧密码：" prop="oldPassWord">
        <el-input v-model="subFormData.oldPassWord" type="password" size="mini" auto-complete="off" class="input-width" />
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input v-model="subFormData.newPassword" type="password" size="mini" auto-complete="off" class="input-width" />
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPassword">
        <el-input v-model="subFormData.confirmPassword" type="password" size="mini" auto-complete="off" class="input-width" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="subForm('subFormData')">提交</el-button>
        <el-button size="mini" @click="resetForm('subFormData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/api/password'
import * as userApi from '@/api/user'
export default {
  data() {
    const validateNewPassword = (rule, value, callback) => {
      if (!value || value.length < this.passwordStrategy.chars || value.length > 16) {
        callback(new Error('密码长度要在' + this.passwordStrategy.chars + '到16位之间'))
      }
      if (this.passwordStrategy.strongFlag) {
        if (!/[0-9]{1,}/.test(value)) {
          callback(new Error('密码要包含数字'))
        }
        if (!/[A-Z]{1,}/.test(value)) {
          callback(new Error('密码要包含大写字母'))
        }
        if (!/[a-z]{1,}/.test(value)) {
          callback(new Error('密码要包含小写字母'))
        }
      } else {
        if (this.passwordStrategy.containsDigits) {
          if (!/[0-9]{1,}/.test(value)) {
            callback(new Error('密码要包含数字'))
          }
        }
        if (this.passwordStrategy.containsUpper) {
          if (!/[A-Z]{1,}/.test(value)) {
            callback(new Error('密码要包含大写字母'))
          }
        }
        if (this.passwordStrategy.containsLower) {
          if (!/[a-z]{1,}/.test(value)) {
            callback(new Error('密码要包含小写字母'))
          }
        }
      }
      if (value === this.subFormData.oldPassWord) {
        callback(new Error('新密码不能与旧密码相同'))
      }
      callback()
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.subFormData.newPassword) {
        callback(new Error('确认密码与新密码不一致'))
      }
      callback()
    }
    return {
      digitsRule: '/[0-9]{1,}/',
      subFormData: {
        oldPassWord: null,
        newPassword: null,
        confirmPassword: null
      },
      passwordStrategy: {
        strongFlag: null,
        chars: null,
        // defaultPwd: null,
        containsDigits: null,
        containsUpper: null,
        containsLower: null
      },
      subFormDataRule: {
        oldPassWord: [{ required: true, message: '请填写旧密码' }],
        newPassword: [{ required: true, trigger: 'blur', validator: validateNewPassword }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]
      }
    }
  },
  created() {
    this.getPasswordStrategy()
  },
  mounted() {},
  methods: {
    // 重置
    resetForm() {
      this.subFormData = {}
    },
    subForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          userApi.modifyPassword(this.subFormData).then(res => {
            this.$message.success('修改成功')
            this.$refs[formData].resetFields()
          }).catch(e => {})
        } else {
          return false
        }
      })
    },
    getPasswordStrategy() {
      api.getDetail().then(res => {
        this.passwordStrategy = res.model
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-width {
    width: 25%;
  }
</style>

