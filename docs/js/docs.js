(function() {
  let options = [
    {
      id: 1,
      text: 'Item-1'
    },
    {
      id: 2,
      text: 'Item-2'
    },
    {
      id: 3,
      text: 'Item-3'
    },
    {
      id: 4,
      text: 'Item-4'
    },
    {
      id: 5,
      text: 'Item-5'
    },
    {
      id: 6,
      text: 'Item-6'
    },
    {
      id: 7,
      text: 'Item-7'
    },
    {
      id: 8,
      text: 'Item-8'
    },
    {
      id: 9,
      text: 'Item-9'
    },
    {
      id: 10,
      text: 'Item-10'
    }
  ]
  let isRemoveOn = true
  let isItemOn = true

  const $remove = document.querySelector('#action-remove')
  const $item = document.querySelector('#action-item')
  const $append = document.querySelector('#append')
  const $list = document.querySelector('#list')
  const $emitter = delegate($list)
  const $console = document.querySelector('#console')
  const $log = document.querySelector('#log')
  const $provider = delegate($console)

  const draw = () => {
    let items = []

    options.forEach((option) => {
      const id = option.id
      const name = encodeURIComponent(option.text)
      const item = `<li id="${'item-' + id}" class="case__item">` +
        `<span class="case__label">${name}</span>` +
        `<a href="#list?id=${id}&amp;name=${name}" class="case__remove" data-id="${id}">删除</a>` +
        `</li>`

      items.push(item)
    })

    $list.innerHTML = items.join('')
  }

  const append = function () {
    const length = options.length
    const id = length > 0 ? options[length - 1].id + 1 : 1
    const option = { id: id, text: `Item-${id}` }

    options.push(option)

    draw()

    $log.value += `新添加的 li 节点的 id 为：'item-${id}'\r`

    scroll()
  }

  const remove = function (evt) {
    const $target = evt.delegateTarget
    const id = parseInt($target.getAttribute('data-id'), 10)

    options = options.filter((option) => id !== option.id)

    draw()

    $log.value += `click 事件触发，事件的 delegateTarget 为：'${$target}'\r`
    $log.value += `删除的 li 节点 id 为：'item-${id}'\r`

    $emitter.stopImmediate(evt)

    scroll()
  }

  const logMouseEnter = function(evt) {
    const $target = $emitter.getRelatedTarget(evt)

    $log.value += `mouseenter 事件触发，事件的 relatedTarget 为：'${$target}'\r`

    scroll()
  }

  const logClick = function (evt) {
    const pageX = $emitter.getPageX(evt)
    const pageY = $emitter.getPageY(evt)
    const $target = evt.delegateTarget

    $log.value += `click 事件触发，当前点击的 li 节点的 id 为：'${$target.id}'\r`
    $log.value += `getPageX() 获取点击处的 pageX 为：'${pageX}'\r`
    $log.value += `getPageY() 获取点点击处的 pageY 为：'${pageY}'\r`

    scroll()
  }

  const logTrigger = function (evt) {
    const $target = evt.delegateTarget
    const type = evt.type

    $log.value += `$emitter.trigger('log', '.case__item:nth-child(2)') 触发自定义 ${type} 事件\r`
    $log.value += `事件的 delegateTarget 为节点的 id 为：'${$target.id}'\r`

    scroll()
  }

  const toggleRemove = () => {
    isRemoveOn = !isRemoveOn

    if (isRemoveOn) {
      $log.value += `已恢复 .case__remove 事件代理绑定\r`
      $remove.innerHTML = '解除 .case__remove 绑定'
      $emitter.click('.case__remove', remove)
    } else {
      $log.value += `已解除 .case__remove 事件代理绑定\r`
      $remove.innerHTML = '恢复 .case__remove 绑定'
      $emitter.off('click', remove)
    }

    scroll()
  }

  const toggleLog = () => {
    isItemOn = !isItemOn

    if (isItemOn) {
      $log.value += `已恢复 .case__item 事件代理绑定\r`
      $item.innerHTML = '解除 .case__item 绑定'
      $emitter.mouseenter('.case__item', logMouseEnter)
      $emitter.on('.case__item', 'click', logClick)
    } else {
      $log.value += `已解除 .case__item 事件代理绑定\r`
      $item.innerHTML = '恢复 .case__item 绑定'
      $emitter.purge('mouseenter')
      $emitter.off('click', logClick)
    }

    scroll()
  }

  const typeHandler = function(evt) {
    const type = evt.type
    const $target = evt.target

    $log.value += `${$target} 触发 ${type} 事件\r`

    scroll()
  }

  const keyboardHandler = function(evt) {
    const type = evt.type
    const $target = evt.target
    const charCode = $provider.getCharCode(evt)

    $log.value += `\r${$target} 触发 ${type} 事件\r`
    $log.value += `事件的 charCode 是：${charCode}\r`

    scroll()
  }

  const lastItemHandler = function(evt) {
    const type = evt.type
    const $target = evt.target

    $emitter.stopImmediate(evt)

    $log.value += `$emitter.trigger('alert', '.case__item:last-child') 触发自定义 ${type} 事件\r`
    $log.value += `事件的 delegateTarget 为节点的 id 为：'${$target.id}'\r`

    scroll()
  }

  const scroll = () => {
    $log.scrollTop = $log.scrollHeight
  }

  const setup = () => {
    let types = []

    // 动态绘制 ul 中的列表项
    draw()

    $list.addEventListener('click', logClick)

    // 取消或恢复 .item 元素的代理事件
    $item.addEventListener('click', toggleLog)
    // 取消或恢复 .remove 元素的代理事件
    $remove.addEventListener('click', toggleRemove)

    // 绑定不同元素的代理事件
    $emitter.mouseenter('.case__item', logMouseEnter)
    $emitter.click('.case__remove', remove)
    $emitter.on('.case__item','click', logClick)
    $emitter.on('.case__item','log', logTrigger)

    $emitter.on('.case__item','alert', lastItemHandler)
    $emitter.on('.case__item','alert', typeHandler)

    // 动态创建列表项
    $append.addEventListener('click', append)

    types = $emitter.getTypes()

    $log.value += `getTypes() 获取 $emitter 绑定事件：'${types}'\r`

    $emitter.trigger('log', '.case__item:nth-child(2)')
    $emitter.trigger('alert', '.case__item:last-child')

    $provider.focusin('.case__textarea', typeHandler)
    $provider.keyup('.case__textarea', keyboardHandler)

    types = $provider.getTypes()

    $log.value += `getTypes() 获取 $provider 绑定事件：'${types}'\r`
  }

  setup()
})()
