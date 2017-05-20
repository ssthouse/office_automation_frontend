<template>
  <el-dialog title="选择用户"
             v-model="showDialog"
             :show-close="false">
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClickCancel()">取 消</el-button>
      <el-button type="primary" @click="onClickEnsure()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  /**
   * 该dialog产生两个event： cancel， ensure
   */
  export default{
    name: 'choose-user-dialog',
    data () {
      return {}
    },
    props: ['showDialog'],
    methods: {
      onClickCancel () {
        this.$emit('cancel')
      },
      onClickEnsure () {
        this.$emit('ensure', 'hahaha')
      }
    },
    computed: {},
    created: function () {
      // 获取department数据

    }
  }
</script>

<style>

</style>
