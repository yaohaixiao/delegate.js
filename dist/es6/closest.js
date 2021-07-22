import './polyfill'

/**
 * 获得与选择器匹配的元素
 * ========================================================================
 * @param {Element} el
 * @param {String} selector
 * @return {Function}
 */
const closest = (el, selector) => {
  // Node.ELEMENT_NODE	1	An Element node like <p> or <div>.
  // Node.ATTRIBUTE_NODE	2	An Attribute of an Element.
  // Node.TEXT_NODE	3	The actual Text inside an Element or Attr.
  // Node.CDATA_SECTION_NODE	4	A CDATASection, such as <!CDATA[[ … ]]>.
  // Node.PROCESSING_INSTRUCTION_NODE	7	A ProcessingInstruction of an XML document, such as <?xml-stylesheet … ?>.
  // Node.COMMENT_NODE	8	A Comment node, such as <!-- … -->.
  // Node.DOCUMENT_NODE	9	A Document node.
  // Node.DOCUMENT_TYPE_NODE	10	A DocumentType node, such as <!DOCTYPE html>.
  // Node.DOCUMENT_FRAGMENT_NODE	11	A DocumentFragment node.
  const DOCUMENT_NODE_TYPE = 9

  // 忽略 document，因为事件冒泡最终都到了 document
  while (el && el.nodeType !== DOCUMENT_NODE_TYPE) {
    if (typeof el.matches === 'function' && el.matches(selector)) {
      return el
    }
    el = el.parentNode || el.parentElement
  }
}

export default closest
