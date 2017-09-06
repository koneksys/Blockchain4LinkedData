function scan(myaccount, startBlockNumber, endBlockNumber) {
  if (myaccount == null){
    myaccount = eth.coinbase
    console.log("Using account: ", myaccount);
  }
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
    console.log("Ending at: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = 10;
    console.log("Starting at: " + startBlockNumber);
  }
  console.log("Searching for transactions from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (myaccount == e.from && 33811000000000000 == e.value) {
          var contractAddress = e.to
          function contractScan(contract, startBlock, endBlock){
            if (contract == null) {
              contract = contractAddress
            }
            if (endBlock == null) {
              endBlock = eth.blockNumber;
              console.log("Ending at: " + endBlock);
            }
            if (startBlock == null) {
              startBlock = 10;
              console.log("Starting at: " + startBlock);
            }
            console.log();
            console.log();
            console.log('Getting transactions from contract: ', contract);
            for (var i = startBlock; i < endBlock; i++) {

              var block = eth.getBlock(i, true)
              if (block !=null && block.transactions !=null) {
                block.transactions.forEach(function(e){
                  if (contract == e.to) {
                    var input = web3.toAscii(e.input).replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]/g, '')
                    console.log(
                            "   tx hash         : " + e.hash + "\n"
                          + "   blockNumber     : " + e.blockNumber + "\n"
                          + "   from            : " + e.from + "\n"
                          + "   to              : " + e.to + "\n"
                          + "   value           : " + e.value + "\n"
                          + "   input           : ", input);
                  }
                })
              }
            }
          }
          contractScan()
        }
      })
    }
  }
}


function printBlock(blockNo) {
  var block = eth.getBlock(blockNo)
  if (block) {
    console.log(
        "Block number     : " + block.number + "\n"
      + " hash            : " + block.hash + "\n"
      + " parentHash      : " + block.parentHash + "\n"
      + " nonce           : " + block.nonce + "\n"
      + " sha3Uncles      : " + block.sha3Uncles + "\n"
      + " logsBloom       : " + block.logsBloom + "\n"
      + " transactionsRoot: " + block.transactionsRoot + "\n"
      + " stateRoot       : " + block.stateRoot + "\n"
      + " miner           : " + block.miner + "\n"
      + " difficulty      : " + block.difficulty + "\n"
      + " totalDifficulty : " + block.totalDifficulty + "\n"
      + " extraData       : " + block.extraData + "\n"
      + " size            : " + block.size + "\n"
      + " gasLimit        : " + block.gasLimit + "\n"
      + " gasUsed         : " + block.gasUsed + "\n"
      + " timestamp       : " + block.timestamp + "\n"
      + " transactions    : " + block.transactions + "\n"
      + " uncles          : " + block.uncles);
  }
}

function history(startBlockNumber, endBlockNumber) {
  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - endBlockNumber;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  console.log("Working...");

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    console.log("Searching block " + i);
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (e.from) {
          console.log(
              "  tx hash          : " + e.hash + "\n"
            + "   nonce           : " + e.nonce + "\n"
            + "   blockHash       : " + e.blockHash + "\n"
            + "   blockNumber     : " + e.blockNumber + "\n"
            + "   transactionIndex: " + e.transactionIndex + "\n"
            + "   from            : " + e.from + "\n"
            + "   to              : " + e.to + "\n"
            + "   value           : " + e.value + "\n"
            + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
            + "   gasPrice        : " + e.gasPrice + "\n"
            + "   gas             : " + e.gas + "\n"
            + "   input           : " + e.input);
        }
      })
    }
  }
}
