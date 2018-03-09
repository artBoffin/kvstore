var KVStore = artifacts.require("./KVStore.sol");

module.exports = function(deployer) {
  deployer.deploy(KVStore);
};