var express = require("express");
var router = express.Router();

const { MongoNote } = require("../db/note.js");
const { readNoteScope, writeNoteScope } = require("../utils/scopes.js");

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

router.get("/note", async function (req, res, next) {
  console.log(req.user);
  if (!req.user?.scope?.includes(readNoteScope)) {
    return next({ status: 401, message: "Unauthorized" });
  }
  const notes = await MongoNote.find({ userId: req.user.sub });
  res.json(notes);
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
