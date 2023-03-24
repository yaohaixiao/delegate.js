/**
 * @jest-environment jsdom
 */
import getTypes from 'esm/getTypes'
import hasEvent from 'esm/hasEvent'
import on from 'esm/on'
import off from 'esm/off'
import destroy from 'esm/destroy'

describe('getTypes() 方法', () => {
  // Set up our document body
  document.body.innerHTML =
    '<ul id="list" class="list">\n' +
    '  <li class="item" id="item-home">\n' +
    '    <span>Home</span>\n' +
    '    <a href="/sitemap#home" class="remove" data-id="home">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-support">\n' +
    '    <span>Support</span>\n' +
    '    <a href="/sitemap#support" class="remove" data-id="support">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-faqs">\n' +
    '    <span>FAQs</span>\n' +
    '    <a href="/sitemap#faqs" class="remove" data-id="faqs">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-user">\n' +
    '    <span>FAQs</span>\n' +
    '    <a href="/sitemap#user" class="remove" data-id="user">删除</a>\n' +
    '  </li>\n' +
    '  <li class="item" id="item-exit">\n' +
    '    <span>退出</span>\n' +
    '    <a href="/sitemap#exit" class="remove" data-id="exit">删除</a>\n' +
    '  </li>\n' +
    '</ul>'

  const $list = document.querySelector('#list')
  const handler = function (evt) {
    console.log('事件触发的 delegateTarget 为：', evt.delegateTarget)
  }

  on($list, '.item', 'click', handler)
  on($list, '.item', 'log', handler)
  on($list, '.remove', 'dbclick', handler)
  on($list, '.remove', 'getTypes', handler)

  it('getTypes() 获取到事件信息：', () => {
    let types = getTypes($list)

    expect(types.length).toEqual(4)
    expect(hasEvent($list, 'log')).toBe(true)

    off($list, 'log')
    types = getTypes($list)

    expect(types.length).toEqual(3)
    expect(hasEvent($list, 'log')).toBe(false)
  })

  it('getTypes() 无法获取到事件信息：', () => {
    destroy($list)

    expect(getTypes($list).length).toEqual(0)
    expect(hasEvent($list, 'getTypes')).toBe(false)
  })
})
