<template>
  <el-dialog title="选择部门"
             v-model="showDialog"
             :show-close="false">

    <el-tree style="float: left; width: 100%; text-align: left; margin-bottom: 10px;"
             ref="tree"
             :data="departmentList"
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
  import * as Constant from '../Constant'

  /**
   * 该dialog产生两个event： cancel， ensure
   */
  export default{
    name: 'choose-department-dialog',
    data () {
      return {
        departmentList: [],
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
        this.$emit('ensure', this.$refs.tree.getCheckedNodes())
      }
    },
    computed: {},
    created: function () {
      // 获取department数据
      this.$http.get(Constant.BASE_URL + '/department/all')
        .then(response => {
          if (response.body.ok !== true) {
            this.$message('获取部门数据失败: ', response.body.msg)
            return
          }
          this.departmentList = response.body.departmentList
          console.log(this.departmentList)
        }, response => {
          this.$message('获取部门数据失败')
        })
    }
  }
</script>

<style></style>
