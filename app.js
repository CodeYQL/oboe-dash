var restify = require('restify');

var server = restify.createServer({
  name: 'Oboe JS Example'
});

// Quick route to send an sample number of pairs over a period of time
server.get('/pairs', function (req, res, next) {
  numSent = 0;

  // Send Header
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');

  // Write a number of pairs between 1 and 5 to the response
  // If flag is true, end the communication
  function sendPairs(res, flag) {
    var numPairs = Math.floor((((Math.random()*10)%5)+1));
    console.log('Number of Pairs: ' + (numPairs+1));

    for(var i = 0; i <= numPairs; i++) {

      // Generate the pair
      var pair = [
        Math.floor(((Math.random()*1000)%100)+1),
        Math.floor(((Math.random()*1000)%100)+1)
      ];

      // Write the pair
      res.write(JSON.stringify(pair) + ',');
      numSent++;

      // End if true
      if (flag) {
        res.write('[0,0]]');
        res.end();
        console.log('Sent: ' + numSent);
        return next();
      }
    }

    // not ending
    return flag;
  }

  // Start array of pairs
  res.write('[');

  // Queue timeouts
  for(var i = 0; i < 1000; i++) {
    var seconds = Math.floor(((Math.random()*10000)%7000)+50);
    console.log('Waiting: ' + seconds);

    setTimeout(sendPairs, seconds, res, false);
  }

  // Last Pair sent, all others must finish before this to be recieved by client
  setTimeout(sendPairs, 7100, res, true);
});

// Start Server
server.listen(9000);
