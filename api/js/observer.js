const $observer = {
  topics: Object.create(null),
  emit(event, data) {
    const topics = this.topics
    const events = topics[event] || []
    events.forEach((handler) => {
      handler(data)
    })
  },
  on(event, handler) {
    const topics = this.topics

    if (!topics[event]) {
      topics[event] = []
    }

    topics[event].push(handler)
  },
  off(event, handler) {
    const topics = this.topics
    const events = topics[event] || []
    const i = events.findIndex((h) => {
      return h === handler
    })

    if (i > -1) {
      topics[event].splice(i, 1)
    }
  }
}

export default $observer
