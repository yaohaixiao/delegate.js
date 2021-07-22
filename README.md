# delegate.js
----

delegate.js 是一个轻量级的事件委托库，封装了：on()、once()、off()、stop() 事件侦听相关的方法，使用起来方便灵活。

## Install

delegate.js 支持 AMD 和 CommonJS 规范的模块调用方式，可以直接使用 npm 安装，也可以使用 script 标签引入到页面。

### npm install

```js
npm i -S @yaohaixiao/delegate.js
```

### script

```js
&lt;script src="/path/to/delegate.js"&gt;&lt;/script&gt;
```

## Usage

### 基本用法 - 事件冒泡

```js
import delegate from '@yaohaixiao/delegate.js'
const $list = document.querySelector('#list')

// 默认使用事件冒泡
delegate.on($list, '.item', 'click', function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
})
```

### 基本用法 - 事件捕获

```js
const $list = document.querySelector('#list')

// mouseenter 和 mouseleave 事件，默认使用事件捕获
delegate.on($list, '.item', 'mouseenter', function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
})
```

### 强制使用事件捕获

```js
const $list = document.querySelector('#list')

// 对 click 事件强制使用事件捕获
delegate.on($list, '.item', 'click', function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}, true)
```

### 使用不同的类型的选择器

```js
const $list = document.querySelector('#list')

// 类选择器
delegate.on($list, '.item', 'click', function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
})

// 标签选择择器
delegate.on($list, 'li', 'click', function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
})

// 以数组/类似数组的元素为基础
delegate.on($list, document.querySelector('.item'), 'click', function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
})
```

### 事件只触发一次 - delegate.on()

```js
const $list = document.querySelector('#list')

// 设置 delegate.on() 方法的 once 属性为 true
delegate.on($list, '.item', 'click', function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}, false, true)
```

### 事件只触发一次 - delegate.once()

```js
const $list = document.querySelector('#list')

// 使用 delegate.once() 方法
delegate.once($list, '.item', 'click', function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
})
```

### 取消事件委托

```js
const $list = document.querySelector('#list')
const callback = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

// 对 click 事件强制使用事件捕获
delegate.once($list, '.item', 'click', callback)

// 取消事件委托
delegate.off($list, 'click', callback)
```

## Example

https://yaohaixiao.github.io/delegate.js/

## License

Licensed under MIT License.
