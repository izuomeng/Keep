import event from '@/lib/events'

class MeassageBox {
  confirm(msg, option = {}) {
    return new Promise((resolve, reject) => {
      event.emitEvent('pop', msg, {
        onCancel: reject,
        onConfirm: resolve
      }, option)
    })
  }
}

export default new MeassageBox()