
const domainConfig = {
  dev: {
    common: 'http://10.8.12.158:7001'
  },
  prod: {
    common: 'https://api-v5-0.yangcong345.com'
  }
}

module.exports = function(isProd) {
  const env = isProd ? 'prod' : 'dev'
  return domainConfig[env]
}


