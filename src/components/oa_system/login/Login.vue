<template>
  <div class="login-wrap">
    <div class="ms-title">AO System Login</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password"
                    @keyup.enter.native="getToken()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="ruleForm.isAdmin">以管理员身份登录</el-checkbox>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="getToken()">登录</el-button>
        </div>
        <p style="font-size:12px;line-height:30px;color:#999; margin-top: 30px;">Tips : 如果希望进入管理员页面, 请输入管理员账号</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    data: function () {
      return {
        ruleForm: {
          username: '',
          password: '',
          isAdmin: false
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getToken () {
        let requestBody = JSON.stringify({
          username: this.ruleForm.username,
          password: this.ruleForm.password,
          isAdmin: this.ruleForm.isAdmin
        })
        this.$http.post('http://127.0.0.1:8080/office_automation_backend/token', requestBody)
          .then(response => {
            let component = this
            let responseBody = response.body
            if (responseBody.ok) {
              this.$message('登录成功, 正在跳转主页')
              // 设置默认 token 为 header
              Vue.http.headers.common['token'] = responseBody.token
              // 直接跳转主页
              setTimeout(function () {
                component.$router.push('oa_system')
              }, 1000)
            } else {
              this.$message.error('用户名或密码错误!')
            }
            // 登录成功后
          }, response => {
            this.$message.error('登录失败!')
          })
      }
    }
  }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    text-align: center;
    width: 100%;
    height: 100%;
    background-color: #2c3e50;
  }

  .ms-title {
    padding-top: 100px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }

  .ms-login {
    text-align: center;
    width: 360px;
    height: 200px;
    padding: 40px;
    margin: 40px auto 0 auto;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    margin-top: 20px;
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>
