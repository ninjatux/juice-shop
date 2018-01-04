const config = require('config')
const frisby = require('frisby')
const Joi = frisby.Joi
const utils = require('../../lib/utils')

const REST_URL = config.get('test.serverUrl') + '/rest/admin'

if (process.env.USE_PROXY) {
  const HttpProxyAgent = require('http-proxy-agent')
  frisby.globalSetup({
    request: {
      agent: new HttpProxyAgent(config.get('test.proxyUrl'))
    }
  })
}

describe('/rest/admin/application-version', () => {
  it('GET application version from package.json', done => {
    frisby.get(REST_URL + '/application-version')
      .expect('status', 200)
      .expect('header', 'content-type', /application\/json/)
      .expect('json', {
        version: utils.version()
      })
      .done(done)
  })
})

describe('/rest/admin/application-configuration', () => {
  it('GET application configuration', done => {
    frisby.get(REST_URL + '/application-configuration')
      .expect('status', 200)
      .expect('header', 'content-type', /application\/json/)
      .expect('jsonTypes', {
        config: Joi.object()
      })
      .done(done)
  })
})