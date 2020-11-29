const fs = require('fs')
const path = require('path')
const Mock = require('mockjs')

function getJsonFile(filePath) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, filePath), 'utf-8'))
  return Mock.mock(data)
}

module.exports = function (app) {
  if (process.env.MOCK == 'true')
    app.get('/home/data', function (req, res) {
      res.json(getJsonFile('./data/goods_data.json'))
    })
}
