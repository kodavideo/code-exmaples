// A Discord bot script that checks language for relative negativity and alerts moderation staff.

module.exports = async function (msg, args) {
  // `m` is a message object that will be passed through the filter function
    let sent33 = [];
    let sent100 = [];
    let i_33 = 0;
    let i_100 = 0;
    let iGlobal = 0;
    let change = 3;
    let alert = 65.5;
    if (args.length > 0) {
      change = args[0];
      alert = args[1];
    }
    if (msg.member.hasPermission('ADMINISTRATOR')) {
        msg.channel.send("now iteratively caching 100 recent messages for rolling sentiment analysis. ");
        msg.channel.send("every 33 messages will be compared against the cache, and any change more or less than " + change + "% will be reported. ");
        msg.channel.send("@here will be alerted at -" + alert + "%. \n*sentiment scores courtesy of sentiment.js and AFINN-165.* \n ... and thank you for choosing [buni].");
        const filter = m => m.content.includes('');
        const collector = msg.channel.createMessageCollector(filter, { idle: 2.592*Math.pow(10, 8)});
        const Sentiment = require('sentiment');
        collector.on('collect', m => {
          console.log(`Collected ${m.content}`);
          //check if recent is full then push to recent message array
          if (i_33 > 32) {
            i_33 = 0;
          }
          console.log(i_33);
          sent33[i_33] = m.content;
          i_33 = i_33 + 1;
          console.log(sent33);
          //check if longterm is full then push to longterm message array
          if (i_100 > 99) {
            i_100 = 0;
          }
          console.log(i_100);
          sent100[i_100] = m.content;
          i_100 = i_100 + 1;
          console.log(sent100);
          iGlobal = iGlobal + 1;
          collector.off('end', collected => {
          console.log(`Collected ${collected.size} items`);
          msg.reply("|flop timed out after 3 days.")
          });
          if(iGlobal > 99 && i_100 > 75) {
            iGlobal = 0;
            let sentshortString = '';
            let sentlongString = '';
            let shortScores = [];
            let longScores = [];
            let shortComps = [];
            let longComps = [];
            var sentiment = new Sentiment();
            for (i_s = 0; i_s < sent33.length; i_s++) {
              sentshortString = sent33[i_s];
              var shortSentiment = sentiment.analyze(sentshortString);
              shortScores.push(parseFloat(shortSentiment.score));
              shortComps.push(parseFloat(shortSentiment.comparative));
            }
            for (i_l = 0; i_l < sent100.length; i_l++) {
              sentlongString = sent100[i_l];
              var longSentiment = sentiment.analyze(sentlongString);
              longScores.push(parseFloat(longSentiment.score));
              longComps.push(parseFloat(longSentiment.comparative));
            }
            lmaxScore = Math.max.apply(null, longScores);
            lmaxComp = Math.max.apply(null, longComps);
            let nshortScores = [];
            let nlongScores = [];
            let nshortComps = [];
            let nlongComps = [];
            //console.log("shortScores, shortComps");
            //console.log(shortScores, shortComps);
            for (i_smax = 0; i_smax < shortScores.length; i_smax++) {
              nshortScores.push(shortScores[i_smax] / lmaxScore);
              nshortComps.push(shortComps[i_smax] / lmaxComp);
            }
            //console.log("nshortScores, nshortComps");
            //console.log(nshortScores, nshortComps);
            //console.log("longScores, longComps");
            //console.log(longScores, longComps);
            for (i_lmax = 0; i_lmax < longScores.length; i_lmax++) {
              nlongScores.push(longScores[i_lmax] / lmaxScore);
              nlongComps.push(longComps[i_lmax] / lmaxComp);
            }
            //console.log("nlongScores, nlongComps");
            //console.log(nlongScores, nlongComps);
            let average = (array) => array.reduce((a, b) => a + b) / array.length;
            const aShort = (average(nshortScores) + average(nshortComps)) /2
            const aLong = (average(nlongScores) + average(nlongComps)) /2
            console.log("Average Short Term Normalized Sentiment: " + aShort);
            console.log("Average Long Term Normalized Sentiment: " + aLong);
            const pDiff = ((aShort - aLong) / aLong) * 100
            randomGrammars = Math.floor(Math.random() * 2);
            randomGrammar = Math.floor(Math.random() * 4);
            randomChoice = Math.floor(Math.random() * 4);
            const salutations1 = [
              'this channel is', 'you all are', 'we are now', 'WHAT?!......',
            ];
            const salutations2 = [
              'I can sense a', 'there is a', 'O.O ... a', 'interesting... a',
            ];
            const endingpos1 = [
              'more positive', 'more beautiful', 'more radiant', 'more gleeful'
            ];
            const endingpos2 = [
              'increase in positivity', 'increase in beauty', 'increase in radiance', 'increase in glee'
            ];
            const endingneg1 = [
              'more negative', 'more omnious', 'more dark', 'more brooding',
            ];
            const endingneg2 = [
              'increase in negativity', 'increase in scaryness', 'increase in darkness', 'increase in brooding',
            ];
            const grammars = [salutations1[randomGrammar], salutations2[randomGrammar]]
            const grammarsposEnd = [endingpos1[randomChoice], endingpos2[randomChoice]]
            const grammarsnegEnd = [endingneg1[randomChoice], endingneg2[randomChoice]]
            if (pDiff > change) {
              msg.channel.send("*" + grammars[randomGrammars] + " **" + pDiff.toString().replace('-','') + "%** " + grammarsposEnd[randomGrammars] + '.' + "*");
            }
            if (pDiff < -change) {
              msg.channel.send("*" + grammars[randomGrammars] + " **" + pDiff.toString().replace('-','') + "%** " + grammarsnegEnd[randomGrammars] + '.' + "*");
            }
            if (pDiff < -alert) {
              msg.channel.send("*!!!*");
            }
          }
        });
    } else {
      msg.reply("my deepest apologies, though this command is only available to operators.");
  }
}
