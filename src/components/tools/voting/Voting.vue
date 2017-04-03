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
      <el-input type="textarea"
                style="margin-left: 20px; margin-right: 20px;"
                :rows="4"
                placeholder="please input the details"
                v-model="voting.description">
      </el-input>
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
        <el-button type="small" style="margin-left: 20px;"
                   @click="removeOption(voteOption)">删除
        </el-button>
      </div>
    </el-card>

    <div style="margin-top: 40px; margin-bottom: 60px;">
      <el-date-picker
        style="margin-left: 30px"
        format="yyyy-MM-dd HH-mm-ss"
        v-model="voting.deadline"
        type="datetime"
        placeholder="截止日期"
        :picker-options="pickerOptions0">
      </el-date-picker>

      <el-button @click="addOption()" type="primary" style="margin-left: 100px;">增加选项</el-button>
      <el-button @click="publishVoting()" type="primary" style="margin-left: 100px;">发布投票</el-button>
    </div>
  </div>
</template>

<script>
  import Voting from './bean/voting'

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
        }
      }
    },
    props: ['data'],
    methods: {
      addOption () {
        this.voting.addEmptyOption()
      },
      publishVoting () {
        if (!this.voting.isValid()) {
          this.$message('投票数据不完整')
          return
        }
        console.log('发布投票')
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
