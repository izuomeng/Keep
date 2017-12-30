import axios from 'axios'

export function memorize(func) {
  let cache = {}
  return function(...args) {
    var argsInJSON = JSON.stringify(args)
    if (cache[argsInJSON]) {
      return cache[argsInJSON]
    }
    cache[argsInJSON] = func.apply(null, args)
    return cache[argsInJSON]
  }
}

export function uploadFile(data, url, onprogress) {
  const forData = new FormData()
  forData.append('id', data.id)
  forData.append('image', data.file)
  return axios.post(url, forData, {
    onUploadProgress: onprogress
  })
}