<template>
  <div>
    <table class="table table-bordered" border="1">
      <tbody>
      <tr class="hide">
        <th colspan="6" class="text-center">请假单</th>
      </tr>
      <tr>
        <td width="72">姓名</td>
        <td width="62">李白</td>
        <td width="70">部门</td>
        <td width="77">行政部</td>
        <td width="80">职位</td>
        <td width="93">部门经理</td>
      </tr>
      <tr>
        <td>类型</td>
        <td colspan="5">事假</td>
      </tr>
      <tr>
        <td>事由</td>
        <td colspan="5">test</td>
      </tr>
      <tr>
        <td>日期</td>
        <td colspan="5">2017-04-10至2017-04-12</td>
      </tr>
      <tr>
        <td>天数</td>
        <td colspan="5">2天</td>
      </tr>
      <tr class="hide">
        <td>审核人</td>
        <td colspan="5">&nbsp;</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default{
    name: 'ask-leave-detail',
    data () {
      return {}
    },
    props: [],
    methods: {},
    computed: {},
    created: function () {

    }
  }
</script>

<style>
</style>
