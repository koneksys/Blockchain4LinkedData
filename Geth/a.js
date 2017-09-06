function transactions(){
  var abi = [{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"userName","type":"bytes32"},{"name":"userMail","type":"bytes32"},{"name":"userPerm","type":"bytes32"}],"name":"addUser","outputs":[{"name":"index","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"userMail","type":"bytes32"}],"name":"updateUserMail","outputs":[{"name":"index","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"userName","type":"bytes32"}],"name":"updateUserName","outputs":[{"name":"index","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUser","outputs":[{"name":"userName","type":"bytes32"},{"name":"userMail","type":"bytes32"},{"name":"userPerm","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"userPerm","type":"bytes32"}],"name":"updateUserPerm","outputs":[{"name":"index","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"userName","type":"bytes32"},{"name":"userMail","type":"bytes32"},{"name":"userPerm","type":"bytes32"}],"name":"updateUser","outputs":[{"name":"index","type":"uint256"}],"payable":false,"type":"function"}];
  var contract = eth.contract(abi).at("0x347ba38ec070f0807ec987a2ba4996943a714a4b");
  var key = 0;
  setInterval(
  function () {
    key++;
    contract.addUser(key, "User" + key, "user" + key + "@mail.com", "false" + key, {from: eth.coinbase});
  }, 300);
}

function userInfo(o){
  var abi = [{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"userName","type":"bytes32"},{"name":"userMail","type":"bytes32"},{"name":"userPerm","type":"bytes32"}],"name":"addUser","outputs":[{"name":"index","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"userMail","type":"bytes32"}],"name":"updateUserMail","outputs":[{"name":"index","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"userName","type":"bytes32"}],"name":"updateUserName","outputs":[{"name":"index","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getUser","outputs":[{"name":"userName","type":"bytes32"},{"name":"userMail","type":"bytes32"},{"name":"userPerm","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"userPerm","type":"bytes32"}],"name":"updateUserPerm","outputs":[{"name":"index","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"userName","type":"bytes32"},{"name":"userMail","type":"bytes32"},{"name":"userPerm","type":"bytes32"}],"name":"updateUser","outputs":[{"name":"index","type":"uint256"}],"payable":false,"type":"function"}];
  var contract = eth.contract(abi).at("0xd2f9319efb35449395a434518c94ebefd6855dc7");
  var user = contract.getUser(o);
  console.log();
  console.log('contract.getUser("0x94fa4d0738f8e773eb4891cb5850a2a1b87ebd63")');
  console.log("   ['", user[0]) + "',";
  console.log("    '", user[1]) + "',";
  console.log("    '", user[2] + "']");
  console.log();
  console.log('Decoding...');
  for (var i = 0; i < user.length; i++) {
    console.log("   ", web3.toAscii(user[i]));
  }
  console.log();
}
