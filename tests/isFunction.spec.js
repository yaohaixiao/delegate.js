import isFunction from '../utils/isFunction'

describe('isFunction() 方法', () => {
  it('isFunction(()=>{)), 返回：true', () => {
    expect(isFunction(() => {})).toBe(true)
  })

  it('isFunction(function(){}), 返回：true', () => {
    expect(isFunction(function () {})).toBe(true)
  })

  it('isFunction(class Foo{}), 返回：true', () => {
    expect(isFunction(class Foo {})).toBe(true)
  })

  it('isFunction(new Function()), 返回：true', () => {
    expect(isFunction(new Function())).toBe(true)
  })

  it('isFunction(Function), 返回：true', () => {
    expect(isFunction(Function)).toBe(true)
  })

  it('isFunction(String), 返回：true', () => {
    expect(isFunction(String)).toBe(true)
  })

  it('isFunction(Object.assign), 返回：true', () => {
    expect(isFunction(Object.assign)).toBe(true)
  })

  it('isFunction(Object.prototype), 返回：false', () => {
    expect(isFunction(Object.prototype)).toBe(false)
  })

  it("isFunction(''), 返回：true", () => {
    expect(isFunction('')).toBe(false)
  })

  it('isFunction({}), 返回：false', () => {
    expect(isFunction({})).toBe(false)
  })
})
