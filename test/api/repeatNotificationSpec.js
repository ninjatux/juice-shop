const config = require('config')
const frisby = require('frisby')

const REST_URL = config.get('test.serverUrl') + '/rest'

if (process.env.USE_PROXY) {
  const HttpProxyAgent = require('http-proxy-agent')
  frisby.globalSetup({
    request: {
      agent: new HttpProxyAgent(config.get('test.proxyUrl'))
    }
  })
}

describe('/rest/repeat-notification', () => {
  it('GET triggers repeating notification without passing a challenge', done => {
    frisby.get(REST_URL + '/repeat-notification')
      .expect('status', 200)
      .done(done)
  })

  it('GET triggers repeating notification passing an unsolved challenge', done => {
    frisby.get(REST_URL + '/repeat-notification?challenge=Retrieve%20Blueprint')
      .expect('status', 200)
      .done(done)
  })

  it('GET triggers repeating notification passing a solved challenge', done => {
    frisby.get(REST_URL + '/repeat-notification?challenge=Error%20Handling')
      .expect('status', 200)
      .done(done)
  })
})
