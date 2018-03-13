pragma solidity ^0.4.18;

contract KVStore {

  mapping(address => mapping(string => string)) store;

  function get(address acct, string key) public view returns(string) {
    return store[acct][key];
  }
  function set(string key, string value) public {
    store[msg.sender][key] = value;
  }
}
