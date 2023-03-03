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
