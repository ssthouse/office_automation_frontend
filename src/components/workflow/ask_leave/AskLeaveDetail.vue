<template>
  <div>
    咋少都没有啊
    <div class="dropdown">
      <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        Dropdown
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="#">Separated link</a></li>
      </ul>
    </div>
    <button type="button" class="btn btn-default" aria-label="Left Align">
      <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
    </button>
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
