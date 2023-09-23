import Outline from '@yaohaixiao/outline.js/outline'
import docs from './docs'

const defaults = Outline.DEFAULTS

defaults.selector = 'h2,h3'
defaults.title = false
defaults.showCode = false
defaults.position = 'sticky'
defaults.parentElement = '#aside'
defaults.scrollElement = '#main'
defaults.articleElement = '#article'
defaults.git = 'https://github.com/yaohaixiao/delegate.js'
defaults.tags = 'https://github.com/yaohaixiao/delegate.js/tags'
defaults.issues = 'https://github.com/yaohaixiao/delegate.js/issues'
defaults.print = {
  element: '#article',
  title: 'Delegate.js'
}
defaults.chapterTextFilter = (text) => {
  return text.replace(/\(.*?\)/, '()')
}

new Outline(Outline.DEFAULTS)

docs.setup()
