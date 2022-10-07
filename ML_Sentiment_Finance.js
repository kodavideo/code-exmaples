//a deep learning model that fits NLP sentiment to financial oscillators to derive a sentiment momentum indicator

module.exports = async function (msg, args) {

  const tf = require('@tensorflow/tfjs');
  require('@tensorflow/tfjs-node')
  var Sentiment = require('sentiment');
  const puppeteer = require('puppeteer');
  const cheerio = require('cheerio');

  //model 12 > 10 > 8 > 24 > 5
  //

  async function main() {

    // SEARCH VARIABLES
    let search;
    if (args.length > 0) {
      search = args.join(" ");
    }

    msg.channel.send(
      "processing deep-ly learned sentiments for 12 imagined comments about " + search + ". thank you for choosing [buni]."
     );
     msg.channel.send(
       "[TRAINING MODE] - input sentiment scores based on sentiment.js using AFINN-165 wordlist and aiツemojiツ analysis. " +
       "DISCLAIMER: sentiment is by nature subjective. input variables may not be representative of ground truth."
      );


    // INDICATOR SCRAPE: TRADING VIEW

    const browser = await puppeteer.launch({
      headless: true,
    });

    const trngTickers1 = ['BTCUSD'];
    const trngTickers2 = ['NASDAQ-TSLA'];
    const trngTickers3 = ['DOGEUSD'];
    const trngTickers4 = ['DOGEEUR'];
    const trngTickers5 = ['NYSE-GOLD'];
    const trngTickers6 = ['AMEX-SPY'];
    const trngTickers7 = ['ETHUSD'];
    const trngTickers8 = ['LTCUSD'];
    const trngTickers9 = ['TVC-DJI'];
    const trngTickers10 = ['NASDAQ-AAPL'];

    const yrngTickers1 = ['BTC-USD'];
    const yrngTickers2 = ['TSLA'];
    const yrngTickers3 = ['DOGE-USD'];
    const yrngTickers4 = ['DOGE-EUR'];
    const yrngTickers5 = ['GOLD'];
    const yrngTickers6 = ['SPY'];
    const yrngTickers7 = ['ETH-USD'];
    const yrngTickers8 = ['LTC-USD'];
    const yrngTickers9 = ['^DJI'];
    const yrngTickers10 = ['AAPL'];

    const tickersRNG1 = 0
    const tickersRNG2 = 0
    const tickersRNG3 = 0
    const tickersRNG4 = 0
    const tickersRNG5 = 0
    const tickersRNG6 = 0
    const tickersRNG7 = 0
    const tickersRNG8 = 0
    const tickersRNG9 = 0
    const tickersRNG10 = 0

    console.log(trngTickers1[tickersRNG1]);
    console.log(trngTickers2[tickersRNG2]);
    console.log(trngTickers3[tickersRNG3]);
    console.log(trngTickers4[tickersRNG4]);
    console.log(trngTickers5[tickersRNG5]);
    console.log(trngTickers6[tickersRNG6]);
    console.log(trngTickers7[tickersRNG7]);
    console.log(trngTickers8[tickersRNG8]);
    console.log(trngTickers9[tickersRNG9]);
    console.log(trngTickers10[tickersRNG10]);


      // ticker order must match tickersY order
    const tickers = [
      trngTickers1[tickersRNG1],
      trngTickers2[tickersRNG2],
      trngTickers3[tickersRNG3],
      trngTickers4[tickersRNG4],
      trngTickers5[tickersRNG5],
      trngTickers6[tickersRNG6],
      trngTickers7[tickersRNG7],
      trngTickers8[tickersRNG8],
      trngTickers9[tickersRNG9],
      trngTickers10[tickersRNG10]
    ]

    const tickersY = [
      yrngTickers1[tickersRNG1],
      yrngTickers2[tickersRNG2],
      yrngTickers3[tickersRNG3],
      yrngTickers4[tickersRNG4],
      yrngTickers5[tickersRNG5],
      yrngTickers6[tickersRNG6],
      yrngTickers7[tickersRNG7],
      yrngTickers8[tickersRNG8],
      yrngTickers9[tickersRNG9],
      yrngTickers10[tickersRNG10]
    ]

    msg.channel.send(
      "Your ticker will be compared with: "+
      yrngTickers1[tickersRNG1]+", "+
      yrngTickers2[tickersRNG2]+", "+
      yrngTickers3[tickersRNG3]+", "+
      yrngTickers4[tickersRNG4]+", "+
      yrngTickers5[tickersRNG5]+", "+
      yrngTickers6[tickersRNG6]+", "+
      yrngTickers7[tickersRNG7]+", "+
      yrngTickers8[tickersRNG8]+", "+
      yrngTickers9[tickersRNG9]+", and "+
      yrngTickers10[tickersRNG10]+". Enjoy!"
     );


    const [
      tick1, tick2, tick3, tick4, tick5,
      tick6, tick7, tick8, tick9, tick10
    ] = tickers;


    // TICKER 1 INFO
    const page = await browser.newPage();
    await page.goto('https://www.tradingview.com/symbols/' + tickers[0] + '/technicals/');
    await page.setDefaultNavigationTimeout(60000);
    const content = await page.content();
    const $ = cheerio.load(content);
    const aotick1 = [];
    // Awesome Oscillator
    $(".cell-2-juHm8n").slice(16, 17).each((idx, elem) => {
      const ao = $(elem).text();
      aotick1.push(ao);
    })
    // Ichimoku Cloud
    const ictick1 = [];
    $(".cell-2-juHm8n").slice(76, 77).each((idx, elem) => {
      const ic = $(elem).text();
      ictick1.push(ic);
    })
    // Ultimate Oscillator
    const uctick1 = [];
    $(".cell-2-juHm8n").slice(34, 35).each((idx, elem) => {
      const uc = $(elem).text();
      uctick1.push(uc);
    })
    // RSI
    const rsitick1 = [];
    $(".cell-2-juHm8n").slice(4, 5).each((idx, elem) => {
      const rsi = $(elem).text();
      rsitick1.push(rsi);
    })
    // MACD
    const macdtick1 = [];
    $(".cell-2-juHm8n").slice(22, 23).each((idx, elem) => {
      const macd = $(elem).text();
      macdtick1.push(macd);
    })
    // Bull Bear Power
    const bbptick1 = [];
    $(".cell-2-juHm8n").slice(31, 32).each((idx, elem) => {
      const bbp = $(elem).text();
      bbptick1.push(bbp);
    })

    const tick1Ind = [aotick1, ictick1, uctick1, rsitick1, macdtick1, bbptick1];
    console.log(tick1Ind);



      // SENTIMENTS


    const page11 = await browser.newPage();
    await page11.goto('https://finance.yahoo.com/quote/' + tickersY[0] + '/community/');
    await page11.setDefaultNavigationTimeout(60000);
    const content11 = await page11.content();
    const $11 = cheerio.load(content11);
    const sentimenttick1 = [];
    $11(".comments-list").slice(0, 12).each((idx, elem) => {
      const sent = $(elem).text();
      sentimenttick1.push(sent);
    })

    console.log(sentimenttick1);

    let tick1String =
    sentimenttick1[0] + sentimenttick1[1] + sentimenttick1[2] + sentimenttick1[3] +
    sentimenttick1[4] + sentimenttick1[5] + sentimenttick1[6] + sentimenttick1[7] +
    sentimenttick1[8] + sentimenttick1[9] + sentimenttick1[10] + sentimenttick1[11];

      // sentiment analysis
    var sentiment = new Sentiment();
    var resulttick1 = sentiment.analyze(tick1String.replace('\n',''));
      //sentiment scores
    let tick1Score = parseFloat(resulttick1.score) / 3;
    let tick1Comparative = parseFloat(resulttick1.comparative) * 12;
    console.log(tick1Score, tick1Comparative);
    await page.close();
    await page11.close();
                          // TICKER 1 INFO END

    // TICKER 2 INFO
    const page2 = await browser.newPage();
    await page2.goto('https://www.tradingview.com/symbols/' + tickers[1] + '/technicals/');
    await page2.setDefaultNavigationTimeout(60000);
    const content2 = await page2.content();
    const $2 = cheerio.load(content2);
    const aotick2 = [];
    // Awesome Oscillator
    $2(".cell-2-juHm8n").slice(16, 17).each((idx, elem) => {
      const ao = $(elem).text();
      aotick2.push(ao);
    })
    // Ichimoku Cloud
    const ictick2 = [];
    $2(".cell-2-juHm8n").slice(76, 77).each((idx, elem) => {
      const ic = $(elem).text();
      ictick2.push(ic);
    })
    // Ultimate Oscillator
    const uctick2 = [];
    $2(".cell-2-juHm8n").slice(34, 35).each((idx, elem) => {
      const uc = $(elem).text();
      uctick2.push(uc);
    })
    // RSI
    const rsitick2 = [];
    $2(".cell-2-juHm8n").slice(4, 5).each((idx, elem) => {
      const rsi = $(elem).text();
      rsitick2.push(rsi);
    })
    // MACD
    const macdtick2 = [];
    $2(".cell-2-juHm8n").slice(22, 23).each((idx, elem) => {
      const macd = $(elem).text();
      macdtick2.push(macd);
    })
    // Bull Bear Power
    const bbptick2 = [];
    $2(".cell-2-juHm8n").slice(31, 32).each((idx, elem) => {
      const bbp = $(elem).text();
      bbptick2.push(bbp);
    })

    const tick2Ind = [aotick2, ictick2, uctick2, rsitick2, macdtick2, bbptick2];
    console.log(tick2Ind);


      // SENTIMENTS
    const page12 = await browser.newPage();
    await page12.goto('https://finance.yahoo.com/quote/' + tickersY[1] + '/community/');
    await page12.setDefaultNavigationTimeout(60000);
    const content12 = await page12.content();
    const $12 = cheerio.load(content12);
    const sentimenttick2 = [];
    $12(".comments-list").slice(0, 12).each((idx, elem) => {
      const sent = $(elem).text();
      sentimenttick2.push(sent);
    })

    console.log(sentimenttick2);

    let tick2String =
    sentimenttick2[0] + sentimenttick2[1] + sentimenttick2[2] + sentimenttick2[3] +
    sentimenttick2[4] + sentimenttick2[5] + sentimenttick2[6] + sentimenttick2[7] +
    sentimenttick2[8] + sentimenttick2[9] + sentimenttick2[10] + sentimenttick2[11];

      // sentiment analysis
    var resulttick2 = sentiment.analyze(tick2String.replace('\n',''), { language: 'en' });
      //sentiment scores
    let tick2Score = parseFloat(resulttick2.score) / 300;
    let tick2Comparative = parseFloat(resulttick2.comparative) * 12;
    console.log(tick2Score, tick2Comparative);

    await page2.close();
    await page12.close();
                          // TICKER 2 INFO END

    // TICKER 3 INFO
    const page3 = await browser.newPage();
    await page3.goto('https://www.tradingview.com/symbols/' + tickers[2] + '/technicals/');
    await page3.setDefaultNavigationTimeout(60000);
    const content3 = await page3.content();
    const $3 = cheerio.load(content3);
    const aotick3 = [];
    // Awesome Oscillator
    $3(".cell-2-juHm8n").slice(16, 17).each((idx, elem) => {
      const ao = $(elem).text();
      aotick3.push(ao);
    })
    // Ichimoku Cloud
    const ictick3 = [];
    $3(".cell-2-juHm8n").slice(76, 77).each((idx, elem) => {
      const ic = $(elem).text();
      ictick3.push(ic);
    })
    // Ultimate Oscillator
    const uctick3 = [];
    $3(".cell-2-juHm8n").slice(34, 35).each((idx, elem) => {
      const uc = $(elem).text();
      uctick3.push(uc);
    })
    // RSI
    const rsitick3 = [];
    $3(".cell-2-juHm8n").slice(4, 5).each((idx, elem) => {
      const rsi = $(elem).text();
      rsitick3.push(rsi);
    })
    // MACD
    const macdtick3 = [];
    $3(".cell-2-juHm8n").slice(22, 23).each((idx, elem) => {
      const macd = $(elem).text();
      macdtick3.push(macd);
    })
    // Bull Bear Power
    const bbptick3 = [];
    $3(".cell-2-juHm8n").slice(31, 32).each((idx, elem) => {
      const bbp = $(elem).text();
      bbptick3.push(bbp);
    })

    const tick3Ind = [aotick3, ictick3, uctick3, rsitick3, macdtick3, bbptick3];
    console.log(tick3Ind);


      // SENTIMENTS
    const page13 = await browser.newPage();
    await page13.goto('https://finance.yahoo.com/quote/' + tickersY[2] + '/community/');
    await page13.setDefaultNavigationTimeout(60000);
    const content13 = await page13.content();
    const $13 = cheerio.load(content13);
    const sentimenttick3 = [];
    $13(".comments-list").slice(0, 12).each((idx, elem) => {
      const sent = $(elem).text();
      sentimenttick3.push(sent);
    })

    console.log(sentimenttick3);

    let tick3String =
    sentimenttick3[0] + sentimenttick3[1] + sentimenttick3[2] + sentimenttick3[3] +
    sentimenttick3[4] + sentimenttick3[5] + sentimenttick3[6] + sentimenttick3[7] +
    sentimenttick3[8] + sentimenttick3[9] + sentimenttick3[10] + sentimenttick3[11];

      // sentiment analysis
    var resulttick3 = sentiment.analyze(tick3String.replace('\n',''));
      //sentiment scores
    let tick3Score = parseFloat(resulttick3.score) / 300;
    let tick3Comparative = parseFloat(resulttick3.comparative) * 12;
    console.log(tick3Score, tick3Comparative);

    await page3.close();
    await page13.close();
                          // TICKER 3 INFO END

    // TICKER 4 INFO
    const page4 = await browser.newPage();
    await page4.goto('https://www.tradingview.com/symbols/' + tickers[3] + '/technicals/');
    await page4.setDefaultNavigationTimeout(60000);
    const content4 = await page4.content();
    const $4 = cheerio.load(content4);
    const aotick4 = [];
    // Awesome Oscillator
    $4(".cell-2-juHm8n").slice(16, 17).each((idx, elem) => {
      const ao = $(elem).text();
      aotick4.push(ao);
    })
    // Ichimoku Cloud
    const ictick4 = [];
    $4(".cell-2-juHm8n").slice(76, 77).each((idx, elem) => {
      const ic = $(elem).text();
      ictick4.push(ic);
    })
    // Ultimate Oscillator
    const uctick4 = [];
    $4(".cell-2-juHm8n").slice(34, 35).each((idx, elem) => {
      const uc = $(elem).text();
      uctick4.push(uc);
    })
    // RSI
    const rsitick4 = [];
    $4(".cell-2-juHm8n").slice(4, 5).each((idx, elem) => {
      const rsi = $(elem).text();
      rsitick4.push(rsi);
    })
    // MACD
    const macdtick4 = [];
    $4(".cell-2-juHm8n").slice(22, 23).each((idx, elem) => {
      const macd = $(elem).text();
      macdtick4.push(macd);
    })
    // Bull Bear Power
    const bbptick4 = [];
    $4(".cell-2-juHm8n").slice(31, 32).each((idx, elem) => {
      const bbp = $(elem).text();
      bbptick4.push(bbp);
    })

    const tick4Ind = [aotick4, ictick4, uctick4, rsitick4, macdtick4, bbptick4];
    console.log(tick4Ind);


      // SENTIMENTS
    const page14 = await browser.newPage();
    await page14.goto('https://finance.yahoo.com/quote/' + tickersY[3] + '/community/');
    await page14.setDefaultNavigationTimeout(60000);
    const content14 = await page14.content();
    const $14 = cheerio.load(content14);
    const sentimenttick4 = [];
    $14(".comments-list").slice(0, 12).each((idx, elem) => {
      const sent = $(elem).text();
      sentimenttick4.push(sent);
    })

    console.log(sentimenttick4);

    let tick4String =
    sentimenttick4[0] + sentimenttick4[1] + sentimenttick4[2] + sentimenttick4[3] +
    sentimenttick4[4] + sentimenttick4[5] + sentimenttick4[6] + sentimenttick4[7] +
    sentimenttick4[8] + sentimenttick4[9] + sentimenttick4[10] + sentimenttick4[11];

      // sentiment analysis
    var resulttick4 = sentiment.analyze(tick4String.replace('\n',''));
      //sentiment scores
    let tick4Score = parseFloat(resulttick4.score) / 300;
    let tick4Comparative = parseFloat(resulttick4.comparative) * 12;
    console.log(tick4Score, tick4Comparative);

    await page4.close();
    await page14.close();
                          // TICKER 4 INFO END

    // TICKER 5 INFO
    const page5 = await browser.newPage();
    await page5.goto('https://www.tradingview.com/symbols/' + tickers[4] + '/technicals/');
    await page5.setDefaultNavigationTimeout(60000);
    const content5 = await page5.content();
    const $5 = cheerio.load(content5);
    const aotick5 = [];
    // Awesome Oscillator
    $5(".cell-2-juHm8n").slice(16, 17).each((idx, elem) => {
      const ao = $(elem).text();
      aotick5.push(ao);
    })
    // Ichimoku Cloud
    const ictick5 = [];
    $5(".cell-2-juHm8n").slice(76, 77).each((idx, elem) => {
      const ic = $(elem).text();
      ictick5.push(ic);
    })
    // Ultimate Oscillator
    const uctick5 = [];
    $5(".cell-2-juHm8n").slice(34, 35).each((idx, elem) => {
      const uc = $(elem).text();
      uctick5.push(uc);
    })
    // RSI
    const rsitick5 = [];
    $5(".cell-2-juHm8n").slice(4, 5).each((idx, elem) => {
      const rsi = $(elem).text();
      rsitick5.push(rsi);
    })
    // MACD
    const macdtick5 = [];
    $5(".cell-2-juHm8n").slice(22, 23).each((idx, elem) => {
      const macd = $(elem).text();
      macdtick5.push(macd);
    })
    // Bull Bear Power
    const bbptick5 = [];
    $5(".cell-2-juHm8n").slice(31, 32).each((idx, elem) => {
      const bbp = $(elem).text();
      bbptick5.push(bbp);
    })

    const tick5Ind = [aotick5, ictick5, uctick5, rsitick5, macdtick5, bbptick5];
    console.log(tick5Ind);


      // SENTIMENTS
    const page15 = await browser.newPage();
    await page15.goto('https://finance.yahoo.com/quote/' + tickersY[4] + '/community/');
    await page15.setDefaultNavigationTimeout(60000);
    const content15 = await page15.content();
    const $15 = cheerio.load(content15);
    const sentimenttick5 = [];
    $15(".comments-list").slice(0, 12).each((idx, elem) => {
      const sent = $(elem).text();
      sentimenttick5.push(sent);
    })

    console.log(sentimenttick5);

    let tick5String =
    sentimenttick5[0] + sentimenttick5[1] + sentimenttick5[2] + sentimenttick5[3] +
    sentimenttick5[4] + sentimenttick5[5] + sentimenttick5[6] + sentimenttick5[7] +
    sentimenttick5[8] + sentimenttick5[9] + sentimenttick5[10] + sentimenttick5[11];

      // sentiment analysis
    var resulttick5 = sentiment.analyze(tick5String.replace('\n',''));
      //sentiment scores
    let tick5Score = parseFloat(resulttick5.score) / 300;
    let tick5Comparative = parseFloat(resulttick5.comparative) * 12;
    console.log(tick5Score, tick5Comparative);

    await page5.close();
    await page15.close();
                          // TICKER 5 INFO END

    // TICKER 6 INFO
    const page6 = await browser.newPage();
    await page6.goto('https://www.tradingview.com/symbols/' + tickers[5] + '/technicals/');
    await page6.setDefaultNavigationTimeout(60000);
    const content6 = await page6.content();
    const $6 = cheerio.load(content6);
    const aotick6 = [];
    // Awesome Oscillator
    $6(".cell-2-juHm8n").slice(16, 17).each((idx, elem) => {
      const ao = $(elem).text();
      aotick6.push(ao);
    })
    // Ichimoku Cloud
    const ictick6 = [];
    $6(".cell-2-juHm8n").slice(76, 77).each((idx, elem) => {
      const ic = $(elem).text();
      ictick6.push(ic);
    })
    // Ultimate Oscillator
    const uctick6 = [];
    $6(".cell-2-juHm8n").slice(34, 35).each((idx, elem) => {
      const uc = $(elem).text();
      uctick6.push(uc);
    })
    // RSI
    const rsitick6 = [];
    $6(".cell-2-juHm8n").slice(4, 5).each((idx, elem) => {
      const rsi = $(elem).text();
      rsitick6.push(rsi);
    })
    // MACD
    const macdtick6 = [];
    $6(".cell-2-juHm8n").slice(22, 23).each((idx, elem) => {
      const macd = $(elem).text();
      macdtick6.push(macd);
    })
    // Bull Bear Power
    const bbptick6 = [];
    $6(".cell-2-juHm8n").slice(31, 32).each((idx, elem) => {
      const bbp = $(elem).text();
      bbptick6.push(bbp);
    })

    const tick6Ind = [aotick6, ictick6, uctick6, rsitick6, macdtick6, bbptick6];
    console.log(tick6Ind);


      // SENTIMENTS
    const page16 = await browser.newPage();
    await page16.goto('https://finance.yahoo.com/quote/' + tickersY[5] + '/community/');
    await page16.setDefaultNavigationTimeout(60000);
    const content16 = await page16.content();
    const $16 = cheerio.load(content16);
    const sentimenttick6 = [];
    $16(".comments-list").slice(0, 12).each((idx, elem) => {
      const sent = $(elem).text();
      sentimenttick6.push(sent);
    })

    console.log(sentimenttick6);

    let tick6String =
    sentimenttick6[0] + sentimenttick6[1] + sentimenttick6[2] + sentimenttick6[3] +
    sentimenttick6[4] + sentimenttick6[5] + sentimenttick6[6] + sentimenttick6[7] +
    sentimenttick6[8] + sentimenttick6[9] + sentimenttick6[10] + sentimenttick6[11];

      // sentiment analysis
    var resulttick6 = sentiment.analyze(tick6String.replace('\n',''));
      //sentiment scores
    let tick6Score = parseFloat(resulttick6.score) / 300;
    let tick6Comparative = parseFloat(resulttick6.comparative) * 12;
    console.log(tick6Score, tick6Comparative);

    await page6.close();
    await page16.close();
                          // TICKER 6 INFO END

    // TICKER 7 INFO
    const page7 = await browser.newPage();
    await page7.goto('https://www.tradingview.com/symbols/' + tickers[6] + '/technicals/');
    await page7.setDefaultNavigationTimeout(60000);
    const content7 = await page7.content();
    const $7 = cheerio.load(content7);
    const aotick7 = [];
    // Awesome Oscillator
    $7(".cell-2-juHm8n").slice(16, 17).each((idx, elem) => {
      const ao = $(elem).text();
      aotick7.push(ao);
    })
    // Ichimoku Cloud
    const ictick7 = [];
    $7(".cell-2-juHm8n").slice(76, 77).each((idx, elem) => {
      const ic = $(elem).text();
      ictick7.push(ic);
    })
    // Ultimate Oscillator
    const uctick7 = [];
    $7(".cell-2-juHm8n").slice(34, 35).each((idx, elem) => {
      const uc = $(elem).text();
      uctick7.push(uc);
    })
    // RSI
    const rsitick7 = [];
    $7(".cell-2-juHm8n").slice(4, 5).each((idx, elem) => {
      const rsi = $(elem).text();
      rsitick7.push(rsi);
    })
    // MACD
    const macdtick7 = [];
    $7(".cell-2-juHm8n").slice(22, 23).each((idx, elem) => {
      const macd = $(elem).text();
      macdtick7.push(macd);
    })
    // Bull Bear Power
    const bbptick7 = [];
    $7(".cell-2-juHm8n").slice(31, 32).each((idx, elem) => {
      const bbp = $(elem).text();
      bbptick7.push(bbp);
    })

    const tick7Ind = [aotick7, ictick7, uctick7, rsitick7, macdtick7, bbptick7];
    console.log(tick7Ind);


      // SENTIMENTS
    const page17 = await browser.newPage();
    await page17.goto('https://finance.yahoo.com/quote/' + tickersY[6] + '/community/');
    await page17.setDefaultNavigationTimeout(60000);
    const content17 = await page17.content();
    const $17 = cheerio.load(content17);
    const sentimenttick7 = [];
    $17(".comments-list").slice(0, 12).each((idx, elem) => {
      const sent = $(elem).text();
      sentimenttick7.push(sent);
    })

    console.log(sentimenttick7);

    let tick7String =
    sentimenttick7[0] + sentimenttick7[1] + sentimenttick7[2] + sentimenttick7[3] +
    sentimenttick7[4] + sentimenttick7[5] + sentimenttick7[6] + sentimenttick7[7] +
    sentimenttick7[8] + sentimenttick7[9] + sentimenttick7[10] + sentimenttick7[11];

      // sentiment analysis
    var resulttick7 = sentiment.analyze(tick7String.replace('\n',''));
      //sentiment scores
    let tick7Score = parseFloat(resulttick7.score) / 300;
    let tick7Comparative = parseFloat(resulttick7.comparative) * 12;
    console.log(tick7Score, tick7Comparative);

    await page7.close();
    await page17.close();
                          // TICKER 7 INFO END

    // TICKER 8 INFO
    const page8 = await browser.newPage();
    await page8.goto('https://www.tradingview.com/symbols/' + tickers[7] + '/technicals/');
    await page8.setDefaultNavigationTimeout(60000);
    const content8 = await page8.content();
    const $8 = cheerio.load(content8);
    const aotick8 = [];
    // Awesome Oscillator
    $8(".cell-2-juHm8n").slice(16, 17).each((idx, elem) => {
      const ao = $(elem).text();
      aotick8.push(ao);
    })
    // Ichimoku Cloud
    const ictick8 = [];
    $8(".cell-2-juHm8n").slice(76, 77).each((idx, elem) => {
      const ic = $(elem).text();
      ictick8.push(ic);
    })
    // Ultimate Oscillator
    const uctick8 = [];
    $8(".cell-2-juHm8n").slice(34, 35).each((idx, elem) => {
      const uc = $(elem).text();
      uctick8.push(uc);
    })
    // RSI
    const rsitick8 = [];
    $8(".cell-2-juHm8n").slice(4, 5).each((idx, elem) => {
      const rsi = $(elem).text();
      rsitick8.push(rsi);
    })
    // MACD
    const macdtick8 = [];
    $8(".cell-2-juHm8n").slice(22, 23).each((idx, elem) => {
      const macd = $(elem).text();
      macdtick8.push(macd);
    })
    // Bull Bear Power
    const bbptick8 = [];
    $8(".cell-2-juHm8n").slice(31, 32).each((idx, elem) => {
      const bbp = $(elem).text();
      bbptick8.push(bbp);
    })

    const tick8Ind = [aotick8, ictick8, uctick8, rsitick8, macdtick8, bbptick8];
    console.log(tick8Ind);


      // SENTIMENTS
    const page18 = await browser.newPage();
    await page18.goto('https://finance.yahoo.com/quote/' + tickersY[7] + '/community/');
    await page18.setDefaultNavigationTimeout(60000);
    const content18 = await page18.content();
    const $18 = cheerio.load(content18);
    const sentimenttick8 = [];
    $18(".comments-list").slice(0, 12).each((idx, elem) => {
      const sent = $(elem).text();
      sentimenttick8.push(sent);
    })

    console.log(sentimenttick8);

    let tick8String =
    sentimenttick8[0] + sentimenttick8[1] + sentimenttick8[2] + sentimenttick8[3] +
    sentimenttick8[4] + sentimenttick8[5] + sentimenttick8[6] + sentimenttick8[7] +
    sentimenttick8[8] + sentimenttick8[9] + sentimenttick8[10] + sentimenttick8[11];

      // sentiment analysis
    var resulttick8 = sentiment.analyze(tick8String.replace('\n',''));
      //sentiment scores
    let tick8Score = parseFloat(resulttick8.score) / 300;
    let tick8Comparative = parseFloat(resulttick8.comparative) * 12;
    console.log(tick8Score, tick8Comparative);

    await page8.close();
    await page18.close();
                          // TICKER 8 INFO END

    // TICKER 9 INFO
    const page9 = await browser.newPage();
    await page9.goto('https://www.tradingview.com/symbols/' + tickers[8] + '/technicals/');
    await page9.setDefaultNavigationTimeout(60000);
    const content9 = await page9.content();
    const $9 = cheerio.load(content9);
    const aotick9 = [];
    // Awesome Oscillator
    $9(".cell-2-juHm8n").slice(16, 17).each((idx, elem) => {
      const ao = $(elem).text();
      aotick9.push(ao);
    })
    // Ichimoku Cloud
    const ictick9 = [];
    $9(".cell-2-juHm8n").slice(76, 77).each((idx, elem) => {
      const ic = $(elem).text();
      ictick9.push(ic);
    })
    // Ultimate Oscillator
    const uctick9 = [];
    $9(".cell-2-juHm8n").slice(34, 35).each((idx, elem) => {
      const uc = $(elem).text();
      uctick9.push(uc);
    })
    // RSI
    const rsitick9 = [];
    $9(".cell-2-juHm8n").slice(4, 5).each((idx, elem) => {
      const rsi = $(elem).text();
      rsitick9.push(rsi);
    })
    // MACD
    const macdtick9 = [];
    $9(".cell-2-juHm8n").slice(22, 23).each((idx, elem) => {
      const macd = $(elem).text();
      macdtick9.push(macd);
    })
    // Bull Bear Power
    const bbptick9 = [];
    $9(".cell-2-juHm8n").slice(31, 32).each((idx, elem) => {
      const bbp = $(elem).text();
      bbptick9.push(bbp);
    })

    const tick9Ind = [aotick9, ictick9, uctick9, rsitick9, macdtick9, bbptick9];
    console.log(tick9Ind);


      // SENTIMENTS
    const page19 = await browser.newPage();
    await page19.goto('https://finance.yahoo.com/quote/' + tickersY[8] + '/community/');
    await page19.setDefaultNavigationTimeout(60000);
    const content19 = await page19.content();
    const $19 = cheerio.load(content19);
    const sentimenttick9 = [];
    $19(".comments-list").slice(0, 12).each((idx, elem) => {
      const sent = $(elem).text();
      sentimenttick9.push(sent);
    })

    console.log(sentimenttick9);

    let tick9String =
    sentimenttick9[0] + sentimenttick9[1] + sentimenttick9[2] + sentimenttick9[3] +
    sentimenttick9[4] + sentimenttick9[5] + sentimenttick9[6] + sentimenttick9[7] +
    sentimenttick9[8] + sentimenttick9[9] + sentimenttick9[10] + sentimenttick9[11];

      // sentiment analysis
    var resulttick9 = sentiment.analyze(tick9String.replace('\n',''));
      //sentiment scores
    let tick9Score = parseFloat(resulttick9.score) / 300;
    let tick9Comparative = parseFloat(resulttick9.comparative) * 12;
    console.log(tick9Score, tick9Comparative);

    await page9.close();
    await page19.close();
                          // TICKER 9 INFO END

    // TICKER 10 INFO
    const page10 = await browser.newPage();
    await page10.goto('https://www.tradingview.com/symbols/' + tickers[9] + '/technicals/');
    await page10.setDefaultNavigationTimeout(60000);
    const content10 = await page10.content();
    const $10 = cheerio.load(content10);
    const aotick10 = [];
    // Awesome Oscillator
    $10(".cell-2-juHm8n").slice(16, 17).each((idx, elem) => {
      const ao = $(elem).text();
      aotick10.push(ao);
    })
    // Ichimoku Cloud
    const ictick10 = [];
    $10(".cell-2-juHm8n").slice(76, 77).each((idx, elem) => {
      const ic = $(elem).text();
      ictick10.push(ic);
    })
    // Ultimate Oscillator
    const uctick10 = [];
    $10(".cell-2-juHm8n").slice(34, 35).each((idx, elem) => {
      const uc = $(elem).text();
      uctick10.push(uc);
    })
    // RSI
    const rsitick10 = [];
    $10(".cell-2-juHm8n").slice(4, 5).each((idx, elem) => {
      const rsi = $(elem).text();
      rsitick10.push(rsi);
    })
    // MACD
    const macdtick10 = [];
    $10(".cell-2-juHm8n").slice(22, 23).each((idx, elem) => {
      const macd = $(elem).text();
      macdtick10.push(macd);
    })
    // Bull Bear Power
    const bbptick10 = [];
    $10(".cell-2-juHm8n").slice(31, 32).each((idx, elem) => {
      const bbp = $(elem).text();
      bbptick10.push(bbp);
    })

    const tick10Ind = [aotick10, ictick10, uctick10, rsitick10, macdtick10, bbptick10];
    console.log(tick10Ind);


      // SENTIMENTS
    const page20 = await browser.newPage();
    await page20.goto('https://finance.yahoo.com/quote/' + tickersY[9] + '/community/');
    await page20.setDefaultNavigationTimeout(60000);
    const content20 = await page20.content();
    const $20 = cheerio.load(content20);
    const sentimenttick10 = [];
    $20(".comments-list").slice(0, 12).each((idx, elem) => {
      const sent = $(elem).text();
      sentimenttick10.push(sent);
    })

    console.log(sentimenttick10);

    let tick10String =
    sentimenttick10[0] + sentimenttick10[1] + sentimenttick10[2] + sentimenttick10[3] +
    sentimenttick10[4] + sentimenttick10[5] + sentimenttick10[6] + sentimenttick10[7] +
    sentimenttick10[8] + sentimenttick10[9] + sentimenttick10[10] + sentimenttick10[11];

      // sentiment analysis
    var resulttick10 = sentiment.analyze(tick10String.replace('\n',''));
      //sentiment scores
    let tick10Score = parseFloat(resulttick10.score) / 300;
    let tick10Comparative = parseFloat(resulttick10.comparative) * 12;
    console.log(tick10Score, tick10Comparative);

    await page10.close();
    await page20.close();
                          // TICKER 10 INFO END

    let url = 'https://www.tradingview.com/symbols/'+search.toUpperCase()+'/technicals/'

    // TICKER SEARCH INFO
    const pageS = await browser.newPage();
    await pageS.goto(url);
    await pageS.setDefaultNavigationTimeout(60000);
    const contentS = await pageS.content();
    const $s = cheerio.load(contentS);
    const aotickS = [];
    // Awesome Oscillator
    $s(".cell-2-juHm8n").slice(16, 17).each((idx, elem) => {
      const ao = $(elem).text();
      aotickS.push(ao);
    })
    // Ichimoku Cloud
    const ictickS = [];
    $s(".cell-2-juHm8n").slice(76, 77).each((idx, elem) => {
      const ic = $(elem).text();
      ictickS.push(ic);
    })
    // Ultimate Oscillator
    const uctickS = [];
    $s(".cell-2-juHm8n").slice(34, 35).each((idx, elem) => {
      const uc = $(elem).text();
      uctickS.push(uc);
    })
    // RSI
    const rsitickS = [];
    $s(".cell-2-juHm8n").slice(4, 5).each((idx, elem) => {
      const rsi = $(elem).text();
      rsitickS.push(rsi);
    })
    // MACD
    const macdtickS = [];
    $s(".cell-2-juHm8n").slice(22, 23).each((idx, elem) => {
      const macd = $(elem).text();
      macdtickS.push(macd);
    })
    // Bull Bear Power
    const bbptickS = [];
    $s(".cell-2-juHm8n").slice(31, 32).each((idx, elem) => {
      const bbp = $(elem).text();
      bbptickS.push(bbp);
    })

    const tickSInd = [aotickS, ictickS, uctickS, rsitickS, macdtickS, bbptickS];
    console.log(tickSInd);
        // TICKER SEARCH INFO END

    await pageS.close();
    browser.close(); // Close chromium
    console.log("Scraping complete, training will now commense.");


    // NORMALIZED INDICATOR FOR INCREASED ACCURACY
      //TRANSPOSED INDICATOR
    const aoInd10 = [parseFloat(tick1Ind[0][0].replace("−", "-")), parseFloat(tick2Ind[0][0].replace("−", "-")), parseFloat(tick3Ind[0][0].replace("−", "-")), parseFloat(tick4Ind[0][0].replace("−", "-")), parseFloat(tick5Ind[0][0].replace("−", "-")), parseFloat(tick6Ind[0][0].replace("−", "-")), parseFloat(tick7Ind[0][0].replace("−", "-")), parseFloat(tick8Ind[0][0].replace("−", "-")), parseFloat(tick9Ind[0][0].replace("−", "-")), parseFloat(tick10Ind[0][0].replace("−", "-"))];
    const icInd10 = [parseFloat(tick1Ind[1][0].replace("−", "-")), parseFloat(tick2Ind[1][0].replace("−", "-")), parseFloat(tick3Ind[1][0].replace("−", "-")), parseFloat(tick4Ind[1][0].replace("−", "-")), parseFloat(tick5Ind[1][0].replace("−", "-")), parseFloat(tick6Ind[1][0].replace("−", "-")), parseFloat(tick7Ind[1][0].replace("−", "-")), parseFloat(tick8Ind[1][0].replace("−", "-")), parseFloat(tick9Ind[1][0].replace("−", "-")), parseFloat(tick10Ind[1][0].replace("−", "-"))];
    const ucInd10 = [parseFloat(tick1Ind[2][0].replace("−", "-")), parseFloat(tick2Ind[2][0].replace("−", "-")), parseFloat(tick3Ind[2][0].replace("−", "-")), parseFloat(tick4Ind[2][0].replace("−", "-")), parseFloat(tick5Ind[2][0].replace("−", "-")), parseFloat(tick6Ind[2][0].replace("−", "-")), parseFloat(tick7Ind[2][0].replace("−", "-")), parseFloat(tick8Ind[2][0].replace("−", "-")), parseFloat(tick9Ind[2][0].replace("−", "-")), parseFloat(tick10Ind[2][0].replace("−", "-"))];
    const rsiInd10 = [parseFloat(tick1Ind[3][0].replace("−", "-")), parseFloat(tick2Ind[3][0].replace("−", "-")), parseFloat(tick3Ind[3][0].replace("−", "-")), parseFloat(tick4Ind[3][0].replace("−", "-")), parseFloat(tick5Ind[3][0].replace("−", "-")), parseFloat(tick6Ind[3][0].replace("−", "-")), parseFloat(tick7Ind[3][0].replace("−", "-")), parseFloat(tick8Ind[3][0].replace("−", "-")), parseFloat(tick9Ind[3][0].replace("−", "-")), parseFloat(tick10Ind[3][0].replace("−", "-"))];
    const macdInd10 = [parseFloat(tick1Ind[4][0].replace("−", "-")), parseFloat(tick2Ind[4][0].replace("−", "-")), parseFloat(tick3Ind[4][0].replace("−", "-")), parseFloat(tick4Ind[4][0].replace("−", "-")), parseFloat(tick5Ind[4][0].replace("−", "-")), parseFloat(tick6Ind[4][0].replace("−", "-")), parseFloat(tick7Ind[4][0].replace("−", "-")), parseFloat(tick8Ind[4][0].replace("−", "-")), parseFloat(tick9Ind[4][0].replace("−", "-")), parseFloat(tick10Ind[4][0].replace("−", "-"))];
    const bbpInd10 = [parseFloat(tick1Ind[5][0].replace("−", "-")), parseFloat(tick2Ind[5][0].replace("−", "-")), parseFloat(tick3Ind[5][0].replace("−", "-")), parseFloat(tick4Ind[5][0].replace("−", "-")), parseFloat(tick5Ind[5][0].replace("−", "-")), parseFloat(tick6Ind[5][0].replace("−", "-")), parseFloat(tick7Ind[5][0].replace("−", "-")), parseFloat(tick8Ind[5][0].replace("−", "-")), parseFloat(tick9Ind[5][0].replace("−", "-")), parseFloat(tick10Ind[5][0].replace("−", "-"))];
    var maxAO = Math.max.apply(null, aoInd10);
    var maxIC = Math.max.apply(null, icInd10);
    var maxUC = Math.max.apply(null, ucInd10);
    var maxRSI = Math.max.apply(null, rsiInd10);
    var maxMACD = Math.max.apply(null, macdInd10);
    var maxBBP = Math.max.apply(null, bbpInd10);

    // MODEL BEGIN
    msg.react('🕓');
    const model = tf.sequential();

    // create hidden layer
    // 'dense' is a fully connected layer
    const hidden = tf.layers.dense({
      units: 36, // number of nodes
      inputShape: [12], // input shape (nodes)
      activation: 'sigmoid',
    });

    // create hidden layer
    // 'dense' is a fully connected layer
    const hidden2 = tf.layers.dense({
      units: 72, // number of nodes
      inputShape: [36], // input shape (nodes)
      activation: 'sigmoid',
    });

    // create hidden layer
    // 'dense' is a fully connected layer
    const hidden3 = tf.layers.dense({
      units: 144, // number of nodes
      inputShape: [72], // input shape (nodes)
      activation: 'sigmoid',
    });

    //create another later
    const output = tf.layers.dense({
      units: 5,
      // no inputShape because inferred from hidden layer
      activation: 'sigmoid',
    });

    // add layers
    model.add(hidden);
    model.add(hidden2);
    model.add(hidden3);
    model.add(output);

    // An optimizer using gradient descent
    const sgdOptimizer = tf.train.sgd(0.1);
    // Model Configuration Complete - Compile
    model.compile({
      optimizer: sgdOptimizer,
      // loss: tf.losses.meanSquaredError
      loss: tf.losses.meanSquaredError
    });

    // input independent ticker data
    const xs = tf.tensor2d([
      [parseFloat(tick1Ind[0][0].replace("−", "-")), parseFloat(tick1Ind[1][0].replace("−", "-")), parseFloat(tick1Ind[2][0].replace("−", "-")),parseFloat(tick1Ind[3][0].replace("−", "-")),parseFloat(tick1Ind[4][0].replace("−", "-")),parseFloat(tick1Ind[5][0].replace("−", "-")), (parseFloat(tick1Ind[0][0].replace("−", "-"))/maxAO)-0.0000001,  (parseFloat(tick1Ind[1][0].replace("−", "-"))/maxIC)-0.0000001,  (parseFloat(tick1Ind[2][0].replace("−", "-"))/maxUC)-0.0000001,  (parseFloat(tick1Ind[3][0].replace("−", "-"))/maxRSI)-0.0000001,  (parseFloat(tick1Ind[4][0].replace("−", "-"))/maxMACD)-0.0000001,  (parseFloat(tick1Ind[5][0].replace("−", "-"))/maxBBP)-0.0000001],
      [parseFloat(tick2Ind[0][0].replace("−", "-")), parseFloat(tick2Ind[1][0].replace("−", "-")), parseFloat(tick2Ind[2][0].replace("−", "-")),parseFloat(tick2Ind[3][0].replace("−", "-")),parseFloat(tick2Ind[4][0].replace("−", "-")),parseFloat(tick2Ind[5][0].replace("−", "-")), (parseFloat(tick2Ind[0][0].replace("−", "-"))/maxAO)-0.0000001,  (parseFloat(tick2Ind[1][0].replace("−", "-"))/maxIC)-0.0000001,  (parseFloat(tick2Ind[2][0].replace("−", "-"))/maxUC)-0.0000001,  (parseFloat(tick2Ind[3][0].replace("−", "-"))/maxRSI)-0.0000001,  (parseFloat(tick2Ind[4][0].replace("−", "-"))/maxMACD)-0.0000001,  (parseFloat(tick2Ind[5][0].replace("−", "-"))/maxBBP)-0.0000001],
      [parseFloat(tick3Ind[0][0].replace("−", "-")), parseFloat(tick3Ind[1][0].replace("−", "-")), parseFloat(tick3Ind[2][0].replace("−", "-")),parseFloat(tick3Ind[3][0].replace("−", "-")),parseFloat(tick3Ind[4][0].replace("−", "-")),parseFloat(tick3Ind[5][0].replace("−", "-")), (parseFloat(tick3Ind[0][0].replace("−", "-"))/maxAO)-0.0000001,  (parseFloat(tick3Ind[1][0].replace("−", "-"))/maxIC)-0.0000001,  (parseFloat(tick3Ind[2][0].replace("−", "-"))/maxUC)-0.0000001,  (parseFloat(tick3Ind[3][0].replace("−", "-"))/maxRSI)-0.0000001,  (parseFloat(tick3Ind[4][0].replace("−", "-"))/maxMACD)-0.0000001,  (parseFloat(tick3Ind[5][0].replace("−", "-"))/maxBBP)-0.0000001],
      [parseFloat(tick4Ind[0][0].replace("−", "-")), parseFloat(tick4Ind[1][0].replace("−", "-")), parseFloat(tick4Ind[2][0].replace("−", "-")),parseFloat(tick4Ind[3][0].replace("−", "-")),parseFloat(tick4Ind[4][0].replace("−", "-")),parseFloat(tick4Ind[5][0].replace("−", "-")), (parseFloat(tick4Ind[0][0].replace("−", "-"))/maxAO)-0.0000001,  (parseFloat(tick4Ind[1][0].replace("−", "-"))/maxIC)-0.0000001,  (parseFloat(tick4Ind[2][0].replace("−", "-"))/maxUC)-0.0000001,  (parseFloat(tick4Ind[3][0].replace("−", "-"))/maxRSI)-0.0000001,  (parseFloat(tick4Ind[4][0].replace("−", "-"))/maxMACD)-0.0000001,  (parseFloat(tick4Ind[5][0].replace("−", "-"))/maxBBP)-0.0000001],
      [parseFloat(tick5Ind[0][0].replace("−", "-")), parseFloat(tick5Ind[1][0].replace("−", "-")), parseFloat(tick5Ind[2][0].replace("−", "-")),parseFloat(tick5Ind[3][0].replace("−", "-")),parseFloat(tick5Ind[4][0].replace("−", "-")),parseFloat(tick5Ind[5][0].replace("−", "-")), (parseFloat(tick5Ind[0][0].replace("−", "-"))/maxAO)-0.0000001,  (parseFloat(tick5Ind[1][0].replace("−", "-"))/maxIC)-0.0000001,  (parseFloat(tick5Ind[2][0].replace("−", "-"))/maxUC)-0.0000001,  parseFloat(tick5Ind[3][0].replace("−", "-"))/maxRSI,  (parseFloat(tick5Ind[4][0].replace("−", "-"))/maxMACD)-0.0000001,  (parseFloat(tick5Ind[5][0].replace("−", "-"))/maxBBP)-0.0000001],
      [parseFloat(tick6Ind[0][0].replace("−", "-")), parseFloat(tick6Ind[1][0].replace("−", "-")), parseFloat(tick6Ind[2][0].replace("−", "-")),parseFloat(tick6Ind[3][0].replace("−", "-")),parseFloat(tick6Ind[4][0].replace("−", "-")),parseFloat(tick6Ind[5][0].replace("−", "-")), (parseFloat(tick6Ind[0][0].replace("−", "-"))/maxAO)-0.0000001,  (parseFloat(tick6Ind[1][0].replace("−", "-"))/maxIC)-0.0000001,  (parseFloat(tick6Ind[2][0].replace("−", "-"))/maxUC)-0.0000001,  (parseFloat(tick6Ind[3][0].replace("−", "-"))/maxRSI)-0.0000001,  (parseFloat(tick6Ind[4][0].replace("−", "-"))/maxMACD)-0.0000001,  (parseFloat(tick6Ind[5][0].replace("−", "-"))/maxBBP)-0.0000001],
      [parseFloat(tick7Ind[0][0].replace("−", "-")), parseFloat(tick7Ind[1][0].replace("−", "-")), parseFloat(tick7Ind[2][0].replace("−", "-")),parseFloat(tick7Ind[3][0].replace("−", "-")),parseFloat(tick7Ind[4][0].replace("−", "-")),parseFloat(tick7Ind[5][0].replace("−", "-")), (parseFloat(tick7Ind[0][0].replace("−", "-"))/maxAO)-0.0000001,  (parseFloat(tick7Ind[1][0].replace("−", "-"))/maxIC)-0.0000001,  (parseFloat(tick7Ind[2][0].replace("−", "-"))/maxUC)-0.0000001,  (parseFloat(tick7Ind[3][0].replace("−", "-"))/maxRSI)-0.0000001,  (parseFloat(tick7Ind[4][0].replace("−", "-"))/maxMACD)-0.0000001,  (parseFloat(tick7Ind[5][0].replace("−", "-"))/maxBBP)-0.0000001],
      [parseFloat(tick8Ind[0][0].replace("−", "-")), parseFloat(tick8Ind[1][0].replace("−", "-")), parseFloat(tick8Ind[2][0].replace("−", "-")),parseFloat(tick8Ind[3][0].replace("−", "-")),parseFloat(tick8Ind[4][0].replace("−", "-")),parseFloat(tick8Ind[5][0].replace("−", "-")), (parseFloat(tick8Ind[0][0].replace("−", "-"))/maxAO)-0.0000001,  (parseFloat(tick8Ind[1][0].replace("−", "-"))/maxIC)-0.0000001,  (parseFloat(tick8Ind[2][0].replace("−", "-"))/maxUC)-0.0000001,  (parseFloat(tick8Ind[3][0].replace("−", "-"))/maxRSI)-0.0000001,  (parseFloat(tick8Ind[4][0].replace("−", "-"))/maxMACD)-0.0000001,  (parseFloat(tick8Ind[5][0].replace("−", "-"))/maxBBP)-0.0000001],
      [parseFloat(tick9Ind[0][0].replace("−", "-")), parseFloat(tick9Ind[1][0].replace("−", "-")), parseFloat(tick9Ind[2][0].replace("−", "-")),parseFloat(tick9Ind[3][0].replace("−", "-")),parseFloat(tick9Ind[4][0].replace("−", "-")),parseFloat(tick9Ind[5][0].replace("−", "-")), (parseFloat(tick9Ind[0][0].replace("−", "-"))/maxAO)-0.0000001,  (parseFloat(tick9Ind[1][0].replace("−", "-"))/maxIC)-0.0000001,  (parseFloat(tick9Ind[2][0].replace("−", "-"))/maxUC)-0.0000001,  (parseFloat(tick9Ind[3][0].replace("−", "-"))/maxRSI)-0.0000001,  (parseFloat(tick9Ind[4][0].replace("−", "-"))/maxMACD)-0.0000001,  (parseFloat(tick9Ind[5][0].replace("−", "-"))/maxBBP)-0.0000001],
      [parseFloat(tick10Ind[0][0].replace("−", "-")), parseFloat(tick10Ind[1][0].replace("−", "-")), parseFloat(tick10Ind[2][0].replace("−", "-")),parseFloat(tick10Ind[3][0].replace("−", "-")),parseFloat(tick10Ind[4][0].replace("−", "-")),parseFloat(tick10Ind[5][0].replace("−", "-")), (parseFloat(tick10Ind[0][0].replace("−", "-"))/maxAO)-0.0000001,  (parseFloat(tick10Ind[1][0].replace("−", "-"))/maxIC)-0.0000001,  (parseFloat(tick10Ind[2][0].replace("−", "-"))/maxUC)-0.0000001,  (parseFloat(tick10Ind[3][0].replace("−", "-"))/maxRSI)-0.0000001,  (parseFloat(tick10Ind[4][0].replace("−", "-"))/maxMACD)-0.0000001,  (parseFloat(tick10Ind[5][0].replace("−", "-"))/maxBBP)-0.0000001],
    ]);
    xs.print();

    const sentR = [resulttick1.score/100, resulttick2.score/100, resulttick3.score/100, resulttick5.score/100, resulttick5.score/100, resulttick6.score/100, resulttick7.score/100, resulttick8.score/100, resulttick9.score/100, resulttick10.score/100, ];
    const sentC = [resulttick1.comparative, resulttick2.comparative, resulttick3.comparative, resulttick4.comparative, resulttick5.comparative, resulttick6.comparative, resulttick7.comparative, resulttick8.comparative, resulttick9.comparative, resulttick10.comparative, ];
    var maxSR = Math.max.apply(null, sentR);
    var maxSC = Math.max.apply(null, sentC);
    console.log("MAXSR" + maxSR);
    console.log("MAXSC" + maxSC);

    // input dependent sentiment data
    const ys = tf.tensor2d([
      [resulttick1.score/300, resulttick1.comparative * 12, (resulttick1.score/100/maxSR)-0.0000001, (resulttick1.comparative/maxSC)-0.0000001, ((resulttick1.score/100/maxSR)-0.0000001 + (resulttick1.comparative/maxSC)-0.0000001) / 2],
      [resulttick2.score/300, resulttick2.comparative * 12, (resulttick2.score/100/maxSR)-0.0000001, (resulttick2.comparative/maxSC)-0.0000001, ((resulttick2.score/100/maxSR)-0.0000001 + (resulttick2.comparative/maxSC)-0.0000001) / 2],
      [resulttick3.score/300, resulttick3.comparative * 12, (resulttick3.score/100/maxSR)-0.0000001, (resulttick3.comparative/maxSC)-0.0000001, ((resulttick3.score/100/maxSR)-0.0000001 + (resulttick3.comparative/maxSC)-0.0000001) / 2],
      [resulttick4.score/300, resulttick4.comparative * 12, (resulttick4.score/100/maxSR)-0.0000001, (resulttick4.comparative/maxSC)-0.0000001, ((resulttick4.score/100/maxSR)-0.0000001 + (resulttick4.comparative/maxSC)-0.0000001) / 2],
      [resulttick5.score/300, resulttick5.comparative * 12, (resulttick5.score/100/maxSR)-0.0000001, (resulttick5.comparative/maxSC)-0.0000001, ((resulttick5.score/100/maxSR)-0.0000001 + (resulttick5.comparative/maxSC)-0.0000001) / 2],
      [resulttick6.score/300, resulttick6.comparative * 12, (resulttick6.score/100/maxSR)-0.0000001, (resulttick6.comparative/maxSC)-0.0000001, ((resulttick6.score/100/maxSR)-0.0000001 + (resulttick6.comparative/maxSC)-0.0000001) / 2],
      [resulttick7.score/300, resulttick7.comparative * 12, (resulttick7.score/100/maxSR)-0.0000001, (resulttick7.comparative/maxSC)-0.0000001, ((resulttick7.score/100/maxSR)-0.0000001 + (resulttick7.comparative/maxSC)-0.0000001) / 2],
      [resulttick8.score/300, resulttick8.comparative * 12, (resulttick8.score/100/maxSR)-0.0000001, (resulttick8.comparative/maxSC)-0.0000001, ((resulttick8.score/100/maxSR)-0.0000001 + (resulttick8.comparative/maxSC)-0.0000001) / 2],
      [resulttick9.score/300, resulttick9.comparative * 12, (resulttick9.score/100/maxSR)-0.0000001, (resulttick9.comparative/maxSC)-0.0000001, ((resulttick9.score/100/maxSR)-0.0000001 + (resulttick9.comparative/maxSC)-0.0000001) / 2],
      [resulttick10.score/300, resulttick10.comparative * 12, (resulttick10.score/100/maxSR)-0.0000001, (resulttick10.comparative/maxSC)-0.0000001, ((resulttick10.score/100/maxSR)-0.0000001 + (resulttick10.comparative/maxSC)-0.0000001) / 2],
    ]);
    ys.print();
    // TENSORFLOW TRAINING CONFIGURATION
    const config = {
      epochs: 19, //90? & 1300 in for?
      // shuffleData: true,
      validationSplit: 0.3,
    }

    //fit the model outputting a loss statistic
    fitModel().then(() => {
      console.log('[TRAINING COMPLETED]');


      // PREDICTION INPUT
        //USER INPUT


        // SEARCH INPUTS TO GUESS
      const inputs = tf.tensor2d([
        [
          parseFloat(tickSInd[0][0].replace("−", "-")),
          parseFloat(tickSInd[1][0].replace("−", "-")),
          parseFloat(tickSInd[2][0].replace("−", "-")),
          parseFloat(tickSInd[3][0].replace("−", "-")),
          parseFloat(tickSInd[4][0].replace("−", "-")),
          parseFloat(tickSInd[5][0].replace("−", "-")),
          (parseFloat(tickSInd[0][0].replace("−", "-"))/maxAO)-0.0000001,
          (parseFloat(tickSInd[1][0].replace("−", "-"))/maxIC)-0.0000001,
          (parseFloat(tickSInd[2][0].replace("−", "-"))/maxUC)-0.0000001,
          (parseFloat(tickSInd[3][0].replace("−", "-"))/maxRSI)-0.0000001,
          (parseFloat(tickSInd[4][0].replace("−", "-"))/maxMACD)-0.0000001,
          (parseFloat(tickSInd[5][0].replace("−", "-"))/maxBBP)-0.0000001,
        ],
      ]);
      // Logging input tensors
      inputs.print();
      // PREDICTION OUTPUT
      let outputs = model.predict(inputs);
      outputs.print();

      // Send output to channel, saving data and model, if none of the arrays were emply
      if (tick1Ind !==null && tick2Ind !==null && tick3Ind !==null && tick4Ind !==null && tick5Ind !==null && tick6Ind !==null && tick7Ind !==null && tick8Ind !==null && tick9Ind !==null && tick10Ind !==null ) {
        msg.channel.send(String(outputs));
        const sentArr = String(outputs).split(',');
        let absSent = sentArr[0].slice(14);
        let relSent = sentArr[1];
        let absSentNorm = sentArr[2];
        let relSentNorm = sentArr[3];
        let combNorm = sentArr[4].slice(0, -1);

        console.log("Absolute Sentiment: " + absSent);
        console.log("Relative Sentiment: " + relSent);
        console.log("Normalized Absolute Sentiment: " + absSentNorm);
        console.log("Normalized Relative Sentiment: " + relSentNorm);
        console.log("Combined Normalized Sentiment: " + combNorm);

        msg.channel.send(
          "\n [x, y, z, w, i] " +
          "\n[🌓] **"+ absSent*100 +"x** *absolute AFINN-156 positivity score* [...] (0-N) x = 1 positivity point " +
          "\n[🌗]**"+ relSent +"y** *comparative score* [...] (0-N) y = {positiveScore+(-negativeScore)}/totalWords " +
          "\n[🌖] **"+ absSentNorm*10 +"z** **/10** *normalized x* [...] (0-10) z = > ~7 = relatively positive " +
          "\n[🌔] **"+ relSentNorm*10 +"w** **/10** *normalized y* [...] (0-10) w = > ~7 = relatively positive " +
          "\n \n[🌕] **"+ combNorm*10 +"i** **/10** *neutrally combined z & w* [...] (0-10) {z+w}/2 > ~7 = relatively positive " +
          "\n      "
        );

        msg.react('🐇');
        msg.channel.send(
          "\n   --- " + search + " inputs ---" +
          "\n [" + tickSInd[0][0].replace("−", "-") + "] Awesome Oscillator " +
          "\n [" + tickSInd[1][0].replace("−", "-") + "] Ichimoku Cloud {9, 26, 52, 26} " +
          "\n [" + tickSInd[2][0].replace("−", "-") + "] Ultimate Oscillator {7, 14, 28} "  +
          "\n [" + tickSInd[3][0].replace("−", "-") + "] RSI {14} "  +
          "\n [" + tickSInd[4][0].replace("−", "-") + "] MACD "  +
          "\n [" + tickSInd[5][0].replace("−", "-") + "] Bull Bear "
          //"\nYour ticker was compared against 10 random high-volume stocks from a predetermined list of 30. "
        );

        // Firebase: As an admin, the app has access to read and write all data, regardless of Security Rules
        var admin = require(process.env.ADMIN);
        var db = admin.database();
        var ref = db.ref("restricted_access/secret_document");
        ref.once("value", function(snapshot) {
          //console.log(snapshot.val());
        });
        let sentDatabase = db.ref('ind_sents');
        // make an object with data in it
        let [month, date, year]  = new Date().toLocaleDateString("en-US").split("/")


        const t1RandInd = [(parseFloat(tick1Ind[0][0].replace("−", "-")))/maxAO-0.0000001, (parseFloat(tick1Ind[1][0].replace("−", "-")))/maxIC-0.0000001, (parseFloat(tick1Ind[2][0].replace("−", "-")))/maxUC-0.0000001, (parseFloat(tick1Ind[3][0].replace("−", "-")))/maxRSI-0.0000001, (parseFloat(tick1Ind[4][0].replace("−", "-")))/maxMACD-0.0000001, (parseFloat(tick1Ind[5][0].replace("−", "-")))/maxBBP-0.0000001,];
        const t2RandInd = [(parseFloat(tick2Ind[0][0].replace("−", "-")))/maxAO-0.0000001, (parseFloat(tick2Ind[1][0].replace("−", "-")))/maxIC-0.0000001, (parseFloat(tick2Ind[2][0].replace("−", "-")))/maxUC-0.0000001, (parseFloat(tick2Ind[3][0].replace("−", "-")))/maxRSI-0.0000001, (parseFloat(tick2Ind[4][0].replace("−", "-")))/maxMACD-0.0000001, (parseFloat(tick2Ind[5][0].replace("−", "-")))/maxBBP-0.0000001,];
        const t3RandInd = [(parseFloat(tick3Ind[0][0].replace("−", "-")))/maxAO-0.0000001, (parseFloat(tick3Ind[1][0].replace("−", "-")))/maxIC-0.0000001, (parseFloat(tick3Ind[2][0].replace("−", "-")))/maxUC-0.0000001, (parseFloat(tick3Ind[3][0].replace("−", "-")))/maxRSI-0.0000001, (parseFloat(tick3Ind[4][0].replace("−", "-")))/maxMACD-0.0000001, (parseFloat(tick3Ind[5][0].replace("−", "-")))/maxBBP-0.0000001,];
        const t4RandInd = [(parseFloat(tick4Ind[0][0].replace("−", "-")))/maxAO-0.0000001, (parseFloat(tick4Ind[1][0].replace("−", "-")))/maxIC-0.0000001, (parseFloat(tick4Ind[2][0].replace("−", "-")))/maxUC-0.0000001, (parseFloat(tick4Ind[3][0].replace("−", "-")))/maxRSI-0.0000001, (parseFloat(tick4Ind[4][0].replace("−", "-")))/maxMACD-0.0000001, (parseFloat(tick4Ind[5][0].replace("−", "-")))/maxBBP-0.0000001,];
        const t5RandInd = [(parseFloat(tick5Ind[0][0].replace("−", "-")))/maxAO-0.0000001, (parseFloat(tick5Ind[1][0].replace("−", "-")))/maxIC-0.0000001, (parseFloat(tick5Ind[2][0].replace("−", "-")))/maxUC-0.0000001, (parseFloat(tick5Ind[3][0].replace("−", "-")))/maxRSI-0.0000001, (parseFloat(tick5Ind[4][0].replace("−", "-")))/maxMACD-0.0000001, (parseFloat(tick5Ind[5][0].replace("−", "-")))/maxBBP-0.0000001,];
        const t6RandInd = [(parseFloat(tick6Ind[0][0].replace("−", "-")))/maxAO-0.0000001, (parseFloat(tick6Ind[1][0].replace("−", "-")))/maxIC-0.0000001, (parseFloat(tick6Ind[2][0].replace("−", "-")))/maxUC-0.0000001, (parseFloat(tick6Ind[3][0].replace("−", "-")))/maxRSI-0.0000001, (parseFloat(tick6Ind[4][0].replace("−", "-")))/maxMACD-0.0000001, (parseFloat(tick6Ind[5][0].replace("−", "-")))/maxBBP-0.0000001,];
        const t7RandInd = [(parseFloat(tick7Ind[0][0].replace("−", "-")))/maxAO-0.0000001, (parseFloat(tick7Ind[1][0].replace("−", "-")))/maxIC-0.0000001, (parseFloat(tick7Ind[2][0].replace("−", "-")))/maxUC-0.0000001, (parseFloat(tick7Ind[3][0].replace("−", "-")))/maxRSI-0.0000001, (parseFloat(tick7Ind[4][0].replace("−", "-")))/maxMACD-0.0000001, (parseFloat(tick7Ind[5][0].replace("−", "-")))/maxBBP-0.0000001,];
        const t8RandInd = [(parseFloat(tick8Ind[0][0].replace("−", "-")))/maxAO-0.0000001, (parseFloat(tick8Ind[1][0].replace("−", "-")))/maxIC-0.0000001, (parseFloat(tick8Ind[2][0].replace("−", "-")))/maxUC-0.0000001, (parseFloat(tick8Ind[3][0].replace("−", "-")))/maxRSI-0.0000001, (parseFloat(tick8Ind[4][0].replace("−", "-")))/maxMACD-0.0000001, (parseFloat(tick8Ind[5][0].replace("−", "-")))/maxBBP-0.0000001,];
        const t9RandInd = [(parseFloat(tick9Ind[0][0].replace("−", "-")))/maxAO-0.0000001, (parseFloat(tick9Ind[1][0].replace("−", "-")))/maxIC-0.0000001, (parseFloat(tick9Ind[2][0].replace("−", "-")))/maxUC-0.0000001, (parseFloat(tick9Ind[3][0].replace("−", "-")))/maxRSI-0.0000001, (parseFloat(tick9Ind[4][0].replace("−", "-")))/maxMACD-0.0000001, (parseFloat(tick9Ind[5][0].replace("−", "-")))/maxBBP-0.0000001,];
        const t10RandInd = [(parseFloat(tick10Ind[0][0].replace("−", "-")))/maxAO-0.0000001, (parseFloat(tick10Ind[1][0].replace("−", "-")))/maxIC-0.0000001, (parseFloat(tick10Ind[2][0].replace("−", "-")))/maxUC-0.0000001, (parseFloat(tick10Ind[3][0].replace("−", "-")))/maxRSI-0.0000001, (parseFloat(tick10Ind[4][0].replace("−", "-")))/maxMACD-0.0000001, (parseFloat(tick10Ind[5][0].replace("−", "-")))/maxBBP-0.0000001,];


        let t1normAO10 = t1RandInd[0]; let t1normIC10 = t1RandInd[1]; let t1normUO10 = t1RandInd[2]; let t1normRSI10 = t1RandInd[3]; let t1normMACD10 = t1RandInd[4]; let t1normBBP10 = t1RandInd[5];
        let t2normAO10 = t2RandInd[0]; let t2normIC10 = t2RandInd[1]; let t2normUO10 = t2RandInd[2]; let t2normRSI10 = t2RandInd[3]; let t2normMACD10 = t2RandInd[4]; let t2normBBP10 = t2RandInd[5];
        let t3normAO10 = t3RandInd[0]; let t3normIC10 = t3RandInd[1]; let t3normUO10 = t3RandInd[2]; let t3normRSI10 = t3RandInd[3]; let t3normMACD10 = t3RandInd[4]; let t3normBBP10 = t3RandInd[5];
        let t4normAO10 = t4RandInd[0]; let t4normIC10 = t4RandInd[1]; let t4normUO10 = t4RandInd[2]; let t4normRSI10 = t4RandInd[3]; let t4normMACD10 = t4RandInd[4]; let t4normBBP10 = t4RandInd[5];
        let t5normAO10 = t5RandInd[0]; let t5normIC10 = t5RandInd[1]; let t5normUO10 = t5RandInd[2]; let t5normRSI10 = t5RandInd[3]; let t5normMACD10 = t5RandInd[4]; let t5normBBP10 = t5RandInd[5];
        let t6normAO10 = t6RandInd[0]; let t6normIC10 = t6RandInd[1]; let t6normUO10 = t6RandInd[2]; let t6normRSI10 = t6RandInd[3]; let t6normMACD10 = t6RandInd[4]; let t6normBBP10 = t6RandInd[5];
        let t7normAO10 = t7RandInd[0]; let t7normIC10 = t7RandInd[1]; let t7normUO10 = t7RandInd[2]; let t7normRSI10 = t7RandInd[3]; let t7normMACD10 = t7RandInd[4]; let t7normBBP10 = t7RandInd[5];
        let t8normAO10 = t8RandInd[0]; let t8normIC10 = t8RandInd[1]; let t8normUO10 = t8RandInd[2]; let t8normRSI10 = t8RandInd[3]; let t8normMACD10 = t8RandInd[4]; let t8normBBP10 = t8RandInd[5];
        let t9normAO10 = t9RandInd[0]; let t9normIC10 = t9RandInd[1]; let t9normUO10 = t9RandInd[2]; let t9normRSI10 = t9RandInd[3]; let t9normMACD10 = t9RandInd[4]; let t9normBBP10 = t9RandInd[5];
        let t10normAO10 = t10RandInd[0]; let t10normIC10 = t10RandInd[1]; let t10normUO10 = t10RandInd[2]; let t10normRSI10 = t10RandInd[3]; let t10normMACD10 = t10RandInd[4]; let t10normBBP10 = t10RandInd[5];

        function formatAMPM(date) {
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
          return strTime;
        }
        console.log(formatAMPM(new Date));
        var data = {
          t1_ind_AO: tick1Ind[0][0], t1_ind_IC: tick1Ind[1][0], t1_ind_UO: tick1Ind[2][0], t1_ind_RSI: tick1Ind[3][0], t1_ind_MACD: tick1Ind[4][0], t1_ind_BB: tick1Ind[5][0], t1_sents: sentimenttick1[0], t1_sesA: tick1Score/100, t1_sesB: tick1Comparative, t1_sesANorm: (tick1Score/100/maxSR)-0.0000001, t1_sesBNorm: (tick1Comparative/maxSC)-0.0000001, t1NormComb: ((resulttick1.score/100/maxSR)-0.0000001 + (resulttick1.comparative/maxSC)-0.0000001) / 2, t1label: tickers[0], t1AO10Norm: t1normAO10, t1IC10Norm: t1normIC10, t1UO10Norm: t1normUO10, t1RSI10Norm: t1normRSI10, t1MACD10Norm: t1normMACD10, t1BBP10Norm: t1normBBP10,
          t2_ind_AO: tick2Ind[0][0], t2_ind_IC: tick2Ind[1][0], t2_ind_UO: tick2Ind[2][0], t2_ind_RSI: tick2Ind[3][0], t2_ind_MACD: tick2Ind[4][0], t2_ind_BB: tick2Ind[5][0], t2_sents: sentimenttick2[0], t2_sesA: tick2Score/100, t2_sesB: tick2Comparative, t2_sesANorm: (tick2Score/100/maxSR)-0.0000001, t2_sesBNorm: (tick2Comparative/maxSC)-0.0000001, t2NormComb: ((resulttick2.score/100/maxSR)-0.0000001 + (resulttick2.comparative/maxSC)-0.0000001) / 2, t2label: tickers[1], t2AO10Norm: t2normAO10, t2IC10Norm: t2normIC10, t2UO10Norm: t2normUO10, t2RSI10Norm: t2normRSI10, t2MACD10Norm: t2normMACD10, t2BBP10Norm: t2normBBP10,
          t3_ind_AO: tick3Ind[0][0], t3_ind_IC: tick3Ind[1][0], t3_ind_UO: tick3Ind[2][0], t3_ind_RSI: tick3Ind[3][0], t3_ind_MACD: tick3Ind[4][0], t3_ind_BB: tick3Ind[5][0], t3_sents: sentimenttick3[0], t3_sesA: tick3Score/100, t3_sesB: tick3Comparative, t3_sesANorm: (tick3Score/100/maxSR)-0.0000001, t3_sesBNorm: (tick3Comparative/maxSC)-0.0000001, t3NormComb: ((resulttick3.score/100/maxSR)-0.0000001 + (resulttick3.comparative/maxSC)-0.0000001) / 2, t3label: tickers[2], t3AO10Norm: t3normAO10, t3IC10Norm: t3normIC10, t3UO10Norm: t3normUO10, t3RSI10Norm: t3normRSI10, t3MACD10Norm: t3normMACD10, t3BBP10Norm: t3normBBP10,
          t4_ind_AO: tick4Ind[0][0], t4_ind_IC: tick4Ind[1][0], t4_ind_UO: tick4Ind[2][0], t4_ind_RSI: tick4Ind[3][0], t4_ind_MACD: tick4Ind[4][0], t4_ind_BB: tick4Ind[5][0], t4_sents: sentimenttick4[0], t4_sesA: tick4Score/100, t4_sesB: tick4Comparative, t4_sesANorm: (tick4Score/100/maxSR)-0.0000001, t4_sesBNorm: (tick4Comparative/maxSC)-0.0000001, t4NormComb: ((resulttick4.score/100/maxSR)-0.0000001 + (resulttick4.comparative/maxSC)-0.0000001) / 2, t4label: tickers[3], t4AO10Norm: t4normAO10, t4IC10Norm: t4normIC10, t4UO10Norm: t4normUO10, t4RSI10Norm: t4normRSI10, t4MACD10Norm: t4normMACD10, t4BBP10Norm: t4normBBP10,
          t5_ind_AO: tick5Ind[0][0], t5_ind_IC: tick5Ind[1][0], t5_ind_UO: tick5Ind[2][0], t5_ind_RSI: tick5Ind[3][0], t5_ind_MACD: tick5Ind[4][0], t5_ind_BB: tick5Ind[5][0], t5_sents: sentimenttick5[0], t5_sesA: tick5Score/100, t5_sesB: tick5Comparative, t5_sesANorm: (tick5Score/100/maxSR)-0.0000001, t5_sesBNorm: (tick5Comparative/maxSC)-0.0000001, t5NormComb: ((resulttick5.score/100/maxSR)-0.0000001 + (resulttick5.comparative/maxSC)-0.0000001) / 2, t5label: tickers[4], t5AO10Norm: t5normAO10, t5IC10Norm: t5normIC10, t5UO10Norm: t5normUO10, t5RSI10Norm: t5normRSI10, t5MACD10Norm: t5normMACD10, t5BBP10Norm: t5normBBP10,
          t6_ind_AO: tick6Ind[0][0], t6_ind_IC: tick6Ind[1][0], t6_ind_UO: tick6Ind[2][0], t6_ind_RSI: tick6Ind[3][0], t6_ind_MACD: tick6Ind[4][0], t6_ind_BB: tick6Ind[5][0], t6_sents: sentimenttick6[0], t6_sesA: tick6Score/100, t6_sesB: tick6Comparative, t6_sesANorm: (tick6Score/100/maxSR)-0.0000001, t6_sesBNorm: (tick6Comparative/maxSC)-0.0000001, t6NormComb: ((resulttick6.score/100/maxSR)-0.0000001 + (resulttick6.comparative/maxSC)-0.0000001) / 2, t6label: tickers[5], t6AO10Norm: t6normAO10, t6IC10Norm: t6normIC10, t6UO10Norm: t6normUO10, t6RSI10Norm: t6normRSI10, t6MACD10Norm: t6normMACD10, t6BBP10Norm: t6normBBP10,
          t7_ind_AO: tick7Ind[0][0], t7_ind_IC: tick7Ind[1][0], t7_ind_UO: tick7Ind[2][0], t7_ind_RSI: tick7Ind[3][0], t7_ind_MACD: tick7Ind[4][0], t7_ind_BB: tick7Ind[5][0], t7_sents: sentimenttick7[0], t7_sesA: tick7Score/100, t7_sesB: tick7Comparative, t7_sesANorm: (tick7Score/100/maxSR)-0.0000001, t7_sesBNorm: (tick7Comparative/maxSC)-0.0000001, t7NormComb: ((resulttick7.score/100/maxSR)-0.0000001 + (resulttick7.comparative/maxSC)-0.0000001) / 2, t7label: tickers[6], t7AO10Norm: t7normAO10, t7IC10Norm: t7normIC10, t7UO10Norm: t7normUO10, t7RSI10Norm: t7normRSI10, t7MACD10Norm: t7normMACD10, t7BBP10Norm: t7normBBP10,
          t8_ind_AO: tick8Ind[0][0], t8_ind_IC: tick8Ind[1][0], t8_ind_UO: tick8Ind[2][0], t8_ind_RSI: tick8Ind[3][0], t8_ind_MACD: tick8Ind[4][0], t8_ind_BB: tick8Ind[5][0], t8_sents: sentimenttick8[0], t8_sesA: tick8Score/100, t8_sesB: tick8Comparative, t8_sesANorm: (tick8Score/100/maxSR)-0.0000001, t8_sesBNorm: (tick8Comparative/maxSC)-0.0000001, t8NormComb: ((resulttick8.score/100/maxSR)-0.0000001 + (resulttick8.comparative/maxSC)-0.0000001) / 2, t8label: tickers[7], t8AO10Norm: t8normAO10, t8IC10Norm: t8normIC10, t8UO10Norm: t8normUO10, t8RSI10Norm: t8normRSI10, t8MACD10Norm: t8normMACD10, t8BBP10Norm: t8normBBP10,
          t9_ind_AO: tick9Ind[0][0], t9_ind_IC: tick9Ind[1][0], t9_ind_UO: tick9Ind[2][0], t9_ind_RSI: tick9Ind[3][0], t9_ind_MACD: tick9Ind[4][0], t9_ind_BB: tick9Ind[5][0], t9_sents: sentimenttick9[0], t9_sesA: tick9Score/100, t9_sesB: tick9Comparative, t9_sesANorm: (tick9Score/100/maxSR)-0.0000001, t9_sesBNorm: (tick9Comparative/maxSC)-0.0000001, t9NormComb: ((resulttick9.score/100/maxSR)-0.0000001 + (resulttick9.comparative/maxSC)-0.0000001) / 2, t9label: tickers[8], t9AO10Norm: t9normAO10, t9IC10Norm: t9normIC10, t9UO10Norm: t9normUO10, t9RSI10Norm: t9normRSI10, t9MACD10Norm: t9normMACD10, t9BBP10Norm: t9normBBP10,
          t10_ind_AO: tick10Ind[0][0], t10_ind_IC: tick10Ind[1][0], t10_ind_UO: tick10Ind[2][0], t10_ind_RSI: tick10Ind[3][0], t10_ind_MACD: tick10Ind[4][0], t10_ind_BB: tick10Ind[5][0], t10_sents: sentimenttick10[0], t10_sesA: tick10Score/100, t10_sesB: tick10Comparative, t10_sesANorm: (tick10Score/100/maxSR)-0.0000001, t10_sesBNorm: (tick10Comparative/maxSC)-0.0000001, t10NormComb: ((resulttick10.score/100/maxSR)-0.0000001 + (resulttick10.comparative/maxSC)-0.0000001) / 2, t10label: tickers[9], t10AO10Norm: t10normAO10, t10IC10Norm: t10normIC10, t10UO10Norm: t10normUO10, t10RSI10Norm: t10normRSI10, t10MACD10Norm: t10normMACD10, t10BBP10Norm: t10normBBP10,
          month: month, date: date, year: year, time: formatAMPM(new Date),
        }
        console.log('saving data!');
        console.log(data);
        let ind_sent = sentDatabase.push(data, finished);
        console.log("Firebase generated key: " + ind_sent.key);

        function finished(err) {
          if (err) {
            console.error('Error: ');
            console.error(err);
          } else {

            console.log('Data saved successfully');
          }
        }
      }
    })

    async function fitModel() {
      msg.react('🕗');
      msg.channel.send("Thank you for your patience. ")

      const gifs = [
        'https://tenor.com/47sG.gif', 'https://tenor.com/bpsFg.gif', 'https://tenor.com/9dsD.gif',
        'https://tenor.com/bffoa.gif', 'https://tenor.com/bhwwM.gif', 'https://tenor.com/HxQY.gif',
        'https://tenor.com/8hrJ.gif', 'https://tenor.com/zDT2.gif', 'https://tenor.com/Q4XU.gif',
        'https://tenor.com/Qnby.gif','https://tenor.com/Qv1i.gif','https://tenor.com/uCVh.gif',
        'https://tenor.com/bvZG4.gif','https://tenor.com/bvZRw.gif','https://tenor.com/bvZR4.gif',
        'https://tenor.com/bvZJV.gif','https://tenor.com/bvZF7.gif',  'https://tenor.com/bvZG5.gif',
        'https://tenor.com/bvZJ5.gif', 'https://tenor.com/4wSA.gif',
      ]
      try {
        await msg.channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
      } catch (err) {
        console.log(err);
      }

      // CHANGE TO MODELL then below model -> modelL TO UPDATE MODEL ITERATIVELY
      console.log("Model Loaded!");
      for (let i = 0; i < 260; i++) {
        const response = await model.fit(xs, ys, config);
        //console.log(response.history.loss[0]);
      }

      let modelS;
      try {
        modelS = await model.save('file://./commands/hopAssets/stock-modelC');
        console.log("Model Saved!");
      } catch (err) {
        console.log(err);
      }


    }
  }
  main();

}
