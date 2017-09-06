// Connect web3
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Callling contract
var abi = [{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getStorageByAccount","outputs":[{"name":"","type":"bytes"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"isName","type":"bytes"}],"name":"checkName","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newName","type":"bytes"},{"name":"newStorage","type":"bytes"},{"name":"userAddress","type":"address"}],"name":"save","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes"}],"name":"getStorageAt","outputs":[{"name":"","type":"bytes"}],"payable":false,"type":"function"}];
var block = web3.eth.getBlock(2);
var transactions = block.transactions;
var receipt = web3.eth.getTransactionReceipt(transactions[0]);
var contractAddress = receipt.contractAddress;
var contract = web3.eth.contract(abi).at(contractAddress)

// Record contract info
var Rabi = [{"constant":false,"inputs":[{"name":"file","type":"bytes"}],"name":"addFileName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"FileNames","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"}]
var Rdata = '0x6060604052341561000f57600080fd5b5b6103b28061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634c4f337414610049578063e1a459aa146100a6575b600080fd5b341561005457600080fd5b6100a4600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610143565b005b34156100b157600080fd5b6100c76004808035906020019091905050610184565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101085780820151818401525b6020810190506100ec565b50505050905090810190601f1680156101355780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600080548060010182816101579190610241565b916000526020600020900160005b839091909150908051906020019061017e92919061026d565b50505b50565b60008181548110151561019357fe5b906000526020600020900160005b915090508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102395780601f1061020e57610100808354040283529160200191610239565b820191906000526020600020905b81548152906001019060200180831161021c57829003601f168201915b505050505081565b8154818355818115116102685781836000526020600020918201910161026791906102ed565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102ae57805160ff19168380011785556102dc565b828001600101855582156102dc579182015b828111156102db5782518255916020019190600101906102c0565b5b5090506102e99190610319565b5090565b61031691905b808211156103125760008181610309919061033e565b506001016102f3565b5090565b90565b61033b91905b8082111561033757600081600090555060010161031f565b5090565b90565b50805460018160011615610100020316600290046000825580601f106103645750610383565b601f0160209004906000526020600020908101906103829190610319565b5b505600a165627a7a7230582045501241c822b46cdc94dc90288253ec7b218deb0d65b9671ad61ddf1afd729b0029'


// // Join.oug
// function join(){
//   var password = document.getElementById("password").value;
//   var userAddress = web3.personal.newAccount(password);
//   var Rcreate = web3.eth.contract(Rabi).new({from:web3.eth.coinbase, data: Rdata, gas: 4300000});
// }


// Save.pug
// Appending example RDF
$('#codeInput').append(
  '<span style="box-sizing: inherit; font-family: Consolas, &quot;courier new&quot;; color: brown;">' +
    '<span style="box-sizing: inherit; color: mediumblue;">&lt;</span>?xml'+
    '<span style="box-sizing: inherit; color: red;">&nbsp;version'+
      '<span style="box-sizing: inherit; color: mediumblue;">="1.0"</span>?</span><span style="box-sizing: inherit; color: mediumblue;">&gt;'+
    '</span>'+
  '</span>'+
  '<br>'+
  '<br>' +
  '<span style="box-sizing: inherit; font-family: Consolas, &quot;courier new&quot;; color: brown;">' +
    '<span style="box-sizing: inherit; color: mediumblue;">&lt;</span>rdf:RDF' +
    '<span style="box-sizing: inherit; color: red;">' +
      '<br style="box-sizing: inherit;">&nbsp; xmlns:rdf' +
      '<span style="box-sizing: inherit; color: mediumblue;">="http://www.w3.org/1999/02/22-rdf-syntax-ns#"</span>' +
      '<br style="box-sizing: inherit;">&nbsp; xmlns:si' +
      '<span style="box-sizing: inherit; color: mediumblue;">="https://www.w3schools.com/rdf/"</span>' +
    '</span>' +
    '<span style="box-sizing: inherit; color: mediumblue;">&gt;</span>' +
  '</span>' +
  '<br>' +
  '<br>' +
  '<span style="box-sizing: inherit; font-family: Consolas, &quot;courier new&quot;; color: brown;">' +
    '<span style="box-sizing: inherit; color: mediumblue;">&lt;</span>rdf:Description' +
    '<span style="box-sizing: inherit; color: red;">&nbsp;rdf:about' +
      '<span style="box-sizing: inherit; color: mediumblue;">="https://www.w3schools.com"</span>' +
      '<span style="box-sizing: inherit; color: mediumblue;">&gt;</span>' +
    '</span>' +
  '</span>' +
  '<br>' +
  '<span style="font-family: Consolas, &quot;courier new&quot;;">&nbsp;&nbsp;</span>' +
  '<span style="box-sizing: inherit; font-family: Consolas, &quot;courier new&quot;; color: brown;">'+
     '<span style="box-sizing: inherit; color: mediumblue;">&lt;</span>si:title' +
    '<span style="box-sizing: inherit; color: mediumblue;">&gt;</span>' +
  '</span>' +
  '<span style="font-family: Consolas, &quot;courier new&quot;;">W3Schools</span>' +
  '<span style="box-sizing: inherit; font-family: Consolas, &quot;courier new&quot;; color: brown;">' +
    '<span style="box-sizing: inherit; color: mediumblue;">&lt;</span>/si:title' +
    '<span style="box-sizing: inherit; color: mediumblue;">&gt;</span>' +
  '</span>' +
  '<br>' +
  '<span style="font-family: Consolas, &quot;courier new&quot;;">&nbsp;&nbsp;</span>' +
  '<span style="box-sizing: inherit; font-family: Consolas, &quot;courier new&quot;; color: brown;">' +
    '<span style="box-sizing: inherit; color: mediumblue;">&lt;</span>si:author' +
    '<span style="box-sizing: inherit; color: mediumblue;">&gt;</span>' +
  '</span>' +
  '<span style="font-family: Consolas, &quot;courier new&quot;;">Jan Egil Refsnes</span>' +
  '<span style="box-sizing: inherit; font-family: Consolas, &quot;courier new&quot;; color: brown;">' +
    '<span style="box-sizing: inherit; color: mediumblue;">&lt;</span>/si:author' +
    '<span style="box-sizing: inherit; color: mediumblue;">&gt;</span>' +
  '</span>' +
  '<br>' +
  '<span style="box-sizing: inherit; font-family: Consolas, &quot;courier new&quot;; color: brown;">' +
    '<span style="box-sizing: inherit; color: mediumblue;">&lt;</span>/rdf:Description' +
    '<span style="box-sizing: inherit; color: mediumblue;">&gt;</span>' +
  '</span>' +
  '<br>' +
  '<br>' +
  '<span style="box-sizing: inherit; font-family: Consolas, &quot;courier new&quot;; color: brown;">' +
    '<span style="box-sizing: inherit; color: mediumblue;">&lt;</span>/rdf:RDF' +
    '<span style="box-sizing: inherit; color: mediumblue;">&gt;</span>' +
  '</span>')

// Saving document in chain
function storeIt(){
  var UserAddress = document.getElementById("address").value;
  var div = document.getElementById("codeInput").innerText;
  var coded = encodeURI(div);
  var name = document.getElementById("name").value;
  var hash = contract.save(name, coded, UserAddress, {from:web3.eth.coinbase, gas: 100000000});
  console.log("-----------------------------------");
  console.log("Coding input", coded);
  console.log("Saving file with name: ", name);
  console.log("Saving file at: ", hash);
  console.log("-----------------------------------");
}

// Reading document from client
function onFileLoad(elementId, event) {
    var s = document.getElementById(elementId).innerText = event.target.result;
    $('#contents').css({"border": "1px solid"})
    $('#contents').append(
      '<div>' +
      '<span style="color: #000;text-align: center;display: block;"> Make sure your code is correct, then press "Go"</span>' +
      '<button class="button" type="submit" style="margin: auto; margin-top: 1em; display: block;" onclick="save();">Go</button>' +
      '</div>'
    )
}
function onChooseFile(event, onLoadFileHandler) {
    let input =  event.target;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = onLoadFileHandler;
    fr.readAsText(file);
  }

// Retrieve.pug
// Retrieving file from chain
function retrieveFile(){
  $("#fileName,#button").css({"display": "none"});
  var fileName = document.getElementById("fileName").value;

  var rawFile = contract.getStorageAt(fileName);
  var URIfile = web3.toAscii(rawFile);
  var file = decodeURI(URIfile);

  $('#CodeInput, #CodeLabel, #newName, #newNameSpan, #newButton, #newNameAddress').css({"display": "block"});
  document.getElementById("CodeInput").innerText = file;
  document.getElementById("title").innerText = "If you want to rename your file, please indicate the new name below, do not loose your file name or you will not be able to retrieve it.";
  document.getElementById("newNameSpan").innerText = "Please indicate your address and your new file name";
  $("#CodeLabel").text(fileName);
}
// Renaming file from chain
function rename(){
  var newName = document.getElementById("newName").value;
  var newAddress = document.getElementById("newNameAddress").value;
  var newCode = document.getElementById("CodeInput").innerText;
  var renamingHash = contract.save(newName, newCode, newAddress,{from:web3.eth.coinbase, gas: 100000000});
}
