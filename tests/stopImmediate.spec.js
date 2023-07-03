/**
 * @jest-environment jsdom
 */
import stopImmediate from '../stopImmediate'
import on from '../on'

describe('stopImmediate() 方法', () => {
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

  let logged = false
  let styled = false
  const mockFn = jest.fn()
  const $list = document.querySelector('#list')
  const $support = document.querySelector('#item-support')
  const $link = document.querySelector('a[data-id="support"]')
  const logHandler = function () {
    mockFn()
    logged = true
  }
  const styleHandler = function () {
    mockFn()
    styled = true
    $list.classList.add('checked')
  }
  const serviceHandler = function (evt) {
    mockFn()
    stopImmediate(evt)
  }
  const removeHandler = function (evt) {
    const $target = evt.target

    $target.parentNode.removeChild($target)
    mockFn()
  }

  $list.addEventListener('click', logHandler)
  $list.addEventListener('click', styleHandler)

  on($support, '.remove', 'click', serviceHandler)
  on($support, '.remove', 'click', removeHandler)

  it('点击 support 行的删除按钮，仅触发 serviceHandler：', () => {
    let items = []

    $list.click()

    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledTimes(2)
    expect(logged).toBe(true)
    expect(styled).toBe(true)
    expect($list.classList.contains('checked')).toBe(true)

    logged = false
    styled = false
    $list.classList.remove('checked')
    $link.click()

    items = document.querySelectorAll('.item')

    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledTimes(3)
    expect(logged).toBe(false)
    expect(styled).toBe(false)
    expect(items.length).toEqual(5)
    expect($list.classList.contains('checked')).toBe(false)
  })
})
