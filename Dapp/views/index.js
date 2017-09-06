// Connect to web3
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Calling contracts
// General contract
var abi = [{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"contractAddress","type":"bytes"}],"name":"backingUp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"isName","type":"bytes"}],"name":"checkName","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes"}],"name":"getStorageByName","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getFilesByAddress","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newName","type":"bytes"},{"name":"newStorage","type":"bytes"}],"name":"save","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
var address = web3.eth.getTransactionReceipt(web3.eth.getBlock(2).transactions[0]).contractAddress;
var contract = web3.eth.contract(abi).at(address);
// External contract
var externalabi = [{"constant":false,"inputs":[{"name":"file","type":"bytes"}],"name":"addFileName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numFile","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"hasFile","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"FileNames","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"}]
var externaladdress = contract.getFilesByAddress(document.getElementById('Account').innerText);
var externalcontract = web3.eth.contract(externalabi).at(externaladdress);

// Functions
// Checking if save/retrieve
if (externalcontract.hasFile() == false) {
  function readSingleFile(evt) {
      var f = evt.target.files[0];
      if (f) {
        var r = new FileReader();
        r.onload = function(e) {
  	      var contents = e.target.result;
          document.getElementById('codeInput').innerText = e.target.result;
        }
        r.readAsText(f);
      } else {
        alert("Failed to load file");
      }
    }
  function save(){
    var name = document.getElementById('newName').value;
    if (contract.checkName(name) == false) {
      var info = document.getElementById('codeInput').innerText;
      var uri = encodeURI(info);
      var newName = document.getElementById('newName').value;
      var save =contract.save(newName, uri, {from:web3.eth.coinbase, gas: 10000000})
      externalcontract.addFileName(newName, {from:web3.eth.coinbase,gas:10000000})
      console.log("Saving ",newName, "at: ", save ," with code: ", info);
      setTimeout(function(){
        location.reload();
      }, 500);
    } else {
      alert("Name already being used, please try changing a letter")
    }
  }
  $('#box1').css({"width":"93vh","height":"18vh","margin-bottom":"1vh"});
  $('#box3').css({"width":"127vh"})
  document.getElementById('pindextitle').innerText = "Seems that you don't have files yet, type your code or load a file";
  $('#pindextitle').append(
    "<input style='margin-bottom:1vh;color:#fff;display: inline-block;margin-left: 1vh;', type='file', id='fileinput, placeholder='File', onchange='readSingleFile(event)'>"
  )
  $('#box3').append(
    '<div id="codeInput" contenteditable="true"></div>' +
    '<span class="type7" id="newNameSpan" style="margin-left:2vh;display: block;text-align: left;">Name your file/code</span>' +
    '<span style="margin-left: 2vh;display: block;width: 55vh;font-size: 14px;color: #000;text-decoration: underline;"> *make sure your code/file is correct, once in the blockchain it stays there forever</span>' +
    '<input id="newName" type="text" style="display: block;margin-left:2vh;margin-top: 5px;outline:none;width:51vh;" placeholder="File name">' +
    '<button class="button12 type5 testGo button" id="newButton" style="width:55vh;margin: auto;margin-left:2vh; margin-top: 1em; display: block;" onclick="save();">Save</button>'
  )
  $('#codeInput').css({"width":"84vh","margin-left":"2vh","border":"1px solid","display":"block","height":"39vh","overflow":"scroll"})
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
    '</span>'
   )
  console.log('Account has no files');
}
if (externalcontract.hasFile() == true) {
  function readSingleFile(evt) {
      var f = evt.target.files[0];
      if (f) {
        var r = new FileReader();
        r.onload = function(e) {
  	      var contents = e.target.result;
          document.getElementById('codeInput').innerText = e.target.result;
        }
        r.readAsText(f);
      } else {
        alert("Failed to load file");
      }
    }
  function appendCode(id){
    console.log(id.innerText);
    var raw = contract.getStorageByName(id.innerText);
    var uri = web3.toAscii(raw);
    var file = decodeURI(uri);
    console.log('---------------');
    console.log(file);
    console.log('---------------');
    $('#codeInput').empty();
    document.getElementById("codeInput").innerText = file;
  }
  function rename(){
    var newName = document.getElementById("newName").innerText;
    var codet = document.getElementById("codeInput").innerText;
    console.log('-------------------------------------------');
    console.log("Changing name to: ", newName, "of code: ");
    console.log(code);
    console.log('-------------------------------------------');
  }
  function save(){
    var name = document.getElementById('newName').value;
    if (contract.checkName(name) == false) {
      var info = document.getElementById('codeInput').innerText;
      var uri = encodeURI(info);
      var newName = document.getElementById('newName').value;
      var save =contract.save(newName, uri, {from:web3.eth.coinbase, gas: 10000000})
      externalcontract.addFileName(newName, {from:web3.eth.coinbase,gas:10000000})
      console.log("Saving ",newName, "at: ", save ," with code: ", info);
      setTimeout(function(){
        location.reload();
      }, 800);
    } else {
      alert("Name already being used, please try changing a letter")
    }
  }
  console.log('Account has files');
  $('#box1').css({"width":"75vh","margin-left":"1vh","height":"18vh"})
  $('#box2').css({"display":"block","height":"86vh","margin-left":"1vh","width":"28vh"});
  $('#box3').css({"height":"64vh","width":"90vh","margin-left":"1vh","overflow":"scroll"})
  document.getElementById('pindextitle').innerText = "To see a file simply click on its name";
  $('#pindextitle').append(
    "<input style='margin-bottom:1vh;color:#fff;display: inline-block;margin-left: 1vh;', type='file', id='fileinput, placeholder='File', onchange='readSingleFile(event)'>"
  )
  $('#box3').append(
    '<div id="codeInput" contenteditable="true"> </div>'+
    '<span class="type7" id="newNameSpan" style="margin-left:2vh;display: block;text-align: left;">Name your file/code</span>' +
    '<span style="margin-left: 2vh;display: block;width: 55vh;font-size: 14px;color: #000;text-decoration: underline;"> *make sure your code/file is correct, once in the blockchain it stays there forever</span>' +
    '<input id="newName" type="text" style="display: block;margin-left:2vh;margin-top: 5px;outline:none;width:51vh;" placeholder="File name">' +
    '<button class="button12 type5 testGo button" id="newButton" style="width:55vh;margin: auto;margin-left:2vh; margin-top: 1em; display: block;" onclick="save();">Save</button>'
  )
  $('#codeInput').css({"width":"84vh","margin-left":"2vh","border":"1px solid","display":"block","height":"39vh","overflow":"scroll"})
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
    '</span>'
   )
  $('#box2').append(
    '<div class="content">' +
      '<p class="title2" id="listOfNames" style="padding: 0px 0px 1em;">These are your files</p>' +
      '<p id="names"> </p>'+
    '</div>'
  )
  var fileNumber = externalcontract.numFile();
  for (var i = 0; i < fileNumber; i++) {
    if (externalcontract.FileNames(i)) {
        var s = web3.toAscii(externalcontract.FileNames(i));
        var id = 'fileName' + i;
        $('#listOfNames,#name,#boxFileNames').css({"display":"block"});
        $('#names').append(
          '<span style="display:block;margin-left: 2vh;font-size: 17px;" id="'+ id +'" onclick="appendCode('+ id +');">' +
          s +
          '</span>'
        )
        console.log("===================================================================");
        console.log("File Number ",i, ': ', s);
        console.log("===================================================================");
    }
  }
}
