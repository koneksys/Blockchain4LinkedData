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
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
        var logsBloom = '0x0000000000000000000000000000000000000000000000000000000000000000'
        console.log('--------------------------------------------------------------------------------');
        console.log(
            " Blocknumber: " + block.number + "\n"
          + " hash       : " + block.hash + "\n"
          + " parentHash : " + block.parentHash + "\n"
          + " nonce      : " + block.nonce + "\n"
          + " sha3Uncles : " + block.sha3Uncles + "\n"
          + " logsBloom  : " + logsBloom + "\n"
          + " trRoot     : " + block.transactionsRoot + "\n"
          + " stateRoot  : " + block.stateRoot + "\n"
          + " miner      : " + block.miner + "\n"
          + " difficulty : " + block.difficulty + "\n"
          + " totalDiff  : " + block.totalDifficulty + "\n"
          + " extraData  : " + block.extraData + "\n"
          + " size       : " + block.size + "\n"
          + " gasLimit   : " + block.gasLimit + "\n"
          + " gasUsed    : " + block.gasUsed + "\n"
          + " timestamp  : " + block.timestamp + "\n"
          + " tr         : " + block.transactions + "\n"
          + " uncles     : " + block.uncles);
          console.log('--------------------------------------------------------------------------------');
    }
  }
}

function wdhistory(startBlockNumber, endBlockNumber) {
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
    var block = eth.getBlock(i, true);
    if (block != null && block.transactions != null) {
        var logsBloom = '0x0000000000000000000000000000000000000000000000000000000000000000'
        console.log('--------------------------------------------------------------------------------');
        console.log(
            " Blocknumber: " + block.number + "\n"
          + " hash       : " + block.hash + "\n"
          + " parentHash : " + block.parentHash + "\n"
          + " tr         : " + block.transactions);
          console.log('--------------------------------------------------------------------------------');
    }
  }
}
