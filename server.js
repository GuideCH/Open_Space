
const express = require('express')
const app = express();
const port = 5000;

app.set ( "view engine", "ejs" );
app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
  res.render(__dirname +'/views/home.ejs')

});

app.get('/genres', (req , res) => {
  res.render(__dirname +'/views/page2.ejs')

});

app.get('/clubs/:club', (req , res) => {
  var url = (req.url)
  res.render(__dirname +'/views/page3.ejs', { url : url });
  console.log(url)
});

app.listen(port, () => {
  console.log(`server listening on
     port ${port}!`)
});
