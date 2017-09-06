function historyScan(myaccount, startBlockNumber, endBlockNumber) {
  if (myaccount == null){
    myaccount = eth.coinbase
    console.log("Using coinbase: ", myaccount);
  }
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
    console.log("Ending at: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = 10;
    console.log("Starting at: " + startBlockNumber);
  }
  console.log("Getting history of account \"" + myaccount);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (myaccount == e.from && typeof e.input) {
          var input = web3.toAscii(e.input).replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]/g, '')
          if (input) {
            console.log('----------------------------------------------------');
            console.log('Block number: ', e.blockNumber);
            console.log('From: ');
            console.log(e.from);
            console.log('To: ');
            console.log(e.to);
            console.log('Time: ', block.timestamp + " " + new Date(block.timestamp * 1000).toUTCString());
            console.log('Input: ');
            console.log(input);
            console.log('----------------------------------------------------');
          }
        }
      })
    }
  }
}
