# delegate.js

[![npm version](https://img.shields.io/npm/v/@yaohaixiao/delegate.js)](https://www.npmjs.com/package/@yaohaixiao/delegate.js)
[![npm downloads](https://img.shields.io/npm/dm/@yaohaixiao/delegate.js)](https://npmcharts.com/compare/@yaohaixiao/delegate.js?minimal=true)
[![MIT License](https://img.shields.io/github/license/yaohaixiao/delegate.js.svg)](https://github.com/yaohaixiao/delegate.js/blob/master/LICENSE)

delegate.js 是一个轻量级的 JavaScript 事件委托库。delegate.js 中封装了：on()、once()、off() 等事件侦听相关的常用方法。delegate.js 库代码采用最新的ES6的语法，所以不支持IE，其他主流的浏览器都可以正常使用。并且 delegate.js 的 API 借鉴了 jQuery 的链式调用模式，使得 delegate.js 的 API 使用起来非常灵活和方便。

## Install

delegate.js 支持 AMD 和 CommonJS 规范的模块调用方式，可以直接使用 npm 安装，也可以使用 script 标签引入到页面。

### npm install

```sh
npm i -S @yaohaixiao/delegate.js
```

### script

```html
<script src="/path/to/delegate.js"></script>
```

## Usage

### 基本用法 - 事件冒泡

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

// 默认使用事件冒泡
delegate('#list').on('.item', 'click', handler)
```

### 基本用法 - 事件捕获

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

// 默认使用事件捕获
delegate('#list').on('.item', 'mouseenter', handler)
```

### 强制使用事件捕获

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

// 默认使用事件冒泡
delegate('#list').on('.item', 'click', handler, true)
```

### 使用不同类型的选择器

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

// 类选择器
delegate('.list').on('.item', 'click', handler)

// 标签选择择器
delegate('ul').on('li', 'click', handler)

// 以数组/类似数组的元素为基础
delegate('#list').on(document.querySelectorAll('.item'), 'click', handler)
```

### 事件只触发一次

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

// 设置 delegate.on() 方法的 once 属性为 true
delegate('#list').on('.item', 'click', handler, true)

// 使用 once 方法只触发一次
delegate('#list').once('.item', 'click', handler)
```

### 取消事件委托

```js
const $list = document.querySelector('#list')
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

// 使用 off() 方法取消事件委托
delegate('#list').on('.item', 'click', handler)
                 .off($list, 'click', callback)

// 使用 destroy() 方法取消事件委托
delegate('#list').on('.item', 'click', handler)
                 .destroy()
```

## Example

https://yaohaixiao.github.io/delegate.js/

## License

Licensed under MIT License.
