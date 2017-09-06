function explorer() {
  console.log("Working...");
  var endBlockNumber = eth.blockNumber;
  var startBlockNumber = eth.blockNumber - 20;
  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (typeof e.input) {
          var decoded = web3.toAscii(e.input).replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]/g, '')
          console.log(decoded);
          if (decoded) {
            console.log(web3.toAscii(decoded).replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]/g, ''));
          }
        }
      })
    }
  }
}


function explorer(myaccount, startBlockNumber, endBlockNumber) {
  if (myaccount == null){
    myaccount = eth.coinbase
    console.log("Using coinbase: ", myaccount);
  }
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
    console.log("Ending at: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber -endBlockNumber;
    console.log("Starting at: " + startBlockNumber);
  }
  console.log("Getting history");

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    var block = eth.getBlock(i, true);
    if (block != null) {
      block.transactions.forEach( function(e) {
        if (myaccount == e.from && typeof e.input) {
          if (e.to) {
            var input = web3.toAscii(e.input).replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]/g, '');
          } else {
            var input = e.input;
          }
          if (input) {
            console.log('----------------------------------------------------');
            console.log('Block number:', e.blockNumber);
            console.log('From: ');
            console.log(e.from);
            console.log('To: ');
            console.log(e.to);
            console.log('Time: ', block.timestamp + " " + new Date(block.timestamp * 1000).toUTCString());
            console.log('Input: ');
            console.log(e.input);
            console.log('----------------------------------------------------');
          }
        }
      })
    }
  }
}
