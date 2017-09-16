explorer();
$('.block').click(function(){
  $('.modal').addClass('active');
  $('.modal-bg').click(function(){
    $('.modal').removeClass('active');
  })
  $("#transactions").html('');

  var blockNumber = $(this).attr('data-block')
  $('.block-number strong').text('Block number: ')
  $('.block-number span').text(blockNumber)

  console.log('Block number: ', blockNumber);
  var block = web3.eth.getBlock(blockNumber, true);
  if (block.transactions.length > 0) {
    console.log('Transactions found');
    block.transactions.forEach( function(e) {
      if (e.to != null) {
        var input = web3.toAscii(e.input).replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]/g, '')
      } else {
        var input = e.input
      }
        $("#transactions").append(
          '<div class="transaction">' +
            '<p class="transaction-sender">' +
              '<strong> Sender: </strong>' +
              '<span>'+ e.from +'</span>' +
            '</p>' +
            '<p class="transaction-receiver">' +
              '<strong> Receiver: </strong>' +
              '<span>'+ e.to +'</span>' +
            '</p>' +
            '<p class="transaction-time">' +
              '<strong> Time: </strong>' +
              '<span>'+ new Date(block.timestamp * 1000).toUTCString() +'</span>' +
            '</p>' +
            '<p class="transaction-input">' +
              '<strong> Data: </strong>' +
              '<span>'+ input +'</span>' +
            '</p>' +
          '</div>'
        )
    })
  } else {
    $("#transactions").append('<h3> There are no transactions to show for this block </h3>')

  }

})

function explorer(myaccount, startBlockNumber, endBlockNumber) {
  if (myaccount == null){
    myaccount = web3.eth.coinbase
    console.log("Using coinbase: ", myaccount);
  }
  if (endBlockNumber == null) {
    endBlockNumber = web3.eth.blockNumber;
    console.log("Ending at: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = 0;
    console.log("Starting at: " + startBlockNumber);
  }
  console.log("Getting history of account \"" + myaccount);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    var block = web3.eth.getBlock(i, true);
    $("#blocks").append(
      ' <div class="block" data-block="'+block.number+'"> <div class="blockNumber">' +
          block.number +
        '</div>' +
        '<div class="hash">' +
          block.hash +
        '</div>' +
        '<div class="transactions">' +
          block.transactions.length +
        '</div>' +
        '<div class="timestamp">' +
          new Date(block.timestamp * 1000).toUTCString() +
        '</div></div>'
    )
  }
}


