// require express
var express = require('express');
var path    = require('path');
var	async = require('async');
var session = require('express-session');
var app = express();

// create our router object
var router = express.Router();

// export our router
module.exports = router;

// connect to web3
const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

// Use the session middleware
app.set('trust proxy', 1)
app.use(session({ secret: 'password', resave: true, saveUninitialized: true, cookie: { secure: true }}))

// jQuery
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(window);

// Calling contract
var abi = [{"constant":false,"inputs":[{"name":"userAddress","type":"address"},{"name":"contractAddress","type":"bytes"}],"name":"backingUp","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"isName","type":"bytes"}],"name":"checkName","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes"}],"name":"getStorageByName","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddress","type":"address"}],"name":"getFilesByAddress","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newName","type":"bytes"},{"name":"newStorage","type":"bytes"}],"name":"save","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
var block = web3.eth.getBlock(2);
var transactions = block.transactions;
var receipt = web3.eth.getTransactionReceipt(transactions[0]);
var contractAddress = receipt.contractAddress;
var contract = web3.eth.contract(abi).at(contractAddress);

// Record contract info
var Rabi = [{"constant":false,"inputs":[{"name":"file","type":"bytes"}],"name":"addFileName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numFile","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"hasFile","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"FileNames","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"}]
var Rdata = '0x6060604052341561000f57600080fd5b5b61045d8061001f6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634c4f33741461005f57806376c8acdc146100bc5780637c231b39146100e5578063e1a459aa14610112575b600080fd5b341561006a57600080fd5b6100ba600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506101af565b005b34156100c757600080fd5b6100cf610216565b6040518082815260200191505060405180910390f35b34156100f057600080fd5b6100f861021c565b604051808215151515815260200191505060405180910390f35b341561011d57600080fd5b610133600480803590602001909190505061022f565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101745780820151818401525b602081019050610158565b50505050905090810190601f1680156101a15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600080548060010182816101c391906102ec565b916000526020600020900160005b83909190915090805190602001906101ea929190610318565b505060018060006101000a81548160ff0219169083151502179055506001600254016002819055505b50565b60025481565b600160009054906101000a900460ff1681565b60008181548110151561023e57fe5b906000526020600020900160005b915090508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102e45780601f106102b9576101008083540402835291602001916102e4565b820191906000526020600020905b8154815290600101906020018083116102c757829003601f168201915b505050505081565b815481835581811511610313578183600052602060002091820191016103129190610398565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061035957805160ff1916838001178555610387565b82800160010185558215610387579182015b8281111561038657825182559160200191906001019061036b565b5b50905061039491906103c4565b5090565b6103c191905b808211156103bd57600081816103b491906103e9565b5060010161039e565b5090565b90565b6103e691905b808211156103e25760008160009055506001016103ca565b5090565b90565b50805460018160011615610100020316600290046000825580601f1061040f575061042e565b601f01602090049060005260206000209081019061042d91906103c4565b5b505600a165627a7a72305820ef5d98f9ae8a3539a541cdbaeae184a439697ab34faffd29b99ebb6f259d68310029'


// // Signup
router.get('/signup', function(req, res){

  res.render('join')
})
router.post('/signup', function(req, res,next){
  if (req.body.target && req.body.target != 'undefined') {
    res.cookie('target', req.body.target);
    console.log(req.body.target);
  } console.log(req.body);

  var password = req.body.password;
  var userAddress = web3.personal.newAccount(password);
  app.locals.userAccount = userAddress;
  console.log("===================================================================");
  console.log("Account created: ", userAddress);
  console.log("===================================================================");
  console.log();
  var Rcreate = web3.eth.contract(Rabi).new({from:web3.eth.coinbase, data: Rdata, gas: 4300000}, function (e, Rcreate){
    console.log(e, Rcreate);
    if (typeof Rcreate.address !== 'undefined') {
      console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
      res.locals.raddress = Rcreate.address;
      console.log("===================================================================");
      console.log("Record contract created: ", res.locals.raddress);
      console.log("===================================================================");
      console.log();
      var save = contract.backingUp(userAddress, res.locals.raddress, {from:web3.eth.coinbase, gas: 1000000});
      console.log("===================================================================");
      console.log("Record contract registered", save);
      console.log("===================================================================");
      setTimeout(function(){ res.redirect('/'); }, 1000);
    }
  });
})

// Singin
router.get('/signin', function(req, res){
   res.render('signin')
})
router.post('/signin', function(req, res){
  if (req.body.target && req.body.target != 'undefined') {
    res.cookie('target', req.body.target);
    console.log(req.body.target);
  } console.log(req.body);

    var unlock = web3.personal.unlockAccount(req.body.account, req.body.password)
    if (unlock == true) {
      app.locals.userAccount = req.body.account;
      app.locals.pass = req.body.password;
      res.locals.userAccount = req.body.account;
      console.log('--------------------------------');
      console.log('Account found: ', app.locals.userAccount);
      console.log('--------------------------------');
      res.redirect('/')
    }
  res.render('signin')
})

// Index
router.get('/', function(req, res){
  if (typeof app.locals.userAccount == 'undefined') {
      console.log('-------------');
      console.log('No user found');
      console.log('-------------');
      res.redirect('/signin')
    } else {
    async.series([
      function(cb){
        console.log(app.locals.userAccount);
        res.locals.userAccount = app.locals.userAccount;
        res.locals.value = web3.fromWei(web3.eth.getBalance(app.locals.userAccount), "ether")
        return cb()
      }
    ],
    function(err) {
      if (err) {
        console.log(err);
        res.redirect("/")
      }
    }
    )
  }
  res.render('index')
})
router.post('/', function(req, res){
    async.series([
      function(cb){
        return cb()
      }
    ],
    function(err) {
      if (err) {
        console.log(err);
        res.redirect("/")
      }
    }
    )
})

// Admin
router.get('/admin', function(req, res){
  async.series([
    function(cb){

      return cb()
    }
  ],
    function(err) {
      if (err) {
        console.log(err);
        res.redirect("/")
      }
    }
  )
  res.render('admin')
})
router.post('/admin', function(req, res){
  async.series([
    function(cb){



      return cb()
    }
  ],
    function(err) {
      if (err) {
        console.log(err);
        res.redirect("/")
      }
    }
  )
  res.render('admin')
})

// Explorer
router.get('/explorer', function(req, res){
  async.series([
    function(cb){



      return cb()
    }
  ],
    function(err) {
      if (err) {
        console.log(err);
        res.redirect("/explorer")
      }
    }
  )
  res.render('explorer')
})
router.post('/explorer', function(req, res){



  res.render('explorer')
})
