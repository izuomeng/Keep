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