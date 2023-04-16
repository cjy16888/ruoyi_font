<template>
  <div>
    <!--图标显示，以及路由跳转-->
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'RuoYiDoc',
  data() {
    return {
      url: 'http://doc.ruoyi.vip/ruoyi-vue'
    }
  },
  methods: {
    goto() {
      //新页面打开
      window.open(this.url)
    }
  }
}
</script>
