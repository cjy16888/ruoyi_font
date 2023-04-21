import Dict from './Dict'
import { mergeOptions } from './DictOptions'

export default function(Vue, options) {
  //外面传递值
  mergeOptions(options)
  //全局组件，挂在下面的  字典值
  //每一个组件的字典都是独有的，和全局变量不一样，但是也和全局变量有相似的地方
  Vue.mixin({
    data() {
      if (this.$options === undefined || this.$options.dicts === undefined || this.$options.dicts === null) {
        return {}
      }
      const dict = new Dict()
      dict.owner = this
      return {
        dict
      }
    },
    created() {
      if (!(this.dict instanceof Dict)) {
        return
      }
      options.onCreated && options.onCreated(this.dict)
      this.dict.init(this.$options.dicts).then(() => {
        options.onReady && options.onReady(this.dict)
        this.$nextTick(() => {
          this.$emit('dictReady', this.dict)
          if (this.$options.methods && this.$options.methods.onDictReady instanceof Function) {
            this.$options.methods.onDictReady.call(this, this.dict)
          }
        })
      })
    },
  })
}
