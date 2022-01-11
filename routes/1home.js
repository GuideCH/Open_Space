const router = require('express').Router();

router.get('/', (req, res) => {
  res.render(__dirname +'/views/home.ejs')
});

module.exports = router;
