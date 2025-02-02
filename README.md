# webpro_06
## このプログラムについて
### ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけん開始の画面
views/janken.ejs | じゃんけんのテンプレートファイル
public/random.html |  数字ジャッジ開始の画面
views/random.ejs | 数字ジャッジのテンプレートファイル
public/fortune.html | 占いの開始の画面
views/fortune.ejs | 占いのテンプレートファイル

###　機能と手順
#### サーバの起動方法
1.```cd　ディレクトリ名```で指定したディレクトリに移動する．
今回は```WEBPRO_06```に移動する．

2.```node jsファイル```でサーバを起動する．
今回は，```node app5.js```と書き，```Example app listening on port 8080!```と表示されれば，サーバの起動に成功．

#### Githubに書き換えたファイルを追加する方法
1.```git add .```を入力する．

2.```git commit -am 'コメント'```を入力する．コメントは必要なことを書く．

3.```git push```を入力する．

4.アクセストークンを入力する．

#### じゃんけんの機能
1.```hand```では，入力した文字であるグー，チョキ，パーのどれか，```win```では，```hand```が```cpu```に買った回数，```total```では，勝負した全体の回数を格納する．

2.```const num = Math.floor( Math.random() * 3 + 1 );```で1から3までの乱数を発生させる．```num```が1のときはグー，2のときはチョキ，3のときはパーと，```cpu```をランダムに決定する．

3.```hand```と```cpu```が同じ手を出した場合には，あいことする．
また，```hand```がグー```cpu```がチョキ，```hand```がチョキ```cpu```がパー，```hand```がパー```cpu```がグーの場合には，勝ちとして，```win```を1回増やす．
それ以外の場合を負けとする．その結果を```judgement```に格納する．

4.勝敗に関係なく，```total```を1回増加する．

5.```display```に```cpu```，```hand```，```judgement```，```win```，```total```を格納する．

6.```display```がプラウザに表示される．

#### じゃんけんの機能のフローチャート

```mermaid
flowchart TD;

start["開始"];
end1["終了"]

generateCpu["cpuを決める"]
judgement{"勝敗の判定"}
winUpdate["勝ち数の更新"]
totalUpdate["試合回数の更新"]
display["結果の表示"]
numGen["乱数: 1〜3"]
cpu["cpu: 1=グー, 2=チョキ, 3=パー"]
hand["hand:グー，チョキ，パー"]

start --> numGen
start --> hand
numGen --> generateCpu
generateCpu --> cpu
hand --> judgement
cpu --> judgement
judgement -->|あいこ| display
judgement -->|勝ち| winUpdate
winUpdate --> display
judgement -->|負け| display
display --> totalUpdate
totalUpdate --> end1
```


#### じゃんけんの使用手順
1.```app5.js```でプログラムを起動する．

2.Webプラウザでlocalhost:8080/public/janken.htmlにアクセスする．

3.自分の手でグー，チョキ，パーのいずれかを入力する．

#### 数比べの機能

1.```hand```，```win```，```total```を数値に変換する．

2.```win```，```total```が```NaN```でないかを確認する．

3.```const num = Math.floor( Math.random() * 6 + 1 );```で1から6までの乱数を発生させて，```num```を```cpu```とする．

4.```hand```と```cpu```が同じ数の場合には，あいこ，```hand```の方が```cpu```より大きい場合には，勝ちとし，```win```を1回増やす．
それ以外の場合を負けとする．その結果を```judgement```に格納する．

5.勝敗に関係なく，```total```を1回増加する．

6.```display```に```cpu```，```hand```，```judgement```，```win```，```total```を格納する．

7.```display```がプラウザに表示される．

#### 数比べの機能のフローチャート

```mermaid
flowchart TD;

start["開始"];
end1["終了"]

generateCpu["cpuを決める"]
judgement{"勝敗の判定"}
winUpdate["勝ち数の更新"]
totalUpdate["試合回数の更新"]
display["結果の表示"]
numGen["乱数: 1〜6"]
cpu["cpu=num:1〜6"]
hand["hand:1〜6"]

start --> numGen
start --> hand
numGen --> generateCpu
generateCpu --> cpu
hand --> judgement
cpu --> judgement
judgement -->|あいこ| display
judgement -->|勝ち| winUpdate
winUpdate --> display
judgement -->|負け| display
display --> totalUpdate
totalUpdate --> end1
```

#### 数比べの使用手順
1.```app5.js```でプログラムを起動する．

2.Webプラウザでlocalhost:8080/public/random.htmlにアクセスする．

3.自分の手で1から6までの数字を入力する．


#### 占いの機能

1.```num```が 2の倍数の場合，```fortune```に大吉，
```num```が 3の倍数の場合，```fortune```に中吉，
```num```が 5の倍数の場合，```fortune```に吉，
```num```が 7の倍数の場合，```fortune```に小吉，
それ以外は凶とする．

2.```  console.log('今日の運勢は' + fortune);```で結果を表示する．

3.```number```と```fortune```がプラウザに表示される．

#### 占いの機能のフローチャート

```mermaid
flowchart TD;

start["開始"];
end1["終了"]

judgement{"勝敗の判定"}
display["結果の表示"]
hand["num:1~100"]
fortune["運勢"]

start --> hand
hand --> judgement
judgement -->|2の倍数| fortune
judgement -->|3の倍数| fortune
judgement -->|5の倍数| fortune
judgement -->|7の倍数| fortune
judgement -->|それ以外の数| fortune
fortune --> display
display --> end1
```

#### 占いの使用手順
1.```app5.js```でプログラムを起動する．

2.Webプラウザでlocalhost:8080/public/fortune.htmlにアクセスする．

3.自分の手で1から100までの数字を入力する．

