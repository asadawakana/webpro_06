"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // JSONを使用する

// 投稿チェック
app.post("/check", (req, res) => {
  res.json({ number: bbs.length });
});

// メッセージを読み込む
app.post("/read", (req, res) => {
  const start = Number(req.body.start);
  console.log("read -> " + start);
  if (start == 0) res.json({ messages: bbs });
  else res.json({ messages: bbs.slice(start) });
});

// メッセージ投稿
app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  console.log([name, message]);
  // 新しいメッセージを配列に追加
  bbs.push({ id: bbs.length + 1, name: name, message: message, likes: 0 });
  res.json({ number: bbs.length });
});

// メッセージ削除
app.post("/deleteBbs", (req, res) => {
  const id = Number(req.body.id);
  bbs = bbs.filter(msg => msg.id !== id);
  res.json({ message: 'Deleted successfully' });
});

// メッセージ編集
app.post("/editBbs", (req, res) => {
  const id = Number(req.body.id);
  const newMessage = req.body.message;
  const message = bbs.find(msg => msg.id === id);
  if (message) {
    message.message = newMessage;
    res.json({ message: 'Updated successfully' });
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

// いいね処理
app.post("/likeBbs", (req, res) => {
  const id = Number(req.body.id);
  const message = bbs.find(msg => msg.id === id);
  if (message) {
    message.likes += 1;
    res.json({ likes: message.likes });
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
