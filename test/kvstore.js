var KVStore = artifacts.require("./KVStore.sol");


contract('KVStore', function (accounts) {
  it("should store a key value pair in the mapping", function () {
    return KVStore.deployed().then(inst => { kvstore = inst }).then(function () {
      return kvstore.set("satoshi", "hello world").then(function () {
        return kvstore.get(accounts[0], "satoshi").then(function (value) {
          return assert.equal(value, "hello world", "value was not saved in mapping");
        });
      });
    });
  });
  it("should restrict key/value setting to address that owns mapping", function () {
    return KVStore.deployed().then(inst => { kvstore = inst }).then(function () {
      return kvstore.set("satoshi", "hello world", { from: accounts[0] }).then(function () {
        return kvstore.set("satoshi", "gox", { from: accounts[1] }).then(function () {
        }).then(function () {
          return kvstore.get(accounts[0], "satoshi").then(function (value) {
            var val0 = value;
            return kvstore.get(accounts[1], "satoshi").then(function (value) {
              return assert.notEqual(val0, value, "key value pairs saved by different address are equal");
            })
          });
        })
      });
    });
  });
  it("should not allow string with length over 1000 to be stored", function () {
    var bigString = "satoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamoto";
    return KVStore.deployed().then(inst => { kvstore = inst }).then(function () {
      return kvstore.set("tooBig", bigString)
      .then(assert.fail)
      .catch(function(error) {
        if(error.actual != undefined && error.actual.tx != undefined) {
          return assert(false, "too large a string was saved in mapping")
        } else {
            return assert(true);
        }
      });
    });
  });
});
