const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const devUrl = 'http://localhost:8080/wxemcp'
const prodUrl = 'http://hl.energyman.cn/wxemcp'

const urlPrefix = isDev ? devUrl : prodUrl

export { isDev, isProd, urlPrefix }
