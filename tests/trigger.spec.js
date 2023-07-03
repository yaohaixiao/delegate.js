/**
 * @jest-environment jsdom
 */
import trigger from '../trigger'
import on from '../on'
import off from '../off'
import stopEvent from '../stopEvent'

describe('trigger() 方法', () => {
  // Set up our document body
  document.body.innerHTML =
    '<ul id="list" class="list">\n' +
    '  <li class="item" id="item-home">\n' +
    '    <span>Home</span>\n' +
    '    <a href="/sitemap#home" class="remove" id="remove-home" data-id="home">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-support">\n' +
    '    <span>Support</span>\n' +
    '    <a href="/sitemap#support" class="remove" id="remove-support" data-id="support">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-faqs">\n' +
    '    <span>FAQs</span>\n' +
    '    <a href="/sitemap#faqs" class="remove" id="remove-faqs" data-id="faqs">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-user">\n' +
    '    <span>FAQs</span>\n' +
    '    <a href="/sitemap#user" class="remove" id="remove-user" data-id="user">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-exit">\n' +
    '    <span>退出</span>\n' +
    '    <a href="/sitemap#exit" class="remove" id="remove-exit" data-id="exit">删除</a>\n' +
    '  </li>\n' +
    '</ul>'

  let id = ''
  let type = ''

  const mockFn = jest.fn()
  const $list = document.querySelector('#list')
  const removeHandler = function (evt) {
    const $remove = evt.delegateTarget
    const attrId = $remove.getAttribute('data-id')
    const $item = document.querySelector(`#item-${attrId}`)

    id = attrId

    $item.parentNode.removeChild($item)

    stopEvent(evt)
  }
  const itemHandler = function (evt) {
    const $target = evt.delegateTarget

    id = $target.id
  }
  const customHandler = function (evt) {
    const $target = evt.delegateTarget

    id = $target.id
    type = evt.type

    mockFn()
  }

  on($list, '.item', 'click', itemHandler)
  on($list, '.remove', 'dbclick', removeHandler)
  on($list, '.item', 'log', customHandler)
  on($list, '.remove', 'alert', customHandler)

  describe('触发内置事件：', () => {
    it(`trigger($list, 'click', '.item')：`, () => {
      let items = []

      trigger($list, 'click', '.item')

      items = document.querySelectorAll('.item')

      expect(id).toEqual('item-home')
      expect(items.length).toEqual(5)
    })

    it(`trigger($list, 'dbclick', '.remove')：`, () => {
      let items = []

      trigger($list, 'dbclick', '.item:last-child .remove')

      items = document.querySelectorAll('.item')

      expect(id).toEqual('exit')
      expect(items.length).toEqual(4)

      trigger($list, 'dbclick', '.remove')

      items = document.querySelectorAll('.item')

      expect(id).toEqual('home')
      expect(items.length).toEqual(3)
    })

    it(`缺少 selector 参数或者 type 参数：`, () => {
      let items = []
      let result = true

      result = trigger($list, 'click')

      items = document.querySelectorAll('.item')

      expect(id).toEqual('home')
      expect(items.length).toEqual(3)
      expect(result).toBe(false)

      result = trigger($list)

      items = document.querySelectorAll('.item')

      expect(id).toEqual('home')
      expect(items.length).toEqual(3)
      expect(result).toBe(false)
    })

    it(`无法查询到与 selector 匹配的 DOM 元素：`, () => {
      let items = []
      const result = trigger($list, 'click', '.child')

      items = document.querySelectorAll('.item')

      expect(id).toEqual('home')
      expect(items.length).toEqual(3)
      expect(result).toBe(false)
    })
  })

  describe('触发自定义事件：', () => {
    it(`trigger($list, 'log', '.item')：`, () => {
      trigger($list, 'log', '.item')

      expect(id).toEqual('item-support')
      expect(type).toEqual('log')
      expect(mockFn).toBeCalled()
      expect(mockFn).toBeCalledTimes(1)

      trigger($list, 'log', '.item:last-child')

      expect(id).toEqual('item-user')
      expect(type).toEqual('log')
      expect(mockFn).toBeCalled()
      expect(mockFn).toBeCalledTimes(2)

      trigger($list, 'log', '.item:nth-child(2)')

      expect(id).toEqual('item-faqs')
      expect(type).toEqual('log')
      expect(mockFn).toBeCalled()
      expect(mockFn).toBeCalledTimes(3)

      off($list, 'log')
      trigger($list, 'log', '.item')

      expect(id).toEqual('item-faqs')
      expect(mockFn).toBeCalledTimes(3)
    })

    it(`trigger($list, 'alert', '.remove')：`, () => {
      trigger($list, 'alert', '.remove')

      expect(id).toEqual('remove-support')
      expect(type).toEqual('alert')
      expect(mockFn).toBeCalled()
      expect(mockFn).toBeCalledTimes(4)

      trigger($list, 'alert', 'li:last-child .remove')

      expect(id).toEqual('remove-user')
      expect(type).toEqual('alert')
      expect(mockFn).toBeCalled()
      expect(mockFn).toBeCalledTimes(5)

      off($list, 'alert')
      trigger($list, 'alert', '.remove')

      expect(id).toEqual('remove-user')
      expect(mockFn).toBeCalledTimes(5)
    })
  })
})
