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
      <!--单选和多选-->
      <div v-for="selection in question.selections"
           v-if="question.type === QUESTION_TYPES.RADIO || question.type === QUESTION_TYPES.CHECK_BOX"
           style="text-align: left; padding-left: 20px">
        <input
          :type="question.type"
          style="padding-left: 10px"
          v-text="selection">{{selection}}</input>
      </div>
      <!--文字输入-->
      <el-input type="textarea" autosize placeholder="请输入内容"
                v-if="question.type === QUESTION_TYPES.TEXT_AREA"></el-input>
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
            v-if="showQuestions">
      <el-button @click="addRadioQues">单选题</el-button>
      <el-button @click="addCheckboxQues">多选题</el-button>
      <el-button @click="addTextAreaQues">文字题</el-button>
    </el-row>
    <el-button style="width: 90%"
               @click="toggleShowQuestions">
      增加问题
    </el-button>

    <!--截止日期 & 发布 或者 保存 问卷-->
    <div style="margin-top: 20px; margin-bottom: 20px; width: 90%;">
      <el-date-picker
        style="margin-left: 30px"
        v-model="questionnaire.deadline"
        type="date"
        placeholder="截止日期"
        :picker-options="pickerOptions0">
      </el-date-picker>

      <el-button type="primary"
                 style="margin-left: 30px"
                 @click="saveQuestionnaire">保存问卷
      </el-button>
      <el-button type="primary"
                 style="margin-left: 30px"
                 @click="publishQuestionnaire">发布问卷
      </el-button>
    </div>

    <!--增加单选题 dialog-->
    <el-dialog title="增加单选题" v-model="showAddRadioDialog">
      <el-input placeholder="标题"
                v-model="radioQuestionTitle"
                style="width: 90%;">
      </el-input>
      <el-input type="textarea"
                autosize
                placeholder="选项, 以回车换行"
                style="width: 90%;"
                v-model="radioQuestionContent"></el-input>
      <p>预览</p>
      <div v-text="previewRadioOptions"></div>
      <div style="margin-top: 10px">
        <el-button type="primary"
                   @click="cancelDialog(QUESTION_TYPES.RADIO)">取消
        </el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>

    <!--增加多选题 dialog-->
    <el-dialog title="增加多选题" v-model="showAddCheckboxDialog">
    </el-dialog>

    <!--增加文字题 dialog-->
    <el-dialog title="增加文字题" v-model="showAddTextAreaDialog">
    </el-dialog>
  </div>
</template>

<script>
  //  题目类型
  const QUESTION_TYPES = {
    RADIO: 'radio',
    CHECK_BOX: 'checkbox',
    TEXT_AREA: 'textArea'
  }

  export default{
    name: '',
    data () {
      return {
        /**
         * 问卷题目类型
         */
        QUESTION_TYPES: QUESTION_TYPES,
        showQuestions: false,
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        /**
         * 当前调查问卷的数据
         */
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
          }, {
            title: 'questionOne',
            type: 'checkbox',
            selections: ['options1', 'options2']
          }],
          // 用字符串表示日期时间
          deadline: ''
        },
        /**
         * 三种题目的数据
         */
        radioQuestionTitle: '',
        radioQuestionContent: '',
        /**
         * dialog显示标志位
         */
        showAddRadioDialog: false,
        showAddCheckboxDialog: false,
        showAddTextAreaDialog: false
      }
    },
    /**
     * 计算属性
     */
    computed: {
      previewRadioOptions: function () {
        return '选项共' + this.radioQuestionContent.split('\n').length + '个' + this.radioQuestionContent.split('\n')
      }
    },
    /**
     * placeholder
     */
    watch: {
      radioQuestionContent: function (val) {
        console.log(val.split('\n'))
      }
    },
    /**
     * 需要出入的 props
     */
    props: [],
    /**
     * 本地的方法
     */
    methods: {
      // 时候显示三种题目
      toggleShowQuestions: function () {
        this.showQuestions = !this.showQuestions
      },
      // 显示三种题目的对话框
      addRadioQues: function () {
        this.showAddRadioDialog = true
      },
      addCheckboxQues: function () {
        this.showAddCheckboxDialog = true
      },
      addTextAreaQues: function () {
        this.showAddTextAreaDialog = true
      },
      /**
       * 增加问题的dialog 按钮事件
       */
      cancelDialog: function (questionType) {
        switch (questionType) {
          case QUESTION_TYPES.RADIO:
            this.showAddRadioDialog = false
            break
          case QUESTION_TYPES.CHECK_BOX:
            this.showAddCheckboxDialog = false
            break
          case QUESTION_TYPES.TEXT_AREA:
            this.showAddTextAreaDialog = false
            break
        }
      },
      // 保存问卷
      saveQuestionnaire: function () {
        // TODO
      },
      // 发布问卷
      publishQuestionnaire: function () {
        // TODO
      }
    }
  }
</script>

<style>
  .el-input {
    width: 90%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .box-card {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    width: 90%;
  }

  .el-row {
    margin-top: 30px;
    margin-bottom: 10px;
  }
</style>
