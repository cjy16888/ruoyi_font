<!--封装 link 路由，区别每一个目录的  跳转路径-->
<template>
  <!--点击被 Link 标签包裹的文字之后，就会跳转到对应的路由地址 to-->
  <component :is="type" v-bind="linkProps(to)">
    <!--该标签不加的话，不会跳转，点击不了-->
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    //校验路由的路径是否正确
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
  }
}
</script>
