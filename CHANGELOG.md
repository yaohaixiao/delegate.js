# [1.9.0](https://github.com/yaohaixiao/delegate.js/compare/1.8.2...1.9.0) (2023-04-11)


### Features

* 添加 delegate.js 的 core 版本，仅提供 on()\once()\off()\purge()\destroy() 5个核心方法； ([7d78da7](https://github.com/yaohaixiao/delegate.js/commit/7d78da7907b60d08e0b766fd6f9a75da8ff0e02b))



## [1.8.2](https://github.com/yaohaixiao/delegate.js/compare/1.8.1...1.8.2) (2023-03-31)


### Bug Fixes

* 修改 on() 方法中 IE11不知道吃的 Array.prototype.includes 为 indexOf；并且去掉 on() 方法中 target === delegateTarget 的判断； ([feac774](https://github.com/yaohaixiao/delegate.js/commit/feac774dd1c5827bf1c933cc303b2dcea11f3735))



## [1.8.1](https://github.com/yaohaixiao/delegate.js/compare/1.8.0...1.8.1) (2023-03-24)


### Bug Fixes

* 修复 hasEvent() 未传递 type 参数结果错误和 destroy() 方法解除绑定不完全的问题； ([78a4e0c](https://github.com/yaohaixiao/delegate.js/commit/78a4e0c31fa98e6a6b68f80de8fc35069f0661f7))



# [1.8.0](https://github.com/yaohaixiao/delegate.js/compare/1.7.0...1.8.0) (2023-03-22)


### Features

* 添加 createEvent() 和 stopImmediate() 方法，并添加 stopImmediate() 方法的单测和相应的 API 实例 ([9978d9b](https://github.com/yaohaixiao/delegate.js/commit/9978d9b9ffb4524351b887b05fa9925437e7e8d5))



# [1.7.0](https://github.com/yaohaixiao/delegate.js/compare/1.6.0...1.7.0) (2023-03-22)


### Features

* 添加常用的内置事件方法：dbclick\mousedown\mouseup\change\keydown 等； ([a5990bc](https://github.com/yaohaixiao/delegate.js/commit/a5990bc39470f4715902fa6cf9caa36b9412690b))



# [1.6.0](https://github.com/yaohaixiao/delegate.js/compare/1.5.0...1.6.0) (2023-03-21)


### Features

* 添加 trigger() 方法，并且移除 matches() 方法中废弃的方法 ([a732d70](https://github.com/yaohaixiao/delegate.js/commit/a732d7031ced39572f30480a6f750b0efd30d954))



# [1.5.0](https://github.com/yaohaixiao/delegate.js/compare/1.4.1...1.5.0) (2023-03-18)


### Features

* 添加 getTypes() 方法 ([29aa710](https://github.com/yaohaixiao/delegate.js/commit/29aa7100b668ba487ba2da3167ca6f720a5c6466))



## [1.4.1](https://github.com/yaohaixiao/delegate.js/compare/1.4.0...1.4.1) (2023-03-18)


### Bug Fixes

* 修复 destroy() 无法删除所有事件的问题 ([2efeedb](https://github.com/yaohaixiao/delegate.js/commit/2efeedbf4647b89d62fc1df1020a556d5f218e73))



# [1.4.0](https://github.com/yaohaixiao/delegate.js/compare/1.3.0...1.4.0) (2023-03-17)


### Features

* 添加 hasEvent(), click(), mouseenter() 和 mouseleave() 方法 ([7cc06f0](https://github.com/yaohaixiao/delegate.js/commit/7cc06f0044199b7ff4647dda52cfecf9c6d78846))



# [1.3.0](https://github.com/yaohaixiao/delegate.js/compare/1.2.0...1.3.0) (2023-03-16)


### Bug Fixes

* 修复 isElement() 方法检测 textNode 返回 true 的问题 ([67d2c46](https://github.com/yaohaixiao/delegate.js/commit/67d2c46c78c1ce96437194451d4309fcce7d5e64))


### Features

* 添加 focusin() 和 focusout() 方法 ([f2fd9ea](https://github.com/yaohaixiao/delegate.js/commit/f2fd9ead0340292159285342606d8ae1abc87a59))
* 移除 getTarget(), preventDefault() 和 stopPropagation() 方法中已废弃的属性和方法 ([b0b11de](https://github.com/yaohaixiao/delegate.js/commit/b0b11de6a88e4e1b7399041ca8e8c1867335d792))



# [1.1.0](https://github.com/yaohaixiao/delegate.js/compare/1.0.0...1.1.0) (2023-03-15)


### Features

* 添加 getTarget() 和 getRelatedTarget() 方法； ([e8237f1](https://github.com/yaohaixiao/delegate.js/commit/e8237f116282573bdaffe53bd8455e9117300eb7))



# [1.0.0](https://github.com/yaohaixiao/delegate.js/compare/0.8.0...1.0.0) (2023-03-14)


### Features

* 调整 off(), on(), purgeElement() 等方法，并添加主要功能函数的单测； ([cc329e5](https://github.com/yaohaixiao/delegate.js/commit/cc329e5bf378fca7b3b04c70a36bb6ffe73ab4d4))
* 完成主要功能函数的单测编写，并根据单测结果调整其中部分方法； ([2d294bb](https://github.com/yaohaixiao/delegate.js/commit/2d294bb8e04f21cd661067992406909056ad95a2))



# [0.8.0](https://github.com/yaohaixiao/delegate.js/compare/0.7.0...0.8.0) (2023-03-07)


### Features

* 添加 getCharCode() 方法 ([c4bfd99](https://github.com/yaohaixiao/delegate.js/commit/c4bfd9995172aad9eb26ab6fcdfaafa1c5d83427))



# [0.7.0](https://github.com/yaohaixiao/delegate.js/compare/0.6.1...0.7.0) (2023-03-06)


### Features

* 调整 on() 和 off() 方法，添加针对 blur, focus, load, unload 方法采用事件捕获模型； ([7ddaab7](https://github.com/yaohaixiao/delegate.js/commit/7ddaab7229d004154e6943cf598a3a55cfcdb39a))



## [0.6.1](https://github.com/yaohaixiao/delegate.js/compare/0.6.0...0.6.1) (2023-03-03)


### Bug Fixes

* 修复 once 方法传递 data 和 context 不正确的问题 ([c099fa8](https://github.com/yaohaixiao/delegate.js/commit/c099fa85bf300dbcb168b2b92ff48b76f3d83593))



# [0.6.0](https://github.com/yaohaixiao/delegate.js/compare/0.5.0...0.6.0) (2023-03-02)


### Features

* 添加 getPageX, getPageXY 和 getPageXY 方法 ([f2aa3b9](https://github.com/yaohaixiao/delegate.js/commit/f2aa3b9b806ff02abe9649a1e740bcc940641ae9))



# [0.5.0](https://github.com/yaohaixiao/delegate.js/compare/0.4.0...0.5.0) (2023-03-01)


### Features

* 添加 stopEvent, stopPropagation 和 preventDefault 3个新方法 ([0a712a7](https://github.com/yaohaixiao/delegate.js/commit/0a712a7741516d5eeb4941c1710ff783264b318f))



# [0.4.0](https://github.com/yaohaixiao/delegate.js/compare/0.3.1...0.4.0) (2023-02-28)


### Bug Fixes

* 修复 es6 代码中缺失的 import 模块 ([d703a33](https://github.com/yaohaixiao/delegate.js/commit/d703a3302d07534d1850ac049cd8b0cc88cf2eaf))
* 修复 on() 方法缓存回调函数 fn._delegateListener 错误的问题 ([126dac6](https://github.com/yaohaixiao/delegate.js/commit/126dac6033b25dd7309bb77b0369cde123d5303e))
* 修复代理事件处理器 event 对象无法 stopPropagation 和 preventDefault 的问题 ([8422521](https://github.com/yaohaixiao/delegate.js/commit/84225218afeb0177828bbafc1fbf9a4b4661ca03))


### Features

* 调整 Emitter 类，将 stopEvent 等方法调整为静态方法 ([b0eef48](https://github.com/yaohaixiao/delegate.js/commit/b0eef48aad7418b925ec52a9be0fd9253c39b4b0))
* 调整代码，添加新的方法 purge 和 getListeners 等方法 ([21882fc](https://github.com/yaohaixiao/delegate.js/commit/21882fc9486d51ac2eb917f46e4150ae9a443b5c))



## 0.3.1 (2023-02-25)


### Bug Fixes

* 修复 es6 代码中缺失的 import 模块
