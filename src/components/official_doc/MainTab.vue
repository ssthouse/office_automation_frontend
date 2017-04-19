<template>
  <div>
    <el-collapse style="margin-left: 10px; margin-right: 10px;">
      <el-collapse-item title="我的待办公文"
                        class="panel-title">
        <official-doc-user-panel></official-doc-user-panel>
      </el-collapse-item>

      <el-collapse-item title="我发起的公文"
                        class="panel-title">
        <official-doc-admin-panel></official-doc-admin-panel>
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

  Vue.component(OfficialDocUserPanel.name, OfficialDocUserPanel)
  Vue.component(OfficialDocAdminPanel.name, OfficialDocAdminPanel)

  export default{
    name: 'official-doc-main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {}
  }
</script>

<style>

</style>
