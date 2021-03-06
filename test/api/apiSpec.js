const config = require('config')
const frisby = require('frisby')

const API_URL = config.get('test.serverUrl') + '/api'
const REST_URL = config.get('test.serverUrl') + '/rest'

console.log(API_URL)

if (process.env.USE_PROXY) {
  const HttpProxyAgent = require('http-proxy-agent')
  frisby.globalSetup({
    request: {
      agent: new HttpProxyAgent(config.get('test.proxyUrl'))
    }
  })
}

describe('/api', () => {
  it('GET error when query /api without actual resource', done => {
    frisby.get(API_URL)
      .expect('status', 500)
      .done(done)
  })
})

describe('/rest', () => {
  it('GET error message with information leakage when calling unrecognized path with /rest in it', done => {
    frisby.get(REST_URL + '/unrecognized')
      .expect('status', 500)
      .expect('bodyContains', '<h1>Juice Shop (Express ~')
      .expect('bodyContains', 'Unexpected path: /rest/unrecognized')
      .done(done)
  })
})
