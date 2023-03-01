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

```html
<script src="https://cdn.jsdelivr.net/gh/yaohaixiao/delegate.js/dist/delegate.min.js"></script>
```

### 本地调用 JS 文件

```html
<script src="/path/to/delegate.min.js"></script>
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

### on(selector, type, fn, data, context, once = false, capture = false)

#### Description

on() 方法用来绑定事件代理处理器。

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

const $emitter = delegate('.list')

// 类选择器
$emitter.on('.item', 'click', handler)

// 标签选择择器
$emitter.on('li', 'click', handler)

// 子类选择器
$emitter.on('li > span', 'click', handler)
```

##### type

Type: `String`

Default: ``

（必须）type 用以设置触发的事件类型。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

```js
const handler = function(evt, data) {
  console.log('data', data)
  // => { user: 'Robert' }
}

// 使用 DOM 节点选择器
const $emitter = delegate('#list')

$emitter.on('li', 'click', handler, { user: 'Robert' })
```

##### context

Type: `Object|Boolean`

Default: ``

（可选）context 指定事件处理器回调函数的 this 的指定上下文，默认指向 $el。可以指向其他 this 上下文，也可以设置为 true，此时为事件处理器的 this 上下文指向 data 对象。

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

const $emitter = delegate('#list')

// once 属性为 true，点击事件处理器仅触发一次
$emitter.on('.item', 'click', handler, true)

// 默认每次点击都会触发执行点击事件处理器
$emitter.on('.item', 'click', handler)
```

##### capture

Type: `Boolean`

Default: `false`

（可选）capture 指定采用的事件流模型：false - 冒泡（默认值），true - 捕获。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

const $emitter = delegate('#list')

// 默认使用事件冒泡
$emitter.on('.item', 'click', handler)

// mouseenter 和 mouseleave 事件默认使用事件捕获
$emitter.on('.item', 'mouseenter', handler)

// 设置 capture 为 true，强制使用事件捕获事件流模型
$emitter.on('.item', 'click', handler, null, null, false, true)
```

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

### once(selector, type, fn, data, context, capture = false)

#### Description

once() 方法用来绑定事件代理处理器，仅触发一次。

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

const $emitter = delegate('.list')

// 类选择器
$emitter.once('.item', 'click', handler)

// 标签选择择器
$emitter.once('li', 'click', handler)

// 子类选择器
$emitter.once('li > span', 'click', handler)
```

##### type

Type: `String`

Default: ``

（必须）type 用以设置触发的事件类型。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

```js
const handler = function(evt, data) {
  console.log('data', data)
  // => { user: 'Robert' }
}

// 使用 DOM 节点选择器
const $emitter = delegate('#list')

$emitter.once('li', 'click', handler, { user: 'Robert' })
```

##### context

Type: `Object|Boolean`

Default: ``

（可选）context 指定事件处理器回调函数的 this 的指定上下文，默认指向 $el。可以指向其他 this 上下文，也可以设置为 true，此时为事件处理器的 this 上下文指向 data 对象。


##### capture

Type: `Boolean`

Default: `false`

（可选）capture 指定采用的事件流模型：false - 冒泡（默认值），true - 捕获。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

const $emitter = delegate('#list')

// 默认使用事件冒泡
$emitter.once('.item', 'click', handler)

// mouseenter 和 mouseleave 事件默认使用事件捕获
$emitter.once('.item', 'mouseenter', handler)

// 设置 capture 为 true，强制使用事件捕获事件流模型
$emitter.once('.item', 'click', handler, null, null, false, true)
```

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。


### off(type, fn, capture = false)

#### Description

off() 方法用来接触绑定的事件代理处理器。

#### Parameters

##### type

Type: `String`

Default: ``

（可选）type 指定需要接触绑定的事件类型，不指定则解绑 $el 上绑定的所有事件处理器。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

const callback = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你双击的 li 节点的 id 为 ${$li.id}`)
}

const fn = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你鼠标划过的 li 节点的 id 为 ${$li.id}`)
}

const $emitter = delegate('#list')

// 绑定了
$emitter.on('.item', 'click', handler)
$emitter.on('.item', 'click', fn)
$emitter.on('.item', 'dbclick', callback)
$emitter.on('.item', 'mouserenter', fn)

// 解除 click 事件绑定的 handler 事件处理器
$emitter.off($list, 'click', callback)

// 解除 #list 绑定的所有事件处理器
$emitter.off($list)
```

##### fn

Type: `Function`

Default: ``

（可选）fn 指定需要接触绑定的事件处理器回调函数，如果不指定则接触 $el 绑定的所有指定 type 的事件处理器。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你点击的 li 节点的 id 为 ${$li.id}`)
}

const callback = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你双击的 li 节点的 id 为 ${$li.id}`)
}

const fn = function(evt) {
  const $li = evt.delegateTarget
  console.log(`你鼠标划过的 li 节点的 id 为 ${$li.id}`)
}

const $emitter = delegate('#list')

// 绑定了
$emitter.on('.item', 'click', handler)
$emitter.on('.item', 'click', fn)
$emitter.on('.item', 'click', callback)

// 解除 click 事件绑定的 handler 事件处理器
$emitter.off($list, 'click', callback)

// 解除所有 click 事件处理器
$emitter.off($list, 'click')
```

##### capture

