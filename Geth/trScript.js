var endBlock = 10000;
function scal(){
  if (eth.blockNumber != endBlock) {

    var abi =[{"constant":true,"inputs":[],"name":"Email","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_email","type":"string"},{"name":"_allowed","type":"string"}],"name":"User","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_allowed","type":"string"}],"name":"setPermission","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_email","type":"string"}],"name":"setMail","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"Allowed","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"Name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"setName","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"address"},{"indexed":false,"name":"","type":"string"}],"name":"Event","type":"event"}]
    var address = "0x6edd06bf1957fb73479f2903ea3012dffd04e8bf";
    var contract = eth.contract(abi).at(address);
      miner.start();
      var transaction = contract.User.sendTransaction("User","mail","permission",{from: sender});
      miner.stop();
  } else {
    scal();
  }
  scal();
}
