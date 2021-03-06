import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 构造函数： new Vue(options)
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化
  this._init(options)
}

initMixin(Vue) // 初始化方法的混入
// 我们熟悉的其他的实例属性和方法由下面这些混入
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
// 注入了一些编译时候用到的函数的简写 _v, _s 等
renderMixin(Vue)

export default Vue
