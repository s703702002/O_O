const now = new Date()
const startDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
const startTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
const {
  PROJECT_NAME = 'Test O_O web application',
  SAUCE_USERNAME,
  SAUCE_ACCESS_KEY,
  EYES_KEY,
  BASE_URL = 'http://ec2-13-115-59-15.ap-northeast-1.compute.amazonaws.com/',
  TRAVIS_BUILD_NUMBER = `local ${startDate} ${startTime}`,
  TRAVIS_JOB_NUMBER = ''
} = process.env

module.exports = {
  PROJECT_NAME,
  SAUCE_USERNAME,
  SAUCE_ACCESS_KEY,
  EYES_KEY,
  BASE_URL,
  TRAVIS_BUILD_NUMBER,
  TRAVIS_JOB_NUMBER
}
