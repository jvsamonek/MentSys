const express = require('express')
const app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/pegarAgumaInfo', function (request, response) {
    console.log('THIS IS GET REQUEST', request.query) //os parametros de entrada ficam em req.query
    //
    //const data = request.query
    //
    response.send('Hello World!')
})
app.get('/get', function (request, response) {
    console.log('THIS IS GET REQUEST',request.query.json) //os parametros de entrada ficam em req.query
    //
    //const data = request.query
    //
    response.send('Hello World!')
})
app.post('/post', function (req, res) {


    console.log('THIS IS POST', req.body)
    
    res.send(JSON.stringify());
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})
