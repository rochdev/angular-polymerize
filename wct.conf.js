module.exports = {
  verbose: false,
  plugins: {
    local: {
      disabled: true
    },
    sauce: {
      browsers: [
        {
          name: 'Chrome',
          base: 'SauceLabs',
          browserName: 'chrome',
          platform: 'Windows 8.1',
          version: '40'
        },
        {
          name: 'Firefox',
          base: 'SauceLabs',
          browserName: 'firefox',
          platform: 'Windows 8.1',
          version: '35'
        },
        {
          name: 'Internet Explorer',
          base: 'SauceLabs',
          browserName: 'internet explorer',
          platform: 'Windows 8.1',
          version: '11'
        }
      ]
    }
  },
};