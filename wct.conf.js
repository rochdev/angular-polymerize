module.exports = {
  verbose: false,
  plugins: {
    local: {
      disabled: true,
      browsers: ['chrome', 'firefox']
    },
    sauce: {
      disabled: false,
      browsers: [
        {
          name: 'Chrome (latest)',
          base: 'SauceLabs',
          browserName: 'chrome',
          platform: 'Windows 8.1'
        },
        {
          name: 'Firefox (latest)',
          base: 'SauceLabs',
          browserName: 'firefox',
          platform: 'Windows 8.1'
        },
        {
          name: 'Internet Explorer 11',
          base: 'SauceLabs',
          browserName: 'internet explorer',
          platform: 'Windows 8.1',
          version: '11'
        },
        {
          name: 'Safari 8',
          base: 'SauceLabs',
          browserName: 'safari',
          platform: 'OS X 10.10',
          version: '8'
        }
      ]
    }
  },
};