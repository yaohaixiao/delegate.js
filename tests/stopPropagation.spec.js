/**
 * @jest-environment jsdom
 */
import stopPropagation from '../stopPropagation'
import getCharCode from '../getCharCode'

describe('stopPropagation() 方法', () => {
  document.body.innerHTML =
    '<div id="nav" class="nav">\n' +
    '  <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>\n' +
    '  <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>\n' +
    '</div>'

  let id = ''
  let code = ''
  const mockResponse = jest.fn()
  const $nav = document.querySelector('#nav')
  const showLog = function (evt) {
    const $target = evt.target

    id = $target.id
    mockResponse()
  }

  $nav.addEventListener('click', showLog, false)

  it('调用 stopPropagation() 方法，阻止事件冒泡：', () => {
    const $service = document.querySelector('#service')
    const handler = function (evt) {
      stopPropagation(evt)
    }

    $service.addEventListener('click', handler, false)
    $service.click()

    expect(id).toEqual('')
    expect(mockResponse).toBeCalledTimes(0)
  })

  it('不调用 stopPropagation() 方法，执行事件冒泡：', () => {
    const $help = document.querySelector('#help')
    const handler = function (evt) {
      code = getCharCode(evt)
    }

    $help.addEventListener('click', handler, false)
    $help.click()

    expect(id).toEqual('help')
    expect(mockResponse).toHaveBeenCalled()
  })
})
