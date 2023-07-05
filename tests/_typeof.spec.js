import _typeof from '../utils/_typeof'

describe('_typeof() 方法', () => {
  it("_typeof('ok'), 返回：[object String]", () => {
    expect(_typeof('ok')).toBe('[object String]')
  })

  it('_typeof(1), 返回：[object Number]', () => {
    expect(_typeof(1)).toBe('[object Number]')
  })

  it('_typeof(null), 返回：[object Null]', () => {
    expect(_typeof(null)).toBe('[object Null]')
  })

  it('_typeof(true), 返回：[object Boolean]', () => {
    expect(_typeof(true)).toBe('[object Boolean]')
  })

  it('_typeof(undefined), 返回：[object Undefined]', () => {
    expect(_typeof(undefined)).toBe('[object Undefined]')
  })

  it('_typeof(Symbol()), 返回：[object Symbol]', () => {
    expect(_typeof(Symbol())).toBe('[object Symbol]')
  })

  it('_typeof([]), 返回：[object Array]', () => {
    expect(_typeof([])).toBe('[object Array]')
  })

  it('_typeof({}), 返回：[object Object]', () => {
    expect(_typeof({})).toBe('[object Object]')
  })

  it('_typeof(()=>{}), 返回：[object Function]', () => {
    expect(_typeof(() => {})).toBe('[object Function]')
  })

  it('_typeof(new Set()), 返回：[object Set]', () => {
    expect(_typeof(new Set())).toBe('[object Set]')
  })

  it('_typeof(new Map()), 返回：[object Map]', () => {
    expect(_typeof(new Map())).toBe('[object Map]')
  })

  it('_typeof(new Date()), 返回：[object Date]', () => {
    expect(_typeof(new Date())).toBe('[object Date]')
  })
})
