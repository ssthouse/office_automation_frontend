<template>
  <div>
    <el-collapse style="margin-left: 10px; margin-right: 10px;">
      <el-collapse-item title=""
                        class="panel-title">
        <template slot="title">
          <span>我发起的公文</span>
          <el-button style="float: right; margin-right: 30px; margin-top: 3px;"
                     type="primary"
                     @click="onClickAdd()">新增
          </el-button>
        </template>
        <official-doc-admin-panel></official-doc-admin-panel>
      </el-collapse-item>

      <el-collapse-item title="我的待办公文"
                        class="panel-title">
        <official-doc-user-panel></official-doc-user-panel>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  // import * as types from '../../store/mutation-types'
  // import TabItem from '../base/TabItem'
  import OfficialDocUserPanel from './panel/OfficialDocUserPanel.vue'
  import OfficialDocAdminPanel from './panel/OfficialDocAdminPanel.vue'
  import Vue from 'vue'
  import * as EventBus from '../base/EventBus'

  Vue.component(OfficialDocUserPanel.name, OfficialDocUserPanel)
  Vue.component(OfficialDocAdminPanel.name, OfficialDocAdminPanel)

  export default{
    name: 'official-doc-main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {
      onClickAdd () {
        EventBus.instance.$emit(EventBus.EVENT_OFFICIAL_DOC_CLICK_NEW)
      }
    }
  }
</script>

<style>

</style>
