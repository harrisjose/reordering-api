var express = require('express')
var bodyParser = require('body-parser')
var reorder = require('../reorder/init')

var router = express.Router()
var jsonParser = bodyParser.json()

/* GET API Docs. */
router.get('/', function (req, res, next) {
  res.render('api', {title: 'Reordering API'})
})

/* POST request with input string to be translated. Response contains reordered string*/
router.post('/', jsonParser, function (req, res, next) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  reorder(req.body.input, function (data) {
    var text = ''
    for (var i = 0; i < data.length; i++) {
      text += data[i]
    }
    res.end(JSON.stringify(data))
  })
})

module.exports = router
