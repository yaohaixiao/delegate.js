/**
 * A polyfill for Element.matches()
 * ========================================================================
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
 */
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function (selector) {
      const matches = (this.document || this.ownerDocument).querySelectorAll(selector)
      let i = matches.length

      while (--i >= 0 && matches.item(i) !== this) {
      }

      return i > -1
    }
}
