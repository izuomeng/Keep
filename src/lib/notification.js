function isSafari() {
  const ua = window.navigator.userAgent
  return ua.indexOf('Safari') > -1 &&
    ua.indexOf('Version') > -1
}
function resolveRequest(granted, denied) {
  return (permission) => {
    if (permission === 'granted') {
      granted.call(null)
    } else {
      denied.call(null)
    }
  }
}
export function requestPermission(granted, denied) {
  if (!('Notification' in window)) {
    return denied.call(null)
  }
  if (Notification.permission === 'granted') {
    return granted.call(null)
  }
  const resolve = resolveRequest(granted, denied)
  if (isSafari()) {
    Notification.requestPermission(resolve)
  } else {
    Notification.requestPermission().then(resolve)
  }
}

export function fireNotification(time, title, option) {
  const now = Date.now(),
    noteTime = time.getTime()
  if (noteTime < now) {
    return
  }
  return setTimeout(() => {
    new Notification(title, option)
  }, noteTime - now) 
}