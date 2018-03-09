pragma solidity ^0.4.18;

contract KVStore {

  mapping(address => string) store;

  function get(address key) public constant returns(string) {
    return store[key];
  }
  function set(string value) public {
    store[msg.sender] = value;
  }
}
