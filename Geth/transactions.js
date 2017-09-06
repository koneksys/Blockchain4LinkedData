function makeUsers(){
  var contract = eth.contract(abi).at("0x5bfe4d899d32b1ac79ed58e5922f05358dfa03ad");
  setInterval(
    function () {
      var userKey = personal.newAccount("password");
      var userNumber = 0;
      var userNumber = userNumber + 1;
      contract.addUser(
        userKey,
        "User" + userNumber, "user" + userNumber + "@mail.com",
        "false"+ userNumber,
        {from: eth.coinbase}
      );
      contract.newUser({from:eth.coinbase});
    }, 300);
}

function addUser() {
  var contract = eth.contract(abi).at("0xb31968e5d16389a1bca0e47aa6fcad4cf89530e7");
  setInterval(
    function () {
      var key = personal.newAccount("password");
      var name = "name"; var mail = "mail";
      var perm = "perm";
      contract.addUser(key, name, mail, perm, {from:eth.coinbase});
      contract.newUser({from:eth.coinbase});
    }, 300);
}
