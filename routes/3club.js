require('dotenv').config()
const router = require('express').Router();

router.get('/:club', (req , res) => {
  var url = (req.url)
  res.render(__dirname +'/views/page3.ejs', { url : url });
  console.log(url)
});


router.get('/test/db/:club_name',( req , res) => {
  var url = (req.url)
  const sql = require('mysql');


  const sqlconnect = sql.createConnection({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE
  });

  sqlconnect.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let club_name = String(req.params.club_name)

    sqlconnect.query(`SELECT * FROM club_data WHERE club_name = '${club_name}'`, function (err, result) {
      if (result && Array.isArray(result) && result.length > 0){
        console.log(result)
        var url = (`club/${req.url}`)
        var club_data = result[0]
        console.log(club_data)
        res.render(__dirname +'/views/page3.ejs',{url:url,club_name:club_data.club_name,club_des:club_data.club_des})

      }
      //don't forget to get rid of this else your server console'll be a mess
      //here
      else{
        console.log(`dev_notice: can't get any clubs data at ${__dirname}`);
      }
      //to here
      sqlconnect.end(function(err, result){
        if (err) throw err;
        else{
          console.log('connection Closed!')
        };


      })
    });


  });



});


module.exports = router;
