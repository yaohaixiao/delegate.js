# [1.2.0](https://github.com/yaohaixiao/delegate.js/compare/1.1.0...1.2.0) (2023-03-16)


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
