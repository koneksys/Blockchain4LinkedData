Blockchain4LinkedData
  This is a Dapp where you can save any type of data in blockchain. You can either write your code/information or you can load a file.

Installation
  To install download the repository.
  In the Blockchain/Geth folder run $ make geth, to run it you'll need to have Go-lang installed in your computer.
  In the Dapp folder run npm install, to run it you'll nedd node.js and npm installed in your computer.

Usage
  In the Blockchain/Geth folder run the command
  $build/bin/geth --datadir /path/to/Blockchain/Blockchain --port 30301 --rpcport 8545 --networkid 1234 --nodiscover --unlock 0 --password pas.txt --rpc --rpccorsdomain * --rpcapi="db,eth,net,web3,personal,web3,miner" --mine

  In the Blockchain/Dapp folder run node server.js

  Now the Dapp should be running on localhost:3003

You're going to be on the signin by default, in the corner there's a link to signup.
In Signup you only need your password, automatically you're going to get an account save this address, in the index at first you're not going to have any files to display, type some lines of code or whatever you like or load a local file, once you load your file be sure that it's correct because once you click save it's going to be there forever.

