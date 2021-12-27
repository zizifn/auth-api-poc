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
  res.json({ test: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dignissimos autem fuga voluptate, nisi pariatur vel eos accusantium officiis sed ipsum distinctio tempore voluptates natus. Perspiciatis est obcaecati assumenda nobis reprehenderit perferendis aperiam debitis, quis amet ab vero recusandae explicabo nostrum adipisci doloremque. Voluptas et excepturi, quos ipsa consequuntur veritatis?' })
});
module.exports = router;
