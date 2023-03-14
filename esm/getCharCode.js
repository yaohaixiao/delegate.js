import isAppleSafari from './isAppleSafari'

/**
 * 返回触发事件的 charCode
 * ========================================================================
 * @method getCharCode
 * @param {Event} evt - Event 对象
 * @return {Number} - 返回事件的 charCode
 */
const getCharCode = function (evt) {
  let code = evt.keyCode || evt.charCode
  // keycodes for webkit/safari
  const webkitKeymap = {
    63232: 38, // up
    63233: 40, // down
    63234: 37, // left
    63235: 39, // right
    63276: 33, // page up
    63277: 34, // page down
    25: 9 // SHIFT-TAB (Safari provides a different key code in
    // this case, even though the shiftKey modifier is set)
  }

  // webkit key normalization
  if (isAppleSafari() && code in webkitKeymap) {
    code = webkitKeymap[code]
  }

  return code
}

export default getCharCode
