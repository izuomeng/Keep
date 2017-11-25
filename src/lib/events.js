class EventEmitter {
    constructor() {
        this.events = {}
    }
    addListener(type, fn) {
        if (!this.events[type]) {
            this.events[type] = []
        }
        const queue = this.events[type]
        queue.push(fn)
    }
    removeListener(type, fn) {
        if (!this.events[type]) {
            return
        }
        const queue = this.events[type]
        this.events[type] = queue.filter(v => v !== fn)
    }
    emitEvent(type, ...args) {
        if (!this.events[type]) {
            return
        }
        const queue = this.events[type]
        queue.forEach(v => v.apply(null, args))
    }
} 
export default new EventEmitter()