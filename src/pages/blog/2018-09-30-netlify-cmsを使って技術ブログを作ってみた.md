---
templateKey: blog-post
title: netlify cmsを使って技術ブログを作ってみた
date: 2018-09-30T12:50:23.296Z
description: netlify cmsを使って技術ブログを作ってみた
tags:
  - ''
---
## 概要
その名も、[HourTimer](https://hourtimer.netlify.com/) !
一時間を測るだけという、シンプルなデスクトップアプリです。

Vue.jsの勉強もかねて、、[electron-vue](https://github.com/SimulatedGREG/electron-vue)を使ってみました。
[日本語ドキュメント](https://simulatedgreg.gitbooks.io/electron-vue/content/ja/)

[こちら](https://hourtimer.netlify.com/)からダウンロードできますが、
配布サイトは適当に作ったので、クオリティは気にしないでくださいｗ
また、署名の問題でエラーが出てくるかもしれませんが、ウイルスなどはありません。
証拠に、[ソースコード](https://github.com/Spice-Z/hourTimer)を公開しておきます。笑

## アプリ概要
アプリの機能は、**一時間を測る**という単純なものです。
見た目はこんな感じ。
<img width="430" alt="スクリーンショット 2018-06-17 18.19.58.png" src="https://qiita-image-store.s3.amazonaws.com/0/201590/cf327d53-2c45-6eb2-8f9c-6a7988042a6c.png">

再生ボタンを押すと、タイマーが起動します。
![hourtimermov.mov.gif](https://qiita-image-store.s3.amazonaws.com/0/201590/ddaeddd7-1750-47c7-bd0b-0e1ee0e49990.gif)

停止ボタンでタイマーはストップします。
一度ストップすると、アプリを閉じてもMacを閉じても、
残り時間は保持される機能も付きです！

リセットボタンで、残り時間が一時間に戻ります。

以下、[ソースコード](https://github.com/Spice-Z/hourTimer)をもとに、
実装などを紹介していきます！

## まず、electron-vueとは？
[electron](https://electronjs.org/)は、javascriptを使ってデスクトップアプリを開発するフレームワーク、
[Vue.js](https://jp.vuejs.org/index.html)はjavascriptの便利なライブラリです。

では、electron-vueとは何でしょうか？
[日本語ドキュメント](https://simulatedgreg.gitbooks.io/electron-vue/content/ja/)から引用すると、以下のように書いてあります。
>vue で構築された electron アプリケーションを作成するためのボイラープレートです(名前から分かるように)。

ということです（名前からわかるように）！

説明については、[日本語ドキュメント](https://simulatedgreg.gitbooks.io/electron-vue/content/ja/)や、他の方のQiita記事でわかりやすいものがあるので、詳しくはそちらを御覧ください！
[2017年度版 electron-vueで始めるVue.js](https://qiita.com/1ntegrale9/items/6e233f03b8cbff0b3c76)

また、[electron](https://electronjs.org/)や[Vue.js](https://jp.vuejs.org/index.html)自体についても、公式のドキュメントが充実しています。
そちらをご覧くださいませ！


## 時間をカウントする実装
普段、javascriptを書いているのですが、時間を測る実装方法を知りませんでした。
そこでgoogleすると、以下のようなサイトがヒットしました！😀
[Vue.js でタイマーを作る](https://www.slideshare.net/mizdra/vuejs-73305688)
[Vue.js でシンプルなストップウォッチを作ってみた](https://webman-japan.com/playground/vue-simple-stopwatch/)

どうやら、[requestAnimationFrame](https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame)というメソッドを使うのがよさげでしたので、使ってみました。

該当するファイルは[Timer.vue](https://github.com/Spice-Z/hourTimer/blob/master/src/renderer/components/Timer.vue)
になります。
その中で,startTimer,stopTimerというメソッドが主です。

```js:startTimer
...
    startTimer: function() {
      let vm = this;
      if (this.remainTime == 0) {
        this.remainTime = 3600000;
      }
      vm.isCount = true;
      vm.startedTime = Math.floor(performance.now() - vm.diffTime);
      (function loop() {
        let loopfps = vm.diffTime;
        vm.nowTime = Math.floor(performance.now());
        vm.diffTime = vm.nowTime - vm.startedTime;
        vm.remainTime -= vm.diffTime - loopfps;
        if (vm.remainTime % 10000 < 20) {
          localStorage.setItem("remainTime", vm.remainTime);
        }
        if (vm.remainTime > 0) {
          vm.animateFrame = requestAnimationFrame(loop);
        } else {
          vm.finishTimer();
        }
      })();
    }
```
ここから、時間をカウントする部分だけ切り取ると、、、

```js
(function loop() {
  let preDiffTime = vm.diffTime;
  vm.nowTime = Math.floor(performance.now());
  vm.diffTime = vm.nowTime - vm.startedTime;
  vm.remainTime -= vm.diffTime - preDiffTime;

  if (vm.remainTime > 0) {
    vm.timeCountFrame = requestAnimationFrame(loop);
  } else {
    vm.finishTimer();
  }
 })();

```
残り時間は　```vm.remainTime```で、これが０になるまでカウントを続けます。
stopTimerメソッドでは```cancelAnimationFrame(this.timeCountFrame)```を実行することで、カウントを止めています。

## タイマーの見た目はどう実装する
できるだけ楽をしたかったので、円を描いているいい感じのライブラリを探しました。
そこで[chart.js](http://www.chartjs.org/docs/latest/),[vue-chartjs](http://vue-chartjs.org/#/home)を見つけて

「円グラフを使えば楽にできるのでは・・・？🤔」

と思いつき、実装を試みたのですが・・・。
　
挫折しました😅

なので、素直にhtmlのcanvas要素を使いました！😆
### canvasで困ったこと
canvasでタイマーを作成するにあたって困ったことがいくつか・・・。
#### canvasのレスポンシブ対応
単純にレスポンシブにすると、windowを大きくしたときにcanvas内がジャグジャグしてしまう問題にぶち当たりました。
解決策としては、あらかじめ大きく作ったcanvas要素を縮小・拡大することにしました。
```
<canvas id="timerLine" width="1000" height="1000"></canvas>
```
こんな感じ！

### タイマーのアニメーション
canvasの中に円を描く事自体は簡単なのですが、canvasをどうやって動的に書き換えようか、少し悩みました。
結論としては、予め書いておいたベージュの円に上書きする形で、黒の円を描くことにしました。
[TimerLine.vue](https://github.com/Spice-Z/hourTimer/blob/master/src/renderer/components/TimerLine.vue)が該当するファイルです。

```js:TimerLine.vue
...
mounted: function() {
    const timerLine = document.getElementById("timerLine");
    this.ctx = timerLine.getContext("2d");
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.lineWidth = 50;
    ctx.strokeStyle = "#F5E5B3";
    ctx.arc(500, 500, 450, 0 * Math.PI / 180, 360 * Math.PI / 180);
    ctx.stroke();
    ctx.closePath();
    let img = new Image();
    img.src = require("../assets/pencil.png");
    img.onload = function() {
      ctx.drawImage(img, 250, 250, 500, 500);
    };

    ctx.lineWidth = 51;
    ctx.strokeStyle = "#1D1C22";

    ctx.beginPath();
    let remainAngle = (60 - this.remainMin) * 6 - 90;
    ctx.arc(500, 500, 450, -90 * Math.PI / 180, remainAngle * Math.PI / 180);
    ctx.stroke();
    ctx.closePath();
  },
  updated: function() {
    if (this.remainMin == 60) {
      this.initTimer();
      return;
    }
    let ctx = this.ctx;
    ctx.strokeStyle = "#1D1C22";
    ctx.beginPath();
    let remainAngle = (60 - this.remainMin) * 6 - 90;
    ctx.arc(500, 500, 450, -90 * Math.PI / 180, remainAngle * Math.PI / 180);
    ctx.stroke();
    ctx.closePath();
  },
```
残り時間が一分減るごとに、6度分長い黒線を描いています。
[vueのライフサイクルフック](https://jp.vuejs.org/v2/guide/instance.html#%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%95%E3%83%83%E3%82%AF)であるmounted,updatedを使用することで、canvasを動的に描くことは割と簡単に実装できました😚

## アプリを閉じても残り時間を保持する
個人的に、これが一番欲しかった機能です。
しかし、実装はかなり単純で、localstorageを使うだけです。

```js:Timer.vueのstopTimerメソッド
stopTimer: function() {
   cancelAnimationFrame(this.timeCountFrame);
   this.isCount = false;
   localStorage.setItem("remainTime", this.remainTime);
}
```
この三行目で,残り時間を
localStorageに保存しています。

あとの詳細については、[実際のコード](https://github.com/Spice-Z/hourTimer)を見るのが早いと思います！
質問やissueなどしてくださると,泣いて喜びます😂

## とりあえず作ってみた感想
いつもweb触っている人なら、electronを使えば簡単に、いつもと変わらない開発方法で
デスクトップアプリが開発できると実感しました！
今回のレベルだと、わざわざvueを使う必要がなかった気もしますが・・・
まあ、とりあえずよしとします！笑
人に見せられるレベルまで作れてよかったです！

## 今後実装してみたい機能
今回は、electronのAPIは叩いていないので、それらを使う機能を加えてみたい！
加えやすいのは、「通知を出す」とかかなあ・・・。

また、もともと「一日一時間頑張る」ために使うことを想定していたので、
毎日の頑張った時間を記録できる機能がつけれたらいいなあ、と思っています。
