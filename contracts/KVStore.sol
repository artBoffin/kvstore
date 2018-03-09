pragma solidity ^0.4.18;

contract KVStore {

  mapping(address => mapping(string => string)) store;

  function get(string key) public constant returns(string) {
    return store[msg.sender][key];
  }
  function set(string key, string value) public {
    store[msg.sender][key] = value;
  }
}
