var express = require("express");
var router = express.Router();

const notes = [
  {
    id: 1,
    content: "this is test note",
  },
  {
    id: 2,
    content: "this is test note",
  },
];

router.get("/", async function (req, res, next) {
  let login = 'not login';
  if (req.session.login) {
    login = "login";
  }
  res.cookie('cookieName', 'test', { maxAge: 900000, httpOnly: true });
  res.render('session', { login });
});
router.post("/login", async function (req, res, next) {
  let message = "not login";
  if (req.body.username === 'admin' && req.body.pwd === 'admin') {
    req.session.login = true;
    message = "login success"
  }
  res.json({ message })
});


router.post("/json", async function (req, res, next) {
  if (req.session.login) {
    res.json(notes)
  } else {
    res.json({ message: 'no login' })
  }
});

router.post("/json", async function (req, res, next) {
  if (req.session.login) {
    res.json(notes)
  } else {
    res.json({ message: 'no login' })
  }
});

module.exports = router;
