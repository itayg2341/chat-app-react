const Messages = require("../models/messageModel");
const fs = require("fs");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        file: msg.message.file,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, file } = req.body;
    let filePath = null;
    if (file) {
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}`;
      const fileData = Buffer.from(file, "base64");
      filePath = `uploads/${fileName}`;
      fs.writeFileSync(filePath, fileData);
    }
    const data = await Messages.create({
      message: { text: message, file: filePath },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
