(function() {
  let timer = null
  let playing = false
  let $active = null

  const $aside = document.querySelector('#aside')
  const $main = document.querySelector('#main')
  const $up = document.querySelector('#arrow-up')
  const $down = document.querySelector('#arrow-down')
  const minTop = 0
  const maxTop = $main.scrollHeight

  /**
   * 防抖函数
   * =============================================================
   * @param {Function} fn 回调函数
   * @param {Number} delay 延迟时间（毫秒）
   * @returns {Function}
   */
  const debounce = (fn, delay = 300) => {
    let timer

    return function (...args) {
      clearTimeout(timer)

      timer = setTimeout(() => fn.apply(this, args), delay)
    }
  }

  const updateButtons = (scrollTop) => {
    if (scrollTop <= minTop) {
      $up.classList.add('hide')
    } else if (scrollTop >= maxTop) {
      $down.classList.add('hide')
    } else if (scrollTop > minTop && scrollTop < maxTop) {
      $up.classList.remove('hide')
      $down.classList.remove('hide')
    }
  }

  const updateReading = debounce(function() {
    const scrollTop = $main.scrollTop

    updateButtons(scrollTop)
  })

  const scrollTo = (top, speed = 100) => {
    let scrollTop = $main.scrollTop
    const distance = top - scrollTop
    const step = Math.ceil(distance / 15)
    const scroll = () => {
      if (timer) {
        clearTimeout(timer)
      }

      scrollTop += step

      if ((scrollTop <= top && distance < 0) || (scrollTop >= top && distance > 0)) {
        scrollTop = top
        playing = false
      }

      $main.scrollTop = scrollTop
      updateButtons(scrollTop)

      if (!playing) {
        clearTimeout(timer)
        timer = null
        return false
      } else {
        timer = setTimeout(scroll, speed)
      }
    }

    if (playing) {
      clearTimeout(timer)
      timer = null
      playing = false

      return false
    }

    playing = true

    scroll()
  }

  const scrollToAnchor = function(evt) {
    const $target = evt.delegateTarget
    const id = $target.href.split('#')[1]
    const $item = $target.parentNode
    const $method = document.querySelector(`#${id}`)

    scrollTo($method.offsetTop, 50)

    if ($active) {
      $active.classList.remove('active')
    }
    $item.classList.add('active')
    $active = $item

    evt.stopPropagation()
    evt.preventDefault()
  }

  const scrollToTop = function () {
    scrollTo(minTop)
  }

  const scrollToBottom = function () {
    scrollTo(maxTop)
  }

  const syncNav = () => {
    let currentMethod = ''
    const Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.intersectionRatio>0){
          const id = entry.target.getAttribute('id')
          console.log('id', id)
          const $anchor = document.querySelector(`.aside__anchor[href="#${id}"]`)
          const $item = $anchor.parentNode

          if ($active) {
            $active.classList.remove('active')
          }
          $item.classList.add('active')
          $active = $item
        }
      })
    })

    $main.querySelectorAll('.section__h3').forEach((section) => {
      Observer.observe(section)
    })
  }

  const setup = () => {
    const $emitter = delegate($aside)
    const scrollTop = $main.scrollTop

    updateButtons(scrollTop)
    syncNav()

    $emitter.click('.aside__anchor', scrollToAnchor)

    $main.addEventListener('wheel', updateReading)
    $up.addEventListener('click', scrollToTop)
    $down.addEventListener('click', scrollToBottom)
  }


  setup()
})()
