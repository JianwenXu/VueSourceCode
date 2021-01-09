# 源码解析笔记

## 重要的文件和文件目录

1. src/core/ 
  * 核心代码，要经常来这里看看
2. src/platforms/web/entry-runtime-with-compiler.js
  * 入口地址
  * 解析模板相关的选项
3. src/platforms/web/runtime/index.js
  * 安装平台特有的 patch 函数，实现跨平台操作
  * 实现 $mount('#app') => mountComponent: render() => vdom => patch() => dom => appendChild
4. src/core/index.js
  * 初始化全局 API
5. src/core/instance/index.js
  * Vue 构造函数
  * 声明实例属性和方法
6. src/core/instance/init.js
  * 初始化
7. src/core/instance/lifecycle.js
  * mountComponent: updateComponent =>  new Watcher() => updateComponent() => render() => update() => patch()

## 其他

## 问题

1. new Vue options 如果有 el 就可以不写 $mount,如果没有就必须写，但是就算没写或者是多写了也不会报错，如果没写就不渲染。如果有 el 然后又写了一个就按照 el 挂载，不执行后面的 $mount ? 为什么会这样呢？？
2. patch 要看一下的
3. 没有编译器，el 和 template 都不能写？试一下
