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
router.post("/note", async function (req, res, next) {
  if (!req.user?.scope?.includes(writeNoteScope)) {
    return next({ status: 401, message: "not allow create note" });
  }
  const note = new MongoNote({
    content: req.body.content,
    important: req.body.important || false,
    date: new Date(),
    userId: req.user?.sub,
  });
  console.log(note);
  const savedNote = await note.save();
  res.json(savedNote);
});
router.delete("/note/:id", function (req, res, next) {
  res.json(notes);
});
router.put("/note/:id", function (req, res, next) {
  res.json(notes);
});

module.exports = router;
