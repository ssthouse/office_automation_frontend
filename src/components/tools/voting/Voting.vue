<template>
  <div>
    <h3>创建新的投票</h3>

    <!--标题-->
    <el-card class="box-card">
      <h4 style="float: left; margin-left: 20px;">请输入投票标题:</h4>
      <el-input placeholder="投票标题"
                style="margin-top: 0px; margin-bottom: 0px;"
                v-model="voting.title"></el-input>
    </el-card>

    <el-card class="box-card">
      <div class="card-header">
        <h4 style="float: left; margin-left: 20px;">请填写关于投票的详细描述::</h4>
      </div>
      <div style="margin-right: 20px; margin-left: 20px;">
        <el-input type="textarea"
                  :rows="4"
                  placeholder="please input the details"
                  v-model="voting.description">
        </el-input>
      </div>
    </el-card>

    <el-row>
      <el-col :span="12">
        <h3 style="float: right;">投票选项:</h3>
      </el-col>
      <el-col :span="12">
        <el-checkbox style="margin-right: 40px;"
                     v-model="voting.multipleChoice">
          <span style="font-size: larger;">是否多选</span>
        </el-checkbox>
        <el-button @click="addOption()" type="primary" style="margin-bottom: 20px; margin-top: 20px;">增加选项</el-button>
      </el-col>
    </el-row>

    <!--所有选项-->
    <el-card class="box-card"
             v-for="voteOption in voting.voteOptions">
      <el-row style="margin-top: -10px; margin-bottom: -20px;">
        <el-col :span="20">
          <el-input v-model="voteOption.title"
                    style="margin-right: 100px; clear: both; float: left;"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" style="margin-right: 40px; float: right"
                     @click="removeOption(voteOption)">删除
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <hr/>

    <div style="margin-top: 40px; margin-bottom: 60px;">
      <el-date-picker
        style="margin-left: 30px"
        format="yyyy-MM-dd HH-mm-ss"
        v-model="voting.deadline"
        type="datetime"
        placeholder="截止日期"
        :picker-options="pickerOptions0">
      </el-date-picker>

      <el-button type="primary"
                 style="margin-left: 30px"
                 :disabled="published"
                 @click="saveVoting()">保存投票
      </el-button>
      <el-button @click="publishVoting()"
                 :disabled="published"
                 type="primary"
                 style="margin-left: 100px;">发布投票
      </el-button>
    </div>
  </div>
</template>

<script>
  import Voting from './bean/voting'
  import * as EventBus from '../../base/EventBus'

  const URL_POST_NEW_VOTING = 'http://127.0.0.1:8080/office_automation_backend/voting/new'

  export default{
    name: 'new-voting',
    data () {
      return {
        voting: Voting.getEmptyInstance(),
        // 控制日期选择
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        published: false
      }
    },
    props: ['data'],
    methods: {
      addOption () {
        this.voting.addEmptyOption()
      },
      saveVoting () {
        this.voting.createrId = this.$store.state.mainModule.user.username
        if (!this.voting.isValid()) {
          this.$message('投票数据不完整')
          return
        }
        this.$http.post(URL_POST_NEW_VOTING, JSON.stringify(this.voting))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('投票保存失败: ' + response.body.msg)
              return
            }
            EventBus.instance.$emit(EventBus.EVENT_VOTING_UPDATE)
            this.published = true
            this.$message(response.body.msg)
          }, response => {
            this.$message('投票保持失败')
          })
      },
      publishVoting () {
        // 填充创建者
        this.voting.createrId = this.$store.state.mainModule.user.username
        this.voting.published = true
        if (!this.voting.isValid()) {
          this.$message('投票数据不完整')
          return
        }
        this.$http.post(URL_POST_NEW_VOTING, JSON.stringify(this.voting))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('投票保存失败: ' + response.body.msg)
              return
            }
            EventBus.instance.$emit(EventBus.EVENT_VOTING_UPDATE)
            this.published = true
            this.$message(response.body.msg)
          }, response => {
            this.$message('投票保持失败')
          })
      },
      removeOption (voteOption) {
        console.log(voteOption)
        let index = this.voting.voteOptions.indexOf(voteOption)
        this.voting.voteOptions.splice(index, 1)
      }
    },
    computed: {},
    created: function () {
      if (this.data === null || this.data === undefined) {
        return
      }
      this.voting = Voting.parseVotingData(this.data)
    }
  }
</script>

<style>

</style>
