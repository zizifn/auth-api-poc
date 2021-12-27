var express = require("express");
var path = require('path');
var router = express.Router();


router.get("/", async function (req, res, next) {
  res.render('cross-origin', { test: 1 });
});

router.get("/favicon.ico", async function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/favicon.ico'));
});
router.post("/json", async function (req, res, next) {
  res.json(req.body)
});
router.get("/json", async function (req, res, next) {
  res.json({ test: 'json' })
});
module.exports = router;
