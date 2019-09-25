// env
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

// api url prefix
const devUrl = 'http://localhost:8080/wxemcp'
const prodUrl = 'http://hl.energyman.cn/wxemcp'

// export
const urlPrefix = isDev ? devUrl : prodUrl

export { isDev, isProd, urlPrefix }
