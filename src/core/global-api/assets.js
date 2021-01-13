/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ['component', 'directive', 'filter']
  ASSET_TYPES.forEach(type => {
    // Vue.component('comp', {...})
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          // 平时定义组件大概率是这种情况
          // 所以我们在这里看如何定义一个组件
          definition.name = definition.name || id
          // 转换参数2为组件构造函数： Vue.extend(options) => Ctor(VueComponent)
          // 获取组件实例： new VueComponent
          // 接下来一定会在某个时刻执行一下挂载： 挂载 => render() => update() => patch() => 真实 dom
          // 父子组件声明周期顺序： 
          // 深度优先
          // parent create => child create => child mount => parent mount
          // TODO 销毁的顺序
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }

        // 注册到默认的选项中
        // options.components.comp = Ctor
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
