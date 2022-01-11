const router = require('express').Router();

router.get('/', (req , res) => {
  res.render(__dirname +'/views/page2.ejs')

});

module.exports = router;
