var express = require('express')
var bodyParser = require('body-parser')
var random = require('./random')
var app = express()
// Handles post requests
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
var port = 3009

app.get('/', function (req, res) {
  res.json({status: 'SUCCESS'})
})

app.get('/random', function (req, res) {
  var names = random.getNames(5)
  console.log('getting the names: ' + JSON.stringify(names))
  res.send({ status: 'SUCCESS', names: names })
})

// START THE SERVER
// =============================================================================
var server = app.listen(port, function () {
  console.log(`server running on port ${server.address().port}`)
})
