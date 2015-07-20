var restify = require('restify');

var server = restify.createServer({
  name: 'Oboe JS Example'
});

server.get('/pairs', function (req, res, next) {

  res.header('Content-Type', 'application/json');

  function sendPairs(res) {
    var numPairs = Math.floor(((Math.random()*5)+1));
    console.log('Number of Pairs: ' + (numPairs+1));

    for(var i = 0; i <= numPairs; i++) {
      var pair = [
        Math.floor(((Math.random()*1000)%100)+1),
        Math.floor(((Math.random()*1000)%100)+1)
      ];

      console.log(pair);
      res.write(JSON.stringify(pair) + ',');
    }

    return true;
  }

  res.write('[');

  for(var i = 0; i < 25; i++) {
    var seconds = Math.floor(((Math.random()*10000)%3000)+1000);
    console.log('Waiting: ' + seconds);

    setTimeout(sendPairs(res), seconds);
  }

  res.write('[0,0]]');
  res.end();
  return next();
});

server.listen(9000);
