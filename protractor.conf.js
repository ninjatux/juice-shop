'use strict'
const LOCAL_IP = process.env.LOCAL_IP || '127.0.0.1'
const USE_PROXY = process.env.USE_PROXY

let config = {
  directConnect: true,
  allScriptsTimeout: 80000,
  specs: [
    'test/e2e/*.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://' + LOCAL_IP + ':3000',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 80000
  },
  onPrepare: function () {
    var jasmineReporters = require('jasmine-reporters')
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: 'build/reports/e2e_results'
    }))
  }
}

if (USE_PROXY) {
  config.directConnect = false
  config.seleniumAddress = 'http://' + LOCAL_IP + ':4444/wd/hub'
  config.webDriverProxy = 'http://127.0.0.1:8282'
}

module.exports.config = config
