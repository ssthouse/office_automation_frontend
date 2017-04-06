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

    <h3>投票选项:</h3>

    <!--所有选项-->
    <el-card class="box-card"
             v-for="voteOption in voting.voteOptions">
      <div style="margin-left: 20px; margin-top: -10px;">
        <h4 style="text-align: left">
          选项{{voting.voteOptions.indexOf(voteOption) + 1}}:
        </h4>
      </div>
      <div style="margin-top: -30px; margin-bottom: -20px;">
        <el-input v-model="voteOption.title"></el-input>
      </div>
      <div style="margin-top: 20px">
        <el-button type="primary" style="margin-right: 40px; float: right"
                   @click="removeOption(voteOption)">删除
        </el-button>
      </div>
    </el-card>

    <el-button @click="addOption()" type="primary" style="margin-bottom: 20px; margin-top: 20px;">增加选项</el-button>

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
      publishVoting () {
        // 填充创建者
        this.voting.createrId = this.$store.state.mainModule.user.username
        if (!this.voting.isValid()) {
          this.$message('投票数据不完整')
          return
        }
        let requestBody = JSON.stringify(this.voting)
        this.$http.post(URL_POST_NEW_VOTING, requestBody)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('投票保存失败: ' + response.body.msg)
              return
            }
            this.$message(response.body.msg)
            this.published = true
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
    }
  }
</script>

<style>

</style>
