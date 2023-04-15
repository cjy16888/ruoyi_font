<!--封装 item，进行传递接受 菜单目录的 icon 图标，以及 title 标题-->

<script>
export default {
  name: 'MenuItem',
  functional: true,  //true，否则不传递数据
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    //传递 菜单目录的 icon 图标
    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }

    //传递 菜单目录的 title
    if (title) {
      if (title.length > 5) {
        vnodes.push(<span slot='title' title={(title)}>{(title)}</span>)
      } else {
        vnodes.push(<span slot='title'>{(title)}</span>)
      }
    }
    return vnodes
  }
}
</script>
