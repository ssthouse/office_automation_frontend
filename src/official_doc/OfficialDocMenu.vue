<template>
  <div>
    <el-menu :router="true"
             default-active="1"
             mode="vertical">
      <el-menu-item :index="urls[0]">menu one</el-menu-item>
      <el-menu-item :index="urls[1]">menu two</el-menu-item>
      <el-menu-item :index="urls[2]">menu three</el-menu-item>
      <el-menu-item :index="urls[3]">menu four</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import URL_CONS from './OfficialDocCons'

  export default{
    name: '',
    data () {
      return {
        urls: URL_CONS.OFFICIAL_DOC_URLS
      }
    },
    props: []
  }
</script>

<style>

</style>
