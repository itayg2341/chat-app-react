const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/addmsg/", upload.single("file"), addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;
