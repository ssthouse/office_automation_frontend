<template>
  <div>
    <el-col :span="24"
            v-loading="loading"
            element-loading-text="拼命加载中">

      <!--编辑 基本用户信息-->
      <el-card class="box-card">
        <div class="clearfix"
             slot="header">
          <span>基本信息</span>
        </div>
        <div>
          <!--用户名-->
          <div style="margin-top: -20px">
            <el-input v-model="userInfo.username"
                      :disabled="true"
                      placeholder="请输入内容">
              <template slot="prepend">用户id:</template>
            </el-input>
          </div>
          <!--密码 默认不可编辑-->
          <div style="margin-top: -20px;">
            <el-input v-model="userInfo.password"
                      placeholder="请输入内容"
                      :disabled="true">
              <template slot="prepend">密码:</template>
            </el-input>
          </div>
          <!--个人简介-->
          <div style="margin-top: -20px;">
            <el-input v-model="userInfo.description"
                      placeholder="请输入内容">
              <template slot="prepend">个人简介:</template>
            </el-input>
          </div>
          <div style="float: right">
            <el-button type="primary" @click="submitUserInfo()">提交修改</el-button>
          </div>
        </div>
      </el-card>

      <!--编辑用户详细信息-->
      <el-card class="box-card">
        <div class="clearfix"
             slot="header">
          <span>扩展信息</span>
        </div>
        <div>
          <!--性别-->
          <div style="float: left; margin-left: 50px; margin-right: 30px; clear: both;">
            <label>性别:</label>
            <el-select v-model="userInfoDetail.gender">
              <el-option v-for="item in GENDER_OPTIONS"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!--真实姓名-->
          <div style="margin-top: -20px; float: left; margin-right: 30px;">
            <el-input v-model="userInfoDetail.name"
                      placeholder="请输入内容">
              <template slot="prepend">真实姓名:</template>
            </el-input>
          </div>
          <!--电话-->
          <div style="float: left; margin-top: -20px; margin-right: 30px; clear: both">
            <el-input v-model="userInfoDetail.phoneNumber"
                      placeholder="请输入您的电话号码">
              <template slot="prepend">电话:</template>
            </el-input>
          </div>
          <!--部门-->
          <div style="float: left; margin-top: -20px; margin-right: 30px; clear: both;">
            <el-input v-model="userInfoDetail.department"
                      placeholder="请输入您的部门">
              <template slot="prepend">部门:</template>
            </el-input>
          </div>
          <div style="float: right">
            <el-button @click="submitUserInfoDetail()"
                       type="primary">提交修改
            </el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
  const GENDER_STR = {
    MALE: 'male',
    FEMALE: 'female',
    NONE: 'none'
  }
  const GENDER_OPTIONS = [
    {
      label: '男',
      value: 'male'
    }, {
      label: '女',
      value: 'female'
    }, {
      label: '保密',
      value: 'none'
    }
  ]

  export default{
    name: 'userinfo',
    data () {
      return {
        // 本地定义的一些常量
        GENDER_STR,
        GENDER_OPTIONS,
        // 用于存储用户基本信息
        userInfo: {
          username: '',
          password: '',
          description: ''
        },
        // 用于存储用户详细信息(除基本信息外的信息)
        userInfoDetail: {
          gender: GENDER_STR.MALE,
          name: '',
          department: '',
          phoneNumber: ''
        },
        // 页面时候加载
        loading: true,
        // 从服务器获取的UserEntity
        userEntity: {}
      }
    },
    props: [],
    methods: {
      submitUserInfo () {
        console.log(this.userInfo)
        this.$http.post('http://127.0.0.1:8080/office_automation_backend/user/info', JSON.stringify(this.userInfo))
          .then(response => {
            if (response.body.ok === true) {
              this.$message('修改成功')
            } else {
              this.$message.error('修改失败')
            }
          }, response => {
            console.log(response)
            this.$message.error('修改失败')
          })
      },
      submitUserInfoDetail () {
        console.log(JSON.stringify(this.userInfoDetail))
        this.$http.post('http://127.0.0.1:8080/office_automation_backend/user/info', JSON.stringify(this.userInfoDetail))
          .then(response => {
            if (response.body.ok === true) {
              this.$message('修改成功')
            } else {
              this.$message.error('修改失败')
            }
          }, response => {
            console.log(response)
            this.$message.error('修改失败')
          })
      }
    },
    created: function () {
      let component = this
      this.$http.get('http://127.0.0.1:8080/office_automation_backend/user/info')
        .then(response => {
          if (response.body.ok !== true) {
            this.$message.error('用户数据获取失败: ' + response.body.msg)
            return
          }
          component.loading = false
          component.userEntity = response.body.user
          console.log(component.userEntity)
          let userEntity = component.userEntity
          // 填充UserInfo
          component.userInfo.username = userEntity.username
          component.userInfo.description = userEntity.description
          // 填充UserInfoDetail
          component.userInfoDetail.name = userEntity.name
          component.userInfoDetail.gender = userEntity.gender
          component.userInfoDetail.phoneNumber = userEntity.phoneNumber
          component.userInfoDetail.department = userEntity.department
        }, response => {
          component.$message.error('用户数据获取失败: ' + response.body.msg)
        })
    }
  }
</script>

<style>
  .clearfix {
    display: table;
    clear: both;
    content: "";
  }
</style>
