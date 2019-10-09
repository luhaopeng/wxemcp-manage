function cleanObj(obj: object): object {
  const clean = Object.assign({}, obj)
  Object.keys(clean).forEach(k => {
    if (typeof clean[k] === 'undefined' || clean[k] === '') {
      delete clean[k]
    }
  })
  return clean
}

export { cleanObj }
