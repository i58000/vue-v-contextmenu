const _menuMap = new Map()

function _menuInserted(el, binding, vnode) {
  if (vnode.context.$el === el) {
    _menuMap.set(binding.arg, {
      isVue: true,
      menu: vnode.context,
      method: binding.value
    })
  } else {
    _menuMap.set(binding.arg, { isVue: false, menu: el })
  }

  const dom = el
  const hide = () => {
    dom.style.display = 'none'
  }
  // 挂载hide方法在dom上
  dom.hide = hide
  // 初始化隐藏;
  hide()
  /**
   * 添加监听
   */
  if (!binding.modifiers.disableHideOnClick && !binding.modifiers.dhClick) {
    dom.addEventListener('click', hide)
  }
  if (!binding.modifiers.disableHideOnBlur && !binding.modifiers.dhBlur) {
    dom.addEventListener('blur', hide)
  }
  if (!binding.modifiers.disableHideOnScroll && !binding.modifiers.dhScroll) {
    document.addEventListener('scroll', hide)
  }
  /**
   * 移除监听
   */
  binding.unbind = () => {
    if (!binding.modifiers.disableHideOnClick && !binding.modifiers.dhClick) {
      dom.removeEventListener('click', hide)
    }
    if (!binding.modifiers.disableHideOnBlur && !binding.modifiers.dhBlur) {
      dom.removeEventListener('blur', hide)
    }
    if (!binding.modifiers.disableHideOnScroll && !binding.modifiers.dhScroll) {
      document.removeEventListener('scroll', hide)
    }
  }
}
function _targetInserted(el, binding, vnode) {
  const show = event => {
    event.preventDefault()

    const { isVue, menu, method } = _menuMap.get(binding.arg)

    let dom = menu
    if (isVue) {
      dom = menu.$el
      if (method !== undefined) {
        typeof method === 'function'
          ? method(binding.value)
          : menu[method] && menu[method](binding.value)
      }
    }

    setTimeout(() => {
      dom.style.position = 'absolute'
      dom.style.display = 'unset'
      dom.style.outline = 'none'
      // debugger;

      // console.log(
      //   event.clientY,
      //   event.screenY,
      //   event.offsetY,
      //   event.layerY,
      //   event.pageY,
      //   event.y
      // );
      let top = event.pageY
      let left = event.pageX
      if (window.innerHeight < event.pageY + dom.clientHeight) {
        top -= dom.clientHeight
      }
      if (window.innerWidth < event.pageX + dom.clientWidth) {
        left -= dom.clientWidth
      }
      dom.style.top = top + 'px'
      dom.style.left = left + 'px'
      dom.style.zIndex = 6457
      dom.setAttribute('tabindex', 0)
      dom.focus()
    }, 0)
  }

  /**
   * 添加监听 & 移除监听
   */
  if (binding.modifiers.click) {
    el.addEventListener('click', show)
    binding.unbind = () => {
      el.removeEventListener('click', show)
    }
  } else {
    el.addEventListener('contextmenu', show)
    binding.unbind = () => {
      el.removeEventListener('contextmenu', show)
    }
  }
}

export default {
  inserted(el, binding, vnode) {
    if (binding.modifiers.trigger) {
      _targetInserted(el, binding, vnode)
    } else {
      _menuInserted(el, binding, vnode)
    }
  },
  unbind(el, binding, vnode) {
    if (binding.unbind) binding.unbind()
  }
}
