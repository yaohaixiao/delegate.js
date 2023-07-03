/**
 * @jest-environment jsdom
 */
import preventDefault from '../preventDefault'

describe('preventDefault() 方法', () => {
  const mockResponse = jest.fn()
  Object.defineProperty(window, 'location', {
    value: {
      hash: {
        endsWith: mockResponse,
        includes: mockResponse
      },
      assign: mockResponse
    },
    writable: true
  })

  document.body.innerHTML =
    '<div id="nav" class="nav">\n' +
    '  <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>\n' +
    '  <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>\n' +
    '</div>'

  it('调用 preventDefault() 方法，不会跳转页面：', () => {
    let url = location.href
    const $service = document.querySelector('#service')
    const handler = function (evt) {
      preventDefault(evt)
    }

    $service.addEventListener('click', handler, false)
    $service.click()

    expect(location.href).toEqual(url)
  })

  it('不调用 preventDefault() 方法，跳转页面：', () => {
    let url = location.href
    const $help = document.querySelector('#help')
    const handler = function (evt) {
      const $link = evt.target

      location.href = url = $link.href
    }

    $help.addEventListener('click', handler, false)
    $help.click()

    expect(location.href).toEqual(url)
  })
})
