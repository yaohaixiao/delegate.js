(function() {
  let options = [
    {
      id: 1,
      text: 'Item 1'
    },
    {
      id: 2,
      text: 'Item 2'
    },
    {
      id: 3,
      text: 'Item 3'
    },
    {
      id: 4,
      text: 'Item 4'
    },
    {
      id: 5,
      text: 'Item 5'
    },
    {
      id: 6,
      text: 'Item 6'
    },
    {
      id: 7,
      text: 'Item 7'
    },
    {
      id: 8,
      text: 'Item 8'
    },
    {
      id: 9,
      text: 'Item 9'
    },
    {
      id: 10,
      text: 'Item 10'
    }
  ]
  let isRemoveOn = true
  let isItemOn = true

  const $remove = document.querySelector('#action-remove')
  const $item = document.querySelector('#action-item')
  const $append = document.querySelector('#append')
  const $list = document.querySelector('#list')
  const $log = document.querySelector('#log')
  const $emitter = delegate($list)

  const draw = () => {
    let items = []

    options.forEach((option) => {
      const id = option.id
      const item = `<li id="${'item-' + id}" class="item">` +
        `<span class="label">${'Item-' + id}</span>` +
        `<a href="#basic" class="remove" data-id="${id}">删除</a>` +
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
  }

  const remove = function (evt) {
    const $target = evt.delegateTarget
    const id = parseInt($target.getAttribute('data-id'), 10)

    options = options.filter((option) => id !== option.id)

    draw()

    $log.value += `删除的 li 节点的 id 为：'item-${id}'\r`

    $emitter.stopEvent(evt)
  }

  const logMouseEnter = function(evt) {
    const $target = $emitter.getRelatedTarget(evt)

    $log.value += `mouseenter 事件的 relatedTarget 为：'${$target}'\r`
  }

  const logClick = function (evt) {
    const pageX = $emitter.getPageX(evt)
    const pageY = $emitter.getPageY(evt)
    const $target = evt.delegateTarget

    $log.value += `当前点击的 li 节点的 id 为：'${$target.id}'\r`
    $log.value += `点击处的 pageX 为：'${pageX}'\r`
    $log.value += `点击处的 pageY 为：'${pageY}'\r`
  }

  const toggleRemove = () => {
    isRemoveOn = !isRemoveOn

    if (isRemoveOn) {
      $remove.innerHTML = '解除 .remove 绑定'
      $emitter.click('.remove', remove)
    } else {
      $remove.innerHTML = '恢复 .remove 绑定'
      $emitter.off('click', remove)
    }
  }

  const toggleLog = () => {
    isItemOn = !isItemOn

    if (isItemOn) {
      $item.innerHTML = '解除 .remove 绑定'
      $emitter.mouseenter('.item', logMouseEnter)
      $emitter.on('.item', 'click', logClick)
    } else {
      $item.innerHTML = '恢复 .remove 绑定'
      $emitter.purge('mouseenter')
      $emitter.off('click', logClick)
    }
  }

  const setup = () => {
    // 动态绘制 ul 中的列表项
    draw()

    // 取消或恢复 .item 元素的代理事件
    $item.addEventListener('click', toggleLog)
    // 取消或恢复 .remove 元素的代理事件
    $remove.addEventListener('click', toggleRemove)

    // 绑定不同元素的代理事件
    $emitter.mouseenter('.item', logMouseEnter)
    $emitter.on('.item', 'click', logClick)
    $emitter.on('.remove', 'click', remove)

    // 动态创建列表项
    $append.addEventListener('click', append)

    $emitter.destroy()
  }

  setup()
})()
