import event from '@/lib/events'

class MeassageBox {
  confirm(msg) {
    return new Promise((resolve, reject) => {
      event.emitEvent('pop', msg, {
        onCancel: reject,
        onConfirm: resolve
      })
    })
  }
}

export default new MeassageBox()