$('.go').click(function(){
  $('.modal').addClass('active');
  $('.modal-bg').click(function(){
    $('.modal').removeClass('active');
  })
  $("#transactions").html('');

  var account = input.value;
  var endBlock = web3.eth.blockNumber;
  var startBlock = endBlock - endBlock;
  var inputValue = input.value;
  console.log('Searching as ', inputValue);
  if (inputValue.length == 42) {

    $('.block-number strong').text('Account: ')
    $('.block-number span').text(input.value)
    console.log(inputValue, '------');
    for (var i = startBlock; i <= endBlock; i++) {
      var searchBlock = web3.eth.getBlock(i, true);
      if (searchBlock.transactions.length > 0) {
        console.log('Transactions found');
        searchBlock.transactions.forEach( function(e) {
          if (e.to ==  inputValue || e.from == inputValue) {
            if (e.to != null) {
              var input = web3.toAscii(e.input).replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]/g, '')
            } else {
              var input = e.input
            }
            $("#transactions").append(
              '<div class="transaction">' +
                '<p class="account-block">' +
                  '<strong> Transaction in block: </strong>' +
                  '<span>'+e.blockNumber+'</span>' +
                '</span>' +
                '<p class="transaction-sender">' +
                  '<strong> Sender: </strong>' +
                  '<span>'+ e.from +'</span>' +
                '</p>' +
                '<p class="transaction-receiver">' +
                  '<strong> Receiver: </strong>' +
                  '<span>'+ e.to +'</span>' +
                '</p>' +
                '<p class="transaction-time">' +
                  '<strong> Time: </strong>' +
                  '<span>'+ new Date(e.timestamp * 1000).toUTCString() +'</span>' +
                '</p>' +
                '<p class="transaction-input">' +
                  '<strong> Data: </strong>' +
                  '<span>'+ input +'</span>' +
                '</p>' +
              '</div>'
            )
          }
        })
      }
    }
  }
  if (inputValue.length < 42) {
    $('.block-number strong').text('Block: ')
    $('.block-number span').text(input.value)
    console.log(inputValue, '------');
    var block = web3.eth.getBlock(inputValue, true);
    if (block != null){

      $("#transactions").append(
        '<div class="transaction block-search">' +
          '<p class="block-number">' +
            '<strong> Info of block: </strong>' +
            '<span>'+block.number+'</span>' +
          '</p>' +
          '<p class="block-hash">' +
            '<strong> Hash: </strong>' +
            '<span>'+ block.hash +'</span>' +
          '</p>' +
          '<p class="block-parentHash">' +
            '<strong> Parent Hash: </strong>' +
            '<span>'+ block.parentHash +'</span>' +
          '</p>' +
          '<p class="block-nonce">' +
            '<strong> Nonce: </strong>' +
            '<span>'+ block.nonce +'</span>' +
          '</p>' +
          '<p class="block-sha3Uncles">' +
            '<strong> Sha3Uncles: </strong>' +
            '<span>'+ block.sha3Uncles +'</span>' +
          '</p>' +
          '<p class="block-transactionsRoot">' +
            '<strong> Tr Root: </strong>' +
            '<span>'+ block.transactionsRoot +'</span>' +
          '</p>' +
          '<p class="block-stateRoot">' +
            '<strong> State Root: </strong>' +
            '<span>'+ block.stateRoot +'</span>' +
          '</p>' +
          '<p class="block-miner">' +
            '<strong> Miner: </strong>' +
            '<span>'+ block.miner +'</span>' +
          '</p>' +
          '<p class="block-difficulty">' +
            '<strong> Difficulty: </strong>' +
            '<span>'+ block.difficulty +'</span>' +
          '</p>' +
          '<p class="block-totalDifficulty">' +
            '<strong> Total Diff:  </strong>' +
            '<span>'+ block.totalDifficulty +'</span>' +
          '</p>' +
          '<p class="block-extradata">' +
            '<strong> Extradata: </strong>' +
            '<span>'+ block.extraData +'</span>' +
          '</p>' +
          '<p class="block-size">' +
            '<strong> Size: </strong>' +
            '<span>'+ block.size +'</span>' +
          '</p>' +
          '<p class="block-gasLimit">' +
            '<strong> Gas Limit: </strong>' +
            '<span>'+ block.gasLimit +'</span>' +
          '</p>' +
          '<p class="block-gasUsed>">' +
            '<strong> Gas Used </strong>' +
            '<span>'+ block.gasUsed +'</span>' +
          '</p>' +
          '<p class="block-timeStamp">' +
            '<strong> Date  </strong>' +
            '<span>'+ new Date(block.timestamp * 1000).toGMTString() +'</span>' +
          '</p>' +
          '<p class="block-transactions">' +
            '<strong> Tr </strong>' +
            '<span>'+ block.transactions +'</span>' +
          '</p>' +
          '<p class="block-uncles">' +
            '<strong> Uncles </strong>' +
            '<span>'+ block.uncles +'</span>' +
          '</p>' +
        '</div>'
      )
    }
  }
  if (inputValue.length > 42) {
    $('.block-number strong').text('Transaction: ')
    $('.block-number span').text(input.value)
    console.log(inputValue, 'trn------');
    var hash = input.value;
    var transactionSearch = web3.eth.getTransaction(hash);
    console.log(transactionSearch);
    if (transactionSearch != null){
      if (transactionSearch.to != null) {
        var serchInput = web3.toAscii(transactionSearch.input).replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]/g, '')
      } else {
        var serchInput = transactionSearch.input
      }
      $("#transactions").append(
        '<div class="transaction transaction-search">' +
          '<p class="transaction-bhash">' +
            '<strong> Block Hash: </strong>' +
            '<span>'+transactionSearch.hash+'</span>' +
          '</p>' +
          '<p class="transaction-number">' +
            '<strong> Number: </strong>' +
            '<span>'+transactionSearch.blockNumber+'</span>' +
          '</p>' +
          '<p class="transaction-from">' +
            '<strong> Sender: </strong>' +
            '<span>'+transactionSearch.from+'</span>' +
          '</p>' +
          '<p class="transaction-gas">' +
            '<strong> Gas: </strong>' +
            '<span>'+transactionSearch.gas+'</span>' +
          '</p>' +
          '<p class="transaction-gasPrice">' +
            '<strong> Gas Price: </strong>' +
            '<span>'+transactionSearch.gasPrice+'</span>' +
          '</p>' +
          '<p class="transaction-hash">' +
            '<strong> Tr Hash: </strong>' +
            '<span>'+transactionSearch.hash+'</span>' +
          '</p>' +
          '<p class="transaction-input">' +
            '<strong> Input: </strong>' +
            '<span>'+serchInput+'</span>' +
          '</p>' +
          '<p class="transaction-nonce">' +
            '<strong> Nonce: </strong>' +
            '<span>'+transactionSearch.nonce+'</span>' +
          '</p>' +
          '<p class="transaction-r">' +
            '<strong> R: </strong>' +
            '<span>'+transactionSearch.r+'</span>' +
          '</p>' +
          '<p class="transaction-s">' +
            '<strong> S: </strong>' +
            '<span>'+transactionSearch.s+'</span>' +
          '</p>' +
          '<p class="transaction-to">' +
            '<strong> Receiver: </strong>' +
            '<span>'+transactionSearch.to+'</span>' +
          '</p>' +
          '<p class="transaction-index">' +
            '<strong> Tr Index: </strong>' +
            '<span>'+transactionSearch.transactionIndex+'</span>' +
          '</p>' +
          '<p class="transaction-v">' +
            '<strong> V: </strong>' +
            '<span>'+transactionSearch.v+'</span>' +
          '</p>' +
          '<p class="transaction-value">' +
            '<strong> Value: </strong>' +
            '<span>'+transactionSearch.value+'</span>' +
          '</p>' +
        '</div>'
      )
    }
  }
})
