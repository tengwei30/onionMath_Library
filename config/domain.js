
const domainConfig = {
  dev: {
    common: 'http://10.8.8.8:8188'
  },
  prod: {
    common: 'https://api-v5-0.yangcong345.com'
  }
}

module.exports = function(isProd) {
  const env = isProd ? 'prod' : 'dev'
  return domainConfig[env]
}


