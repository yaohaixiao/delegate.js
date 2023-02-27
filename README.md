# delegate.js

[![npm version](https://img.shields.io/npm/v/@yaohaixiao/delegate.js)](https://www.npmjs.com/package/@yaohaixiao/delegate.js)
[![npm downloads](https://img.shields.io/npm/dm/@yaohaixiao/delegate.js)](https://npmcharts.com/compare/@yaohaixiao/delegate.js?minimal=true)
[![MIT License](https://img.shields.io/github/license/yaohaixiao/delegate.js.svg)](https://github.com/yaohaixiao/delegate.js/blob/master/LICENSE)

delegate.js 是一个轻量级的 JavaScript 事件委托库。delegate.js 中封装了：on()、once()、off() 等事件侦听相关的常用方法。delegate.js 的 API 借鉴了 jQuery 的链式调用模式，使得 delegate.js 的 API 使用起来非常灵活和方便。

## 特点

- 支持 UMD 规范；
- 原生 JavaScript 编写，无任何依赖；
- 采用 jQuery 链式调用语法，调用语法简洁方便；
- 文件体积小，加载速度快；

## 安装说明

delegate.js 支持 AMD 和 CommonJS 规范的模块调用方式，可以直接使用 npm 安装，也可以使用 script 标签引入到页面。

### npm 安装

```sh
npm i -S @yaohaixiao/delegate.js
```

### CDN 调用 JS 文件

```js
&lt;script src="https://cdn.jsdelivr.net/gh/yaohaixiao/delegate.js/dist/delegate.min.js"&gt;&lt;/script&gt;
```

### 本地调用 JS 文件

```js
&lt;script src="/path/to/delegate.min.js"&gt;&lt;/script&gt;
```

## API 文档

delegate.js 中封装了：on()、once()、off() 等事件侦听相关的常用方法。delegate.js 的 API 借鉴了 jQuery 的链式调用模式，掉起来非常方便。

## Options

### el
Type: `HTMLElement|String`

Default: ``

必须，要添加事件代理的 DOM 元素或者 DOM 元素的选择器。

```js
// 使用 DOM 节点选择器
delegate('#list')

// 使用 DOM 节点
const $list = document.getElementById('list')

delegate($list)
```

## Properties

### $el
Type: `HTMLElement`

Default: ``

添加事件代理的 DOM 元素。

```js
// 使用 DOM 节点选择器
const $emitter = delegate('#list')

$emitter.$el // => 获取到 list 列表 DOM 元素
```

## methods

### getListeners(type)

#### Description

获取 DOM 元素（$el）全部或者指定 type 类型的事件处理器相关的（数组）数据。

#### Parameters

##### type

Type: `String`

Default: ``

（可选）设置 type 时获取特定的事件类型（type），默认获取所有类型的事件处理器。

#### Returns

Type: `Array`

Default: `[]`

返回全部或者指定 type 类型的事件处理器相关的（数组）数据。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  const $textarea = document.querySelector('#log-textarea')

  $textarea.value += `你点击的 li 节点的 id 为 ${$li.id}\r`
}

const $emitter = delegate('#list')

// 绑定事件
$emitter.on('li', 'click', handler)

// 获取已绑定的所有类型的事件处理器
$emitter.getListeners()

// 获取所有 click 事件处理器
$emitter.getListeners('click')
// => {
// el,
// selector,
// type,
// fn,
// data,
// context,
// capture
// }
```

### purge(type, recurse)

#### Description

清除 DOM 元素（$el）全部或者指定 type 类型的事件处理器。

#### Parameters

##### type

Type: `String`

Default: ``

（可选）设置 type 时清除特定的事件类型（type）的事件处理器，默认清除所有类型的事件处理器。

##### recurse

Type: `Boolean`

Default: `false`

（可选）是否递归清理 DOM 元素下所有子节点绑定的事件处理器，默认值：false - 仅清理当前 DOM 元素的事件处理器，true - 同事递归清理 DOM 元素下所有子节点绑定的事件处理器。


#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  const $textarea = document.querySelector('#log-textarea')

  $textarea.value += `你点击的 li 节点的 id 为 ${$li.id}\r`
}

const $emitter = delegate('#list')

// 绑定事件
$emitter.on('li', 'click', handler)

// 获取已绑定的所有类型的事件处理器
$emitter.getListeners()

// 获取所有 click 事件处理器
$emitter.getListeners('click')
// => {
// el,
// selector,
// type,
// fn,
// data,
// context,
// capture
// }

// 清除绑定的所有 click 事件处理器
$emitter.purge('click')

// 仅清除 $el 元素绑定的所有类型事件处理器
$emitter.purge('click')

// 清除 $el 元素以及其子节点绑定的所有类型事件处理器
$emitter.purge('click', true)
```

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
