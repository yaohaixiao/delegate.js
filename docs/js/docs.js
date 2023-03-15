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
    }
  ]
  let isRemoveOn = true
  let isItemOn = true

  const $buttonOnRemove = document.querySelector('#on-remove')
  const $buttonOffRemove = document.querySelector('#off-remove')
  const $buttonOnItem = document.querySelector('#on-item')
  const $buttonOffItem = document.querySelector('#off-item')
  const $buttonOnAll = document.querySelector('#on-all')
  const $buttonOffAll = document.querySelector('#off-all')
  const $buttonAdd = document.querySelector('#add')
  const $list = document.querySelector('#list')
  const $emitter = delegate($list)

  const draw = () => {
    let items = []

    options.forEach((option) => {
      const id = option.id
      const item = `<li id="${'item-' + id}" class="item">` +
        `<span class="label">${'Item-' + id}</span>` +
        `<a href="#list" class="remove" data-id="${id}">删除</a>` +
        `</li>`

      items.push(item)
    })

    $list.innerHTML = items.join('')
  }

  const afterDraw = (evt) => {
    console.log('afterDraw', evt)
  }

  const addItem = function (evt) {
    const length = options.length
    const id = length > 0 ? options[length - 1].id + 1 : 1
    const option = { id: id, text: `Item-${id}` }
    const $textarea = document.querySelector('#log-textarea')

    options.push(option)

    draw()

    $textarea.value += `你添加的 li 节点的 id 为 item-${id}\r`
  }

  const removeItem = function (evt) {
    const $removeButton = evt.delegateTarget
    const id = parseInt($removeButton.getAttribute('data-id'), 10)
    const $textarea = document.querySelector('#log-textarea')

    // 阻止删除链接的默认行为
    $emitter.stopEvent(evt)

    options = options.filter((option) => id !== option.id)

    draw()

    $textarea.value += `你删除的 li 节点的 id 为 item-${id}\r`
  }

  const showLog = function (evt) {
    const pageX = $emitter.getPageX(evt)
    const pageY = $emitter.getPageY(evt)
    const $li = evt.delegateTarget
    const $target = $emitter.getTarget(evt)
    const $textarea = document.querySelector('#log-textarea')

    $textarea.value += `当前触发事件的 target DOM 元素是 ${$target}\r`
    $textarea.value += `你点击的 li 节点的 id 为 ${$li.id}\r`
    $textarea.value += `pageX 为：${pageX}\r`
    $textarea.value += `pageY 为：${pageY}\r`
  }

  const showMouseEventLog = function (evt) {
    const $relatedTarget = $emitter.getRelatedTarget(evt)
    const $textarea = document.querySelector('#log-textarea')

    $textarea.value += `当前触发事件的 relatedTarget DOM 元素是 ${$relatedTarget}\r`
  }

  const onRemove = () => {
    // 强制使用事件捕获模型
    $emitter.on('.remove', 'click', removeItem)
    isRemoveOn = true
    updateButtons()
  }
  const offRemove = () => {
    $emitter.off('click', removeItem)
    isRemoveOn = false
    updateButtons()
  }
  const onItem = () => {
    $emitter.on('.item', 'click', showLog)
    $emitter.on('.item', 'mouseenter', showMouseEventLog)
    isItemOn = true
    updateButtons()
  }
  const offItem = () => {
    $emitter.off('click', showLog)
    $emitter.off('mouseenter', showMouseEventLog)
    isItemOn = false
    updateButtons()
  }
  const onAll = () => {
    onRemove()
    onItem()
    isRemoveOn = true
    isItemOn = true
    updateButtons()

  }
  const offAll = () => {
    $emitter.destroy()
    isRemoveOn = false
    isItemOn = false
    updateButtons()
  }
  const updateButtons = () => {
    if (isRemoveOn) {
      $buttonOnRemove.style.display = 'none'
      $buttonOffRemove.style.display = 'inline-block'
    } else {
      $buttonOnRemove.style.display = 'inline-block'
      $buttonOffRemove.style.display = 'none'
    }

    if (isItemOn) {
      $buttonOnItem.style.display = 'none'
      $buttonOffItem.style.display = 'inline-block'
    } else {
      $buttonOnItem.style.display = 'inline-block'
      $buttonOffItem.style.display = 'none'
    }

    if (isItemOn || isRemoveOn) {
      $buttonOnAll.style.display = 'none'
      $buttonOffAll.style.display = 'inline-block'
    } else {
      $buttonOnAll.style.display = 'inline-block'
      $buttonOffAll.style.display = 'none'
    }
  }

  draw()
  onAll()

  $buttonOnRemove.addEventListener('click', onRemove)
  $buttonOffRemove.addEventListener('click', offRemove)
  $buttonOnItem.addEventListener('click', onItem)
  $buttonOffItem.addEventListener('click', offItem)
  $buttonOnAll.addEventListener('click', onAll)
  $buttonOffAll.addEventListener('click', offAll)
  $buttonAdd.addEventListener('click', addItem)
})()
