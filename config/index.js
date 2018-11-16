
export const isProd = false  // 动态配置dev、prod环境

const domain = require('./domain')(isProd)

// 静态配置
const staticConfig = {
}

// 方便后期配置
const config = Object.assign(staticConfig, {
  domain
})

export default config