Type: `Boolean`

Default: `false`

（可选）capture 事件流模型。


#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

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
// => [{
//  el,
//  selector,
//  type,
//  fn,
//  data,
//  context,
//  capture
// }]
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
// => [{
// el,
// selector,
// type,
// fn,
// data,
// context,
// capture
// }]

// 清除绑定的所有 click 事件处理器
$emitter.purge('click')

// 仅清除 $el 元素绑定的所有类型事件处理器
$emitter.purge('click')

// 清除 $el 元素以及其子节点绑定的所有类型事件处理器
$emitter.purge('click', true)
```

### destroy()

#### Description

解除 DOM 元素（$el）全部包括子元素的所有事件处理器。


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

// 解除所有绑定事件
$emitter.destroy()
// => 点击 li 元素将不会执行 handler 事件处理器
```

### preventDefault(evt)

#### Description

阻止触发绑定事件 DOM 元素的默认行为。

#### Parameters

##### type

Type: `Event`

Default: ``

（必须）事件对象。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```html
<ul id="list" class="list">
  <li class="item">
    <a href="/home" class="nav">Home</a>
  </li>
  <li class="item">
    <a href="/support" class="nav">Support</a>
  </li>
  <li class="item">
    <a href="/faqs" class="nav">FAQs</a>
  </li>
</ul>
```

```js
const handler = function(evt) {
  const $link = evt.delegateTarget
  const $textarea = document.querySelector('#log-textarea')

  // preventDefault() 方法会阻止点击链接后默认跳转页面的行为发生
  $emitter.preventDefault(evt)

  $textarea.value += `你点击了导航菜单 ${$link.innerHTML},但它不会跳转到${$link.href}页面\r`
}

const $emitter = delegate('#list')

// 点击导航菜单，不会跳转页面
$emitter.on('a.nav', 'click', handler)
// => 点击 li 元素将不会执行 handler 事件处理器
```

### stopPropagation(evt)

#### Description

终止事件在传播过程的捕获或冒泡的事件流。

#### Parameters

##### type

Type: `Event`

Default: ``

（必须）事件对象。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```html
<ul id="list" class="list">
  <li class="item" id="item-home">
    <span>Home</span>
    <span class="item-remove" data-id="home">删除</a>
  </li>
  <li class="item" id="item-support">
    <span>Support</span>
    <span class="item-remove" data-id="support">删除</a>
  </li>
  <li class="item" id="item-faqs">
    <span>FAQs</span>
    <span class="item-remove" data-id="faqs">删除</a>
  </li>
</ul>
```

```js
const $emitter = delegate('#list')
const removeItem = function (evt) {
  const $removeButton = evt.delegateTarget
  const id = parseInt($removeButton.getAttribute('data-id'), 10)
  const $textarea = document.querySelector('#log-textarea')

  // 阻止事件冒泡，不触发执行 showLog() 回调函数
  $emitter.stopPropagation(evt)

  // ...省略删除的逻辑

  $textarea.value += `你删除的 li 节点的 id 为 item-${id}\r`
}
const showLog = function (evt) {
  const $li = evt.delegateTarget
  const $textarea = document.querySelector('#log-textarea')

  $textarea.value += `你点击的 li 节点的 id 为 ${$li.id}\r`
}

// 点击删除，只会删除点击行，但不会触发事件冒泡，触发点击 .item 的事件处理函数执行
$emitter.on('.item-remove', 'click', removeItem)
$emitter.on('.item', 'click', showLog)
```

### stopEvent(evt)

#### Description

停止事件（阻止默认行为和阻止事件的捕获或冒泡）。

#### Parameters

##### type

Type: `Event`

Default: ``

（必须）事件对象。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```html
<ul id="list" class="list">
  <li class="item" id="item-home">
    <span>Home</span>
    <a href="/sitemap#home" class="item-remove" data-id="home">删除</a>
  </li>
  <li class="item" id="item-support">
    <span>Support</span>
    <a href="/sitemap#support" class="item-remove" data-id="support">删除</a>
  </li>
  <li class="item" id="item-faqs">
    <span>FAQs</span>
    <a href="/sitemap#support" class="item-remove" data-id="faqs">删除</a>
  </li>
</ul>
```

```js
const $emitter = delegate('#list')
const removeItem = function (evt) {
  const $removeButton = evt.delegateTarget
  const id = parseInt($removeButton.getAttribute('data-id'), 10)
  const $textarea = document.querySelector('#log-textarea')

  // 阻止事件冒泡，不触发执行 showLog() 回调函数
  // 同时阻止点击链接跳转到 /sitemap 页面
  $emitter.stopEvent(evt)

  // ...省略删除的逻辑

  $textarea.value += `你删除的 li 节点的 id 为 item-${id}\r`
}
const showLog = function (evt) {
  const $li = evt.delegateTarget
  const $textarea = document.querySelector('#log-textarea')

  $textarea.value += `你点击的 li 节点的 id 为 ${$li.id}\r`
}

// 点击删除，只会删除行，不会跳转页面，也不会触发事件冒泡，触发执行 showLog() 回调函数
$emitter.on('.item-remove', 'click', removeItem)
$emitter.on('.item', 'click', showLog)
```

## Example

https://yaohaixiao.github.io/delegate.js/

## License

Licensed under MIT License.
