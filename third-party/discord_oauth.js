require('dotenv').config();
const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const sql = require('mysql');

passport.serializeUser((user,done) => {
  console.log(`serializeUser ${user.user_discord_id}`)
  done(null, user.user_discord_id)
});

passport.deserializeUser(async (id, done) => {
  const sqlconnect = sql.createConnection({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE
  });
  sqlconnect.query(`SELECT * FROM user_data WHERE user_discord_id = '${id}'`, function (err, user){
    let user_data = user[0]
    console.log(`deserializeUser...,${user[0]}`)
    if(user_data)
      done(err, user_data);

  })
  sqlconnect.end(function(err){
    if (err) throw err
    else{
      console.log('connection Closed!')
    }
  })

});

//create method to Authorize with discord OAuth2
////Setup ID & Secret For OAUTH Application
passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret:process.env.CLIENT_SECRET,
  callbackURL: process.env.CLIENT_REDIRECT,

  //request User.data that needed
  scope : ['identify', 'email'],

    //output data
}, (accessToken,refreshToken,profile,done) => {
  //logging data from profile
  console.log(profile.username,profile.email,profile.id,'#',profile.discriminator)

  //set try catch to prevent serious error (will return fail to Authorize)
  try {
    //setup sql connection
    const sqlconnect = sql.createConnection({
      user: process.env.USER,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      database: process.env.DATABASE
    });
    //connect to SQL_DB
    sqlconnect.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    //find user EXISTED in DB with user_discord_id
    sqlconnect.query(`SELECT * FROM user_data WHERE user_discord_id = '${profile.id}'`, function (err, user) {
      if (user && Array.isArray(user) && user.length > 0){
        console.log('user logged in')
        sqlconnect.query(`UPDATE user_data SET user_email = '${profile.email}', discriminator= '${profile.discriminator}', user_discord_name = '${profile.username}' WHERE user_discord_id = ${profile.id};`)
        let user_data = user[0]
        console.log(user_data)
        done(null,user_data);

      }

      //In case not found createOne
      else{
        console.log(`User ${profile.id}#${profile.discriminator} not found`);

        let date_ob = new Date();
        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let timestamps = year + "-" + month + "-" + date + " " + '00'+":"+'00'+":"+'00';
        //creat new user in db
        sqlconnect.query("INSERT INTO `user_data` (`user_discord_id`, `user_email`, `discriminator`, `user_discord_name`, `user_create_time`, `user_club_1`, `user_club_2`, `user_club_3`)" + `VALUES ('${profile.id}','${profile.email}','${profile.discriminator}','${profile.username}','${timestamps}','','','')`)

        //check if the user is created
        sqlconnect.query(`SELECT * FROM user_data WHERE user_discord_id = '${profile.id}'`, function (err, user) {
          console.log(`userID : ${profile.id} `)
          if (err) throw (err)
          else{
            console.log('user created successfully')
            let user_data = user[0]

            done(null, user_data);
          }

        });

      }
      //END connection to SQL_DB
      sqlconnect.end(function(err, result){
        if (err) throw err;
        else{
          console.log('connection Closed!')
        };
      })

    });


  });

  }
  catch(err){
    console.log(err)
    done(null, err)
  }
  console.log('finish')
}));
