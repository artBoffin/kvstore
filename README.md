# KVStore
[![Build Status](https://travis-ci.org/willhay/kvstore.svg?branch=master)](https://travis-ci.org/willhay/kvstore)

Store any data on the Ethereum blockchain specific to your Ethereum address. Only you can alter the data associated with your address. 

## Using the contract

These instructions will help you connect to the KVStore contract on the mainnet.

### Prerequisites

Install geth for your local machine

[Installation Instructions](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum)

At this point you need to make sure you have an account with ether in it so you can actually pay the fees associated with using the contract set function. 

Run the following command

```
$ geth account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat Passphrase:
Address: {addr}
```

After setting a password, send some ether to the account address given. 

### Setting Up

You are going to have to wait awhile for the blockchain to sync using geth. You can speed up the process by running 

```
geth --fast --cache=1024 --maxpeers=50
```

The cache=1024 allocates 1GB of RAM to syncing, you can up this to 2048 (2GB) or 4096 (4GB) depending on your computer's RAM to increase syncing speed.

Once the chain is synced up, run the following command to open up a new geth console to allow you to interact with the Ethereum network.

```
geth --verbosity 0 console
```


You need to double check to see if you have an ethereum balance by running 

```
web3.fromWei(eth.getBalance(eth.accounts[1]));
```

Once you've confirmed you have ether to pay transaction fees, copy and paste the following command.

```
var kvstoreContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_key","type":"string"},{"name":"_value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_acct","type":"address"},{"name":"_key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]).at("0xada438c7e11697dbac29fbcc86751157a7e4dec9");
```

This creates a new variable containing the smart contract so you can interact with it.

```
personal.unlockAccount(eth.accounts[1],password,600);
```
This will unlock your account you previously created for 10 minutes, letting you send ether from it.

Now that your account is unlocked, you can save data to the Ethereum blockchain by running:
```
kvstoreContract.set("fly","star",{from:eth.accounts[1]});
```
Now you have to wait a few minutes for the data to be confirmed in the next block. 

You can check the status on etherscan.io

Now run 

```
kvstoreContract.get(eth.accounts[1],"fly");
```

And you will see the data you previously saved to the Ethereum network in the console! 


## Testing Locally

These instructions will help you get the KVStore contract up and running on your local machine for development and testing purposes.

### Prerequisites

Install truffle

```
npm install -g truffle
```

Install [ganache-cli](https://github.com/trufflesuite/ganache-cli)
```
npm install -g ganache-cli
```

Or download the [Ganache client](http://truffleframework.com/ganache/)

### Setting up

If you opted to install ganache-cli, open a terminal window and run 
```
ganache-cli -p 7545
```
This will setup a new personal blockchain with 10 accounts filled with test Ethereum

Otherwise the Ganache client is automatically configured to work with port 7545 and all you need to do is open it up. 

Open a new terminal window, clone the repo and cd into the directory

```
git clone https://github.com/willhay/kvstore.git
cd kvstore
```

Run a few truffle commands

```
truffle compile
truffle migrate --network development
truffle console --network development
```
This compiles the contract, migrates it to the blockchain you setup above, and puts you in a command prompt where you can access the contract directly. 

You can define a new network in the truffle.js config file if needed. 

### Running the contract

Now you are inside the truffle console and should see a prompt similar to:

```
truffle(development)>
```
Now some setup:
```
KVStore.deployed().then(inst => { kvstore = inst })
```
This creates a new variable, **kvstore**, containing an instance of the KVStore contract

Now you can call kvstore.set(key,value) to store data on the blockchain that only you can change. 

```
kvstore.set("satoshi","hello world")
```
Will store the string "hello world" associated with the key "satoshi" on your local blockchain, all accessible under the ethereum address you called the contract with. 

You should now see the terminal window containing the ganache-cli instance update with a new transaction, or the Ganache client show some new transactions on the Transactions tab. 

If you want to access the data you've stored, you can call kvstore.get(address, key):

```
kvstore.get(web3.eth.accounts[0], "satoshi")
```
will return "hello world"


And thats it!
