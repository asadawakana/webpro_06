const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  let judgement = '';

  if(hand==cpu){
    judgement = 'あいこ';
  }else if(
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ){
    judgement = '勝ち';
    win += 1;
  }else{
    judgement = '負け';
  }

  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/random", (req, res) => {
  console.log('Received query:', req.query);

  let hand = Number(req.query.hand);  // 手を数値に変換
  let win = Number(req.query.win);    // 勝ち数を数値に変換
  let total = Number(req.query.total); // 試合数を数値に変換

  // NaNでないかをチェック
  if (isNaN(win)) win = 0;
  if (isNaN(total)) total = 0;

  console.log({ hand, win, total });

  // ランダムな数字 (1～6) を生成
  const num = Math.floor(Math.random() * 6) + 1;
  let cpu = num;  // CPUの数字

  // 判定
  let judgement = '';
  if (hand === cpu) {
    judgement = '引き分け';
  } else if (hand > cpu) {
    judgement = '勝ち';
    win += 1; // 勝ちの場合、勝利数を+1
  } else {
    judgement = '負け';
  }

  total += 1;  // 試合数を+1

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render('random', display);
});


app.get("/fortune", (req, res) => {
  // クエリパラメータからユーザーが入力した数字を取得
  const num = Number(req.query.number);  // 数字がない場合は NaN になる
  
  let fortune = '';

    if (num % 2 === 0) {
      fortune = '大吉';
    } else if (num % 3 === 0) {
      fortune = '吉';
    } else if (num % 5 === 0) {
      fortune = '中吉';
    }else if (num % 7 === 0) {
      fortune = '小吉';
    }
     else {
      fortune = '凶';
    }
  

  // コンソールに運勢を表示（デバッグ用）
  console.log('今日の運勢は' + fortune);

  // EJSテンプレートをレンダリングし、結果を表示
  res.render('fortune', { number: num, fortune: fortune });
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
