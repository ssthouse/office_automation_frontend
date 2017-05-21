<template>
  <el-dialog title="选择用户"
             v-model="showDialog"
             :close-on-click-modal="false"
             :show-close="false">

    <el-tree style="float: left; width: 100%; text-align: left; margin-bottom: 10px;"
             ref="tree"
             :data="userDepartmentList"
             :props="props"
             show-checkbox>

    </el-tree>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onClickCancel()">取 消</el-button>
      <el-button type="primary" @click="onClickEnsure()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import * as Cons from '../Constant'

  /**
   * 该dialog产生两个event： cancel， ensure
   */
  export default{
    name: 'choose-user-dialog',
    data () {
      return {
        userDepartmentList: [],
        props: {
          label: 'name',
          children: 'personList'
        }
      }
    },
    props: ['showDialog'],
    methods: {
      onClickCancel () {
        this.$emit('cancel')
      },
      onClickEnsure () {
        let checkList = this.$refs.tree.getCheckedNodes(true)
        for (let index in checkList) {
          let item = checkList[index]
          if (item.username === undefined) {
            checkList.splice(index, 1)
          }
        }
        // 拼接用户字符串
        let users = []
        for (let user of checkList) {
          users.push(user.username)
        }
        this.$emit('ensure', users.join(','))
      }
    },
    computed: {},
    created: function () {
      // 获取department数据
      this.$http.get(Cons.BASE_URL + '/department/user_department')
        .then(response => {
          if (response.body.ok !== true) {
            this.$message('获取用户数据失败: ' + response.body.msg)
            return
          }
          this.userDepartmentList = response.body.departmentList
//          console.log(this.userDepartmentList)
        }, response => {
          this.$message('获取用户数据失败')
        })
    }
  }
</script>

<style>

</style>
