<template>
  <div>
    <vue-event-calendar :events="demoEvents"></vue-event-calendar>

  </div>
</template>

<script>
  export default{
    name: 'calendar-detail',
    data () {
      return {
        demoEvents: [{
          date: '2016/12/15',
          title: 'Foo',
          desc: 'longlonglong description'
        }, {
          date: '2016/11/12',
          title: 'Bar'
        }]
      }
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
