exports.config = {
  seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.40.0.jar -Dwebdriver.chrome.driver=../node_modules/protractor/selenium/chromedriver',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/**/*.js']
};
