<template>
  <div class="main_div">
    <el-tabs type="card"
             class="content_tabs">

      <!--主标签: 用于包含卡片 ===> 用于触发其他tab   本tab不可关闭-->
      <el-tab-pane :label="mainTabName">
        <div :is="mainTabIs"></div>
      </el-tab-pane>

      <!--其他动态增加减少的标签-->
      <el-tab-pane v-for="tab in tabs"
                   closable
                   :label="tab.label">
        <div :is="tab.contentIs"
             class="tab_content"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import QuestionnaireCard from '../tools/questionnaire/QuestionnaireCard.vue'

  export default{
    name: 'baseItem',
    data () {
      return {}
    },
    props: ['mainTabName', 'mainTabIs', 'tabs'],
    components: {
      'questionnaireCard': QuestionnaireCard
    }
  }
</script>

<style>
  .main_div {
    width: 100%;
    height: 100%;
  }
</style>
