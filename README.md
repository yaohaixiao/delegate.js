# delegate.js

[![npm version](https://img.shields.io/npm/v/@yaohaixiao/delegate.js)](https://www.npmjs.com/package/@yaohaixiao/delegate.js)
[![Github file size](https://img.shields.io/github/size/yaohaixiao/delegate.js/delegate.min.js.svg)](https://github.com/yaohaixiao/delegate.js/blob/master/delegate.min.js)
[![prettier code style](https://img.shields.io/badge/code_style-prettier-07b759.svg)](https://prettier.io)
[![Coverage](https://codecov.io/gh/yaohaixiao/delegate.js/branch/main/graph/badge.svg)](https://codecov.io/gh/yaohaixiao/delegate.js)
[![npm downloads](https://img.shields.io/npm/dm/@yaohaixiao/delegate.js)](https://npmcharts.com/compare/@yaohaixiao/delegate.js?minimal=true)
[![MIT License](https://img.shields.io/github/license/yaohaixiao/delegate.js.svg)](https://github.com/yaohaixiao/delegate.js/blob/master/LICENSE)

delegate.js 是一个轻量级的 JavaScript 事件委托库。delegate.js 中封装了：on()、once()、off() 等事件侦听相关的常用方法。delegate.js 的 API 借鉴了 jQuery 的链式调用模式，使得 delegate.js 的 API 使用起来非常灵活和方便。

## 项目初衷

编写 delegate.js 的主要是为初学 JavaScript 的朋友了解事件委托的实现机制而开发。当然，delegate.js 也可以应用到实际的产品开发中。

## 特点

- 支持 UMD 规范，同时也提供 ES6 模块调用；
- 支持创建和绑定自定义事件，并且可以手动触发自定义事件；
- 原生 JavaScript 编写，无任何依赖；
- 采用 jQuery 链式调用语法，调用语法简洁方便；
- 文件体积小(Gzip：3KB)，加载速度快；

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](https://github.com/yaohaixiao/delegate.js/)</br>Opera |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| IE11, Edge                                                                                                                                                                                               | last 10 versions                                                                                                                                                                                           | last 10 versions                                                                                                                                                                                       | last 10 versions                                                                                                                                                                                       | last 10 versions                                                                                                                                                                                   |

## 安装说明

delegate.js 支持 AMD 和 CommonJS 规范的模块调用方式，可以直接使用 npm 安装，也可以使用 script 标签引入到页面。

### npm 安装

```sh
# install from npmjs.com
npm i -S @yaohaixiao/delegate.js

# install from github.com
npm i -S @yaohaixiao/delegate.js@1.1.0 --registry=https://npm.pkg.github.com
```

### 浏览器中调用

在浏览器中调用 delegate.js，可以选择调用 jsdelivr 提供的 CDN 服务中的文件，也可以使用本地的 delegate.js 文件。

#### CDN 调用 JS 文件

```html
<script src="https://cdn.jsdelivr.net/gh/yaohaixiao/delegate.js/delegate.min.js"></script>
```

#### 本地调用 JS 文件

```html
<script src="/path/to/delegate.min.js"></script>
```

### Node.js 中调用

```js
const delegate = require('@yaohaixiao/delegate.js')
```

### ES6 模块中调用

```js
// 调用 delegate 实例对象
import delegate from '@yaohaixiao/esm/delegate'

// 调用 Emitter 构造函数
import Emitter from '@yaohaixiao/delegate.js/esm/Emitter'

// 调用单个（on/once/off）方法
import on from '@yaohaixiao/delegate.js/esm/on'
import once from '@yaohaixiao/delegate.js/esm/once'
import off from '@yaohaixiao/delegate.js/esm/off'
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

delegate.js 体积虽然小（Gzip 压缩后仅 3KB），却提供了十分丰富的事件代理相关的操作方法：

### on(selector, type, fn, data, context, once = false)

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

（可选）事件处理器回调函数的 this 上下文指向：

- 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象；
- 如未指定 context，则事件处理器回调函数的 this 上下文指向为 Emitter 对象；

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

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

### once(selector, type, fn, data, context)

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

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；


#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

### off(type, fn)

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

### click(selector, fn, data, context, once = false)

#### Description

绑定 click 代理事件，其调用方法和 on() 类似。

#### Since

1.4.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 click 代理事件
$emitter.click('.item', handler)
```

### dbclick(selector, fn, data, context, once = false)

#### Description

绑定 dbclick 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 click 代理事件
$emitter.dbclick('.item', handler)
```

### mouseenter(selector, fn, data, context, once = false)

#### Description

绑定 mouseenter 代理事件。

#### Since

1.4.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.relatedTarget
  console.log(`当前事件的 relatedTarget 是：${$target}`)
}

const $emitter = delegate('#list')

// 类选择器
$emitter.mouseenter('.item', handler)
```

### mouseleave(selector, fn, data, context, once = false)

#### Description

绑定 mouseleave 代理事件。

#### Since

1.4.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.relatedTarget
  console.log(`当前事件的 relatedTarget 是：${$target}`)
}

const $emitter = delegate('#list')

// 类选择器
$emitter.mouseleave('.item', handler)
```

### mousedown(selector, fn, data, context, once = false)

#### Description

绑定 mousedown 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 mousedown 代理事件
$emitter.mousedown('.item', handler)
```

### mouseup(selector, fn, data, context, once = false)

#### Description

绑定 mouseup 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 mouseup 代理事件
$emitter.mouseup('.item', handler)
```

### mouseover(selector, fn, data, context, once = false)

#### Description

绑定 mouseover 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 mouseover 代理事件
$emitter.mouseover('.item', handler)
```

### mousemove(selector, fn, data, context, once = false)

#### Description

绑定 mousemove 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 mousemove 代理事件
$emitter.mousemove('.item', handler)
```

### mouseout(selector, fn, data, context, once = false)

#### Description

绑定 mouseout 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 mouseout 代理事件
$emitter.mouseout('.item', handler)
```

### drag(selector, fn, data, context, once = false)

#### Description

绑定 drag 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 drag 代理事件
$emitter.drag('.item', handler)
```

### dragend(selector, fn, data, context, once = false)

#### Description

绑定 dragend 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 dragend 代理事件
$emitter.dragend('.item', handler)
```

### dragenter(selector, fn, data, context, once = false)

#### Description

绑定 dragenter 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 dragenter 代理事件
$emitter.dragenter('.item', handler)
```

### dragleave(selector, fn, data, context, once = false)

#### Description

绑定 dragleave 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 dragleave 代理事件
$emitter.dragleave('.item', handler)
```

### dragover(selector, fn, data, context, once = false)

#### Description

绑定 dragover 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 dragover 代理事件
$emitter.dragover('.item', handler)
```

### dragstart(selector, fn, data, context, once = false)

#### Description

绑定 dragstart 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 dragstart 代理事件
$emitter.dragstart('.item', handler)
```

### drop(selector, fn, data, context, once = false)

#### Description

绑定 drop 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 drop 代理事件
$emitter.drop('.item', handler)
```

### wheel(selector, fn, data, context, once = false)

#### Description

绑定 wheel 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 wheel 代理事件
$emitter.wheel('.item', handler)
```

### contextmenu(selector, fn, data, context, once = false)

#### Description

绑定 contextmenu 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 contextmenu 代理事件
$emitter.contextmenu('.item', handler)
```

### focusin(selector, fn, data, context, once = false)

#### Description

focusin() 方法用来绑定 focusin（IE） 或者 focus（其它） 代理事件处理器，调用方法和 on() 一致。并且会根据浏览器自动添加事件类型。具体调用方法请参考 on() 方法。

#### Since

1.4.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $input = evt.delegateTarget
  console.log(`输入框当前值为：${$input.value}`)
}

const $emitter = delegate('.el-input')

// 类选择器
$emitter.focusin('.el-input__inner', handler)
```

### focusout(selector, fn, data, context, once = false)

#### Description

focusout() 方法用来绑定 focusout（IE） 或者 blur（其它） 代理事件处理器，调用方法和 on() 一致。并且会根据浏览器自动添加事件类型。具体调用方法请参考 on() 方法。

#### Since

1.4.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $input = evt.delegateTarget
  console.log(`输入框当前值为：${$input.value}`)
}

const $emitter = delegate('.el-input')

// 类选择器
$emitter.focusout('.el-input__inner', handler)
```

### change(selector, fn, data, context, once = false)

#### Description

绑定 change 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#form')

// 绑定 change 代理事件
$emitter.change('.input', handler)
```

### input(selector, fn, data, context, once = false)

#### Description

绑定 input 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#form')

// 绑定 input 代理事件
$emitter.input('.input', handler)
```

### compositionstart(selector, fn, data, context, once = false)

#### Description

绑定 compositionstart 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#form')

// 绑定 compositionstart 代理事件
$emitter.compositionstart('.input', handler)
```

### compositionupdate(selector, fn, data, context, once = false)

#### Description

绑定 compositionupdate 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#form')

// 绑定 contextmenu 代理事件
$emitter.compositionupdate('.input', handler)
```

### compositionend(selector, fn, data, context, once = false)

#### Description

绑定 compositionend 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#form')

// 绑定 contextmenu 代理事件
$emitter.contextmenu('.input', handler)
```

### paste(selector, fn, data, context, once = false)

#### Description

绑定 paste 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#form')

// 绑定 paste 代理事件
$emitter.paste('.input', handler)
```

### copy(selector, fn, data, context, once = false)

#### Description

绑定 copy 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#list')

// 绑定 copy 代理事件
$emitter.copy('.item', handler)
```

### cut(selector, fn, data, context, once = false)

#### Description

绑定 cut 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#form')

// 绑定 contextmenu 代理事件
$emitter.cut('.textarea', handler)
```

### keydown(selector, fn, data, context, once = false)

#### Description

绑定 keydown 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#form')

// 绑定 keydown 代理事件
$emitter.keydown('.input', handler)
```

### keyup(selector, fn, data, context, once = false)

#### Description

绑定 keyup 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#form')

// 绑定 keyup 代理事件
$emitter.keyup('.input', handler)
```

### error(selector, fn, data, context, once = false)

#### Description

绑定 error 代理事件。

#### Since

1.7.0

#### Parameters

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。

##### fn

Type: `Function`

Default: ``

（必须）fn 为事件处理器回调函数。

##### data

Type: `Object`

Default: ``

（可选）给事件处理器回调函数传递的数据。

##### context

Type: `Object|Boolean`

Default: ``

（可选）事件处理器回调函数的 this 上下文指向，具体介绍请参考 on() 方法的 context 参数说明；

##### once

Type: `Boolean`

Default: `false`

（可选）once 指定事件处理器回调函数是否仅执行一次。

#### Returns

Type: `Emitter`

返回 Emitter 对象（实例）。

```js
const handler = function(evt) {
  const $target = evt.delegateTarget
  console.log(`触发事件的 delegateTarget DOM 元素的 id 是：${$target.id}`)
}

const $emitter = delegate('#albums')

// 绑定 error 代理事件
$emitter.error('.image', handler)
```

### createEvent(type, detail = null, bubbles = true, cancelable = true)

#### Description

创建自定义事件（CustomerEvent）。

#### Since

1.8.0

#### Parameters

##### type

Type: `String`

Default: ``

（必须）事件类型（名称）。

##### detail

Type: `Object`

Default: `null`

（可选）传递给自定义事件的数据，默认为 null。

##### bubbles

Type: `Boolean`

Default: `true`

（可选）是否支持冒泡，默认为 true。

##### cancelable

Type: `Boolean`

Default: `true`

（可选）是否可以取消，默认为 true。

#### Returns

Type: `CustomerEvent`

CustomerEvent 实例。

```html
<div id="nav" class="nav">
  <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>
  <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>
</div>
```

```js
const $nav = document.querySelector('#nav')
const $service = document.querySelector('#serivce')
const $emitter = delegate($nav)
const logEvent = $emitter.createEvent('log', {
  name: 'Yao',
  hi() {
    console.log('hi！！！')
  }
})

const logHandler = function(evt) {
  console.log('detail', evt.detail)
  console.log('type', evt.type)
}

// 或者
$service.dispatchEvent(logEvent)
```

### trigger(type, selector)

#### Description

trigger() 方法用作手动触（自定义）事件。 trigger() 方法也可以用来手动触发内置的事件，例如 click, mouseenter 等事件，不过通常使用 trigger() 来手动触发用户自定义事件。

另外，选择器 selector 的匹配使用 document.querySelector() 方法，因此仅事件触发一次。

#### Since

1.6.0

#### Parameters

##### type

Type: `String`

Default: ``

（必须）事件类型。

##### selector

Type: `String`

Default: ``

（必须）通过 selector 选择器判定是否触发指定事件类型的事件处理器。


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
const $list = document.querySelector('#list')
const $emitter = delegate($list)
const itemHandler = function(evt) {
  // 其它逻辑
  console.log(evt.type + ':' + evt.delegateTarget)
}

const navHandler = function(evt) {
  // 其它逻辑
  $emitter.stopEvent(evt)
  console.log(evt.type + ':' + evt.delegateTarget)
}

// 绑定 alert 自定义事件
$emitter.on('.item', 'alert', itemHandler)
$emitter.on('.nav', 'log', navHandler)

// 触发 $list 下匹配 '.item' 元素手动触发 alert 自定义事件
$emitter.trigger('alert', '.item')
// 可以使用伪类选择器，更精确的匹配元素
$emitter.trigger('alert', '.item:last-child')

// 触发 $list 下匹配 '.remove' 元素手动触发 alert 自定义事件
$emitter.trigger('alert', '.nav')
$emitter.trigger('alert', '.nav:nth-child(1)')
```

### purge(type, recurse)

#### Description

清除 DOM 元素（$el）全部或者指定 type 类型的事件处理器。

#### Parameters

##### type

Type: `String`

Default: ``

（必须）设置 type 时清除特定的事件类型（type）的事件处理器。

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

// 清除 $el 元素所有 click 事件处理器
// 同时也清除其子节点绑定的所有类型事件处理器
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
  const id = $removeButton.getAttribute('data-id')
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

### stopImmediate(evt)

#### Description

阻止监听同一事件的其他事件监听器被调用，并且阻止默认行为和事件冒泡。

#### Since

1.8.0

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
let logged = false
let styled = false
const $list = document.querySelector('#list')
const $support = document.querySelector('#item-support')
const $link = document.querySelector('a[data-id="support"]')
const $emitter = delegate($support)
const logHandler = function(evt) {
  logged = true
  console.log(evt.target)
}
const styleHandler = function(evt) {
  styled = true
  $list.classList.add('checked')
}
const serviceHandler = function(evt) {
  alert(evt.target)
  $emitter.stopImmediate(evt)
}
const removeHandler = function(evt) {
  const $target = evt.target

  $target.parentNode.removeChild($target)
}

$list.addEventListener('click', logHandler)
$list.addEventListener('click', styleHandler)

$emitter.on('.remove', 'click', serviceHandler)
$emitter.on('.remove', 'click', removeHandler)

// 不会触发 removeHandler，不会删除一行
// 不会冒泡触发父节点 $list 上绑定的 click 事件
trigger('click', '.remove')
// -> logged = false
// -> styled = false
// document.querySelectorAll('.item').length = 3
```

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

返回已绑定的事件类型的数组（去除名称重复的事件）。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  const $textarea = document.querySelector('#log-textarea')

  $textarea.value += `你点击的 li 节点的 id 为 ${$li.id}\r`
}

const $emitter = delegate('#list')

// 绑定事件
$emitter.click('li', handler)

// 获取已绑定的所有类型的事件处理器
$emitter.getListeners('click')
// => [
//   {
//     el,
//     selector,
//     type,
//     fn,
//     data,
//     context,
//     capture
//   }
// ]
```

### getTypes()

#### Description

返回已绑定的事件类型的数组（去除名称重复的事件）。

#### Since

1.5.0

#### Returns

Type: `Boolean`

Default: ``

返回已绑定事件类型的数组。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  const $textarea = document.querySelector('#log-textarea')

  $textarea.value += `你点击的 li 节点的 id 为 ${$li.id}\r`
}

const $emitter = delegate('#list')

// 绑定事件
$emitter.on('item', 'click', handler)
$emitter.click('.remove', handler)
$emitter.mouseenter('.item', handler)

const types = $emitter.getTypes()

console.log(type)
// 会去除重复的 click 事件
// => ['click', 'mouseenter']
```

### hasEvent(type)

#### Description

判断是否已经（指定类型的）绑定事件。

#### Since

1.4.0

#### Parameters

##### type

Type: `String`

Default: ``

（可选）事件名称:

- 指定 type，则判断是否绑定 type 类型事件；
- 未指定 type，则判断是否绑定任意类型的事件；

#### Returns

Type: `Boolean`

Default: ``

返回是否绑定（type类型的）事件处理器。

```js
const handler = function(evt) {
  const $li = evt.delegateTarget
  const $textarea = document.querySelector('#log-textarea')

  $textarea.value += `你点击的 li 节点的 id 为 ${$li.id}\r`
}

const $emitter = delegate('#list')

// 绑定事件
$emitter.on('li', 'click', handler)

$emitter.hasEvent()
// -> true

$emitter.hasEvent('focus')
// => false
```

### getPageX(evt)

#### Description

获取事件触发时的 pageX 值。

#### Parameters

##### type

Type: `Event`

Default: ``

（必须）事件对象。

#### Returns

Type: `Number`

返回事件触发时的 pageX 值。

```js
const $emitter = delegate('#list')
const showLog = function (evt) {
  const pageX = $emitter.getPageX(evt)

  console.log(`pageX 为：${pageX}`)
}

$emitter.on('.item', 'click', showLog)
```

### getPageY(evt)

#### Description

获取事件触发时的 pageY 值。

#### Parameters

##### type

Type: `Event`

Default: ``

（必须）事件对象。

#### Returns

Type: `Number`

返回事件触发时的 pageY 值。

```js
const $emitter = delegate('#list')
const showLog = function (evt) {
  const pageY = $emitter.getPageY(evt)

  console.log(`pageY 为：${pageY}`)
}

$emitter.on('.item', 'click', showLog)
```

### getPageXY(evt)

#### Description

获取事件触发时的 pageX 和 pageY 数组数据。

#### Parameters

##### type

Type: `Event`

Default: ``

（必须）事件对象。

#### Returns

Type: `Array`

返回事件触发时的数组数据：[pageX, pageY]。

```js
const $emitter = delegate('#list')
const showLog = function (evt) {
  const pageXY = $emitter.getPageXY(evt)

  console.log(`pageX 为：${pageXY[0]}`)
  console.log(`pageY 为：${pageXY[1]}`)
}

$emitter.on('.item', 'click', showLog)
```

### getCharCode(evt)

#### Description

返回触发事件的 charCode。

#### Parameters

##### type

Type: `Event`

Default: ``

（必须）事件对象。

#### Returns

Type: `Number`

返回事件的 charCode。

```html
<form id="form" name="form" class="form">
  <div class="field">
    <label for="user">用户名：</label>
    <input id="user" name="user" type="text" class="input" />
  </div>
  <div class="field">
    <label for="password">密 码：</label>
    <input id="password" name="password" type="password" class="input" />
  </div>
</form>
```

```js
const $emitter = delegate('#form')
const showLog = function (evt) {
  const charCode = $emitter.getCharCode(evt)

  console.log(`当前按键的 charCode 为：${charCode}`)
}

$emitter.on('.input', 'keydown', showLog)
```

### getRelatedTarget(evt)

#### Description

返回触发事件的 relatedTarget DOM 元素。

说明：MouseEvent.relatedTarget 只读属性是鼠标事件的次要目标（如果有）。

相关的鼠标事件有：
- mouseenter
- mouseleave
- mouseover
- mouseout
- dragenter
- dragleave

#### Since

1.1.0

#### Parameters

##### type

Type: `Event`

Default: ``

（必须）事件对象。

#### Returns

Type: `HTMLElement`

Event 对象的 relatedTarget DOM 元素。

```html
<ul id="list" class="list">
  <li class="item" id="item-home">
    <span>Home</span>
    <a href="/sitemap#home" class="remove" data-id="home">删除</a>
  </li>
  <li class="item" id="item-support">
    <span>Support</span>
    <a href="/sitemap#support" class="remove" data-id="support">删除</a>
  </li>
  <li class="item" id="item-faqs">
    <span>FAQs</span>
    <a href="/sitemap#support" class="remove" data-id="faqs">删除</a>
  </li>
</ul>
```

```js
const $emitter = delegate('#list')
const showLog = function (evt) {
  const relatedTarget = $emitter.getRelatedTarget(evt)

  console.log(`当前触发事件的 relatedTarget 为：${relatedTarget}`)
}

$emitter.on('.remove', 'mouseenter', showLog)
```

### getTarget(evt)

#### Description

返回触发事件的 target DOM 元素。

#### Since

1.1.0

#### Parameters

##### type

Type: `Event`

Default: ``

（必须）事件对象。

#### Returns

Type: `HTMLElement`

Event 对象的 target DOM 元素。

```html
<ul id="list" class="list">
  <li class="item" id="item-home">
    <span>Home</span>
    <a href="/sitemap#home" class="remove" data-id="home">删除</a>
  </li>
  <li class="item" id="item-support">
    <span>Support</span>
    <a href="/sitemap#support" class="remove" data-id="support">删除</a>
  </li>
  <li class="item" id="item-faqs">
    <span>FAQs</span>
    <a href="/sitemap#support" class="remove" data-id="faqs">删除</a>
  </li>
</ul>
```

```js
const $emitter = delegate('#list')
const showLog = function (evt) {
  const target = $emitter.getTarget(evt)

  console.log(`当前触发事件的 target 为：${target}`)
}

$emitter.on('.remove', 'click', showLog)
```

## Example

https://yaohaixiao.github.io/delegate.js/

## License

Licensed under MIT License.
