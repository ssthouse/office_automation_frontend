<template>
  <div>
    <!--投票标题-->
    <h3>标题: {{voting.title}}</h3>

    <el-card class="box-card">
      <h4 style="text-align: left; margin-left: 20px">投票详情:</h4>
      <p style="text-align: left; margin-left: 20px">{{voting.description}}</p>
      <hr style="margin-top: 40px;"/>


      <!--多选情况-->
      <el-checkbox-group v-model="chosenVoteIndexList"
                         v-if="voting.multipleChoice === true"
                         style="margin-top: 40px;">
        <div v-for="voteOption in voting.voteOptions"
             style="text-align: left; margin-left: 20px; margin-top: 20px;">
          <el-checkbox
            :label="voting.voteOptions.indexOf(voteOption)">
            {{voteOption.title}}
          </el-checkbox>
        </div>
      </el-checkbox-group>

      <!--单选情况-->
      <el-radio-group v-model="singleChoiceIndex"
                      v-if="voting.multipleChoice !== true"
                      style="margin-top: 40px; text-align: left; width: 100%;">
        <div v-for="voteOption in voting.voteOptions"
             style="text-align: left; margin-left: 20px; margin-top: 20px;">
          <el-radio :label="voting.voteOptions.indexOf(voteOption)">{{voteOption.title}}
          </el-radio>
        </div>
      </el-radio-group>

      <div>
        <el-button type="primary"
                   :disabled="isPublished"
                   @click="onSubmitClick()"
                   style="margin-top: 30px; margin-right: 30px; margin-bottom: 20px;">提交投票
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as EventBus from '../../base/EventBus'
  import Utils from '../../base/Utils'

  const URL_POST_NEW_VOTING = 'http://127.0.0.1:8080/office_automation_backend/voting/vote'

  export default{
    name: 'voting-fill',
    data () {
      return {
        voting: this.data,
        chosenVoteIndexList: [],
        singleChoiceIndex: '',
        isPublished: false
      }
    },
    props: ['data'],
    methods: {
      onSubmitClick () {
        if (this.voting.multipleChoice === true && this.chosenVoteIndexList.length === 0) {
          this.$message('请选择至少一个选项')
          return
        }
        if (this.voting.multipleChoice === false && Utils.isStrEmpty(this.singleChoiceIndex)) {
          this.$message('请选择至少一个选项')
          return
        }
        if (this.voting.multipleChoice === true) {
          this.postMeetingEntity()
        } else {
          this.postSingleChoice()
        }
      },
      postMultipleVoteOptions () {
        // 填充需要发起请求的数据
        let voteOptions = []
        for (let index in this.chosenVoteIndexList) {
          let voteIndex = parseInt(this.chosenVoteIndexList[index])
          voteOptions.push(this.voting.voteOptions[voteIndex])
        }
        // 发起增加投票请求
        this.$http.post(URL_POST_NEW_VOTING, JSON.stringify(voteOptions))
          .then(success => {
            if (success.body.ok !== true) {
              this.$message('投票提交失败')
              return
            }
            this.$message('投票提交成功')
            EventBus.instance.$emit(EventBus.EVENT_VOTING_UPDATE)
            this.isPublished = true
          }, fail => {
            this.$message('投票提交失败')
          })
      },
      postSingleChoice () {
        // 填充需要发起请求的数据
        let voteOptions = []
        let choiceIndex = parseInt(this.singleChoiceIndex)
        voteOptions.push(this.voting.voteOptions[choiceIndex])
        // 发起增加投票请求
        this.$http.post(URL_POST_NEW_VOTING, JSON.stringify(voteOptions))
          .then(success => {
            if (success.body.ok !== true) {
              this.$message('投票提交失败')
              return
            }
            this.$message('投票提交成功')
            EventBus.instance.$emit(EventBus.EVENT_VOTING_UPDATE)
            this.isPublished = true
          }, fail => {
            this.$message('投票提交失败')
          })
      }
    },
    computed: {},
    created: function () {
    }
  }
</script>

<style>

</style>
