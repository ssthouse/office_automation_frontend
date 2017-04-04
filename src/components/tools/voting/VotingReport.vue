<template>
  <div>

    <el-card class="box-card">
      <div slot="header">
        <span>投票基本信息</span>
      </div>
      <h3 style="text-align: left; margin-left: 20px;">投票: {{voting.title}}</h3>

      <h4 style="text-align: left; margin-left: 20px;">截止时间: {{voting.deadline}}</h4>

      <h4 style="text-align: left; margin-left: 20px;">发起者: {{voting.createrId}}</h4>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span>投票统计结果:</span>
      </div>

      <!--投票结果的图表-->
      <h4>柱状分布</h4>
      <canvas ref="barChart"
              style="height: 300px;"></canvas>

      <h4 style=" margin-top: 60px">饼状分布</h4>
      <canvas ref="pieChart"
              style="height: 300px;"></canvas>
    </el-card>
  </div>
</template>

<script>
  import Chart from 'chart.js'

  export default{
    name: 'voting-report',
    data () {
      return {
        voting: this.data,
        none: ''
      }
    },
    props: ['data'],
    methods: {},
    computed: {},
    mounted: function () {
      // 获取ref
      let barCtx = this.$refs.barChart
      let pieCtx = this.$refs.pieChart
      // 填充数据
      let data = []
      let labels = []
      this.voting.voteOptions.forEach(voteOption => {
        data.push(voteOption.sum)
        labels.push(voteOption.title)
      })
      let barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '选项分布',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)'
          }]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
      let pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: '选项分布',
            data: data,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
            ]
          }]
        },
        options: {
          responsive: true
        }
      })
      this.none = barChart
      this.none = pieChart
    }
  }
</script>

<style>

</style>
