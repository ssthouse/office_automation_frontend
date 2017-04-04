<template>
  <div>
    <!--投票标题-->
    <h3>标题: {{voting.title}}</h3>

    <el-card class="box-card">
      <h4 style="text-align: left; margin-left: 20px">投票详情:</h4>
      <p style="text-align: left; margin-left: 20px">{{voting.description}}</p>
      <hr style="margin-top: 40px;"/>

      <el-checkbox-group v-model="chosenVoteIndex"
                         style="margin-top: 40px;">
        <div v-for="voteOption in voting.voteOptions"
             style="text-align: left; margin-left: 20px; margin-top: 20px;">
          <el-checkbox
            :label="voting.voteOptions.indexOf(voteOption)">
            {{voteOption.title}}
          </el-checkbox>
        </div>
      </el-checkbox-group>

      <el-button type="primary"
                 :disabled="isPublished"
                 @click="onSubmitClick()"
                 style="margin-top: 30px; float: right; margin-right: 30px; margin-bottom: 20px;">提交投票
      </el-button>
    </el-card>
  </div>
</template>

<script>
  export default{
    name: 'voting-fill',
    data () {
      return {
        voting: this.data,
        chosenVoteIndex: [],
        isPublished: false
      }
    },
    props: ['data'],
    methods: {
      onSubmitClick () {
        if (this.chosenVoteIndex.length === 0) {
          this.$message('请选择至少一个选项')
          return
        }
        this.isPublished = true
        this.$message('投票提交成功')
      }
    },
    computed: {},
    created: function () {
    }
  }
</script>

<style>

</style>
