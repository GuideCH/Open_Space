const router = require('express').Router();
const passport = require('passport');

try {
//see - > third_party/discord_oauth
router.get('/discord', passport.authenticate('discord'));
//-------------------------------------------------------

router.get('/redirect', passport.authenticate('discord',{
  failureRedirect: '/'
}), (req,res, next) => {
  console.log(req.user + ' has logged in.')
  res.redirect('/club_list');
});
}
catch{
  console.log('error when request to /auth/???')
}


module.exports = router;
