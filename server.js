const express = require('express')
const app = express()
var path = require('path');

app.use(express.static(__dirname));

app.get('/', function (req, res) {

  res.sendFile(path.join(__dirname+'/index.html'));

})








app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});