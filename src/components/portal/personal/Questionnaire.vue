<template>
  <div style="height: 100%; width: 100%;">
    <!--标题-->
    <el-input placeholder="问卷标题"
              v-model="questionnaire.title"></el-input>

    <!--所有题目-->
    <el-card class="box-card" v-for="question in questionnaire.questions">
      <!--题目标题-->
      <p style="align: left; text-align: left; padding-left: 10px">
        <span>{{questionnaire.questions.indexOf(question) + 1}}.{{question.title}}</span>
      </p>
      <!--所有选项-->
      <div v-for="selection in question.selections"
           v-if="question.type === QUESTION_TYPES.RADIO"
           style="text-align: left; padding-left: 20px">
        <input :class="question.type"
               :type="question.type"
               :name="question.title"
               style="padding-left: 10px"
               v-text="selection">{{selection}}</input>
      </div>
      <!--操作按钮-->
      <el-button-group style="text-align: right; float: right; margin-right: 10px;">
        <el-button>上移</el-button>
        <el-button>下移</el-button>
        <el-button>删除</el-button>
        <el-button>复用</el-button>
      </el-button-group>
    </el-card>

    <!--增加题目按钮-->
    <el-row justify="space-around"
            type="flex"
            v-if="showQuestions"
            style="margin-top: 10px;margin-bottom: 10px">
      <el-button>单选题</el-button>
      <el-button>多选题</el-button>
      <el-button>文字题</el-button>
    </el-row>
    <el-button style="width: 90%"
               @click="toggleShowQuestions">
      增加问题
    </el-button>
  </div>
</template>

<script>
  //  题目类型
  const QUESTION_TYPES = {
    TEXT_AREA: 'textArea',
    RADIO: 'radio',
    CHECK_BOX: 'checkbox'
  }

  export default{
    name: '',
    data () {
      return {
        QUESTION_TYPES: QUESTION_TYPES,
        showQuestions: false,
        questionnaire: {
          title: '',
          // {
          //    title:'',
          //    type:'textArea'|| 'radio' || 'checkbox'
          //    selections:['options1', 'options2']
          // }
          questions: [{
            title: 'questionOne',
            type: 'radio',
            selections: ['options1', 'options2']
          }],
          // 用字符串表示日期时间
          deadline: ''
        }
      }
    },
    props: [],
    methods: {
      toggleShowQuestions: function () {
        this.showQuestions = !this.showQuestions
      }
    }
  }
</script>

<style>
  .el-input {
    width: 90%;
  }

  .box-card {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    width: 90%;
  }
</style>
