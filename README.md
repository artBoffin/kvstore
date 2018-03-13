# KVStore
[![Build Status](https://travis-ci.org/willhay/kvstore.svg?branch=master)](https://travis-ci.org/willhay/kvstore)

Store any data on the Ethereum blockchain specific to your Ethereum address. Only you can alter the data associated with your address. 

## Getting Started

These instructions will help you get the KVStore contract up and running on your local machine for development and testing purposes.

## Prerequisites

Install truffle

```
npm install -g truffle
```

Install [ganache-cli](https://github.com/trufflesuite/ganache-cli)
```
npm install -g ganache-cli
```

Or download the [Ganache client](http://truffleframework.com/ganache/)

## Setting up

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

## Running the contract

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

If you want to access the data you've stored, you can call kvstore.get(key):

```
kvstore.get("satoshi")
```
will return "hello world"


And thats it!
