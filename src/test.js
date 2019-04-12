// >> tests-snippet
describe("Greeter", function() {
    let near;
    let contract;
    let accountId;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    // Common setup below
    beforeAll(async function() {
      if (window.testSettings === undefined) {
        window.testSettings = {};
      }
      near = await nearlib.dev.connect(testSettings);
      accountId = testSettings.accountId ? testSettings.accountId : nearlib.dev.myAccountId;
      const contractName = testSettings.contractName ?
        testSettings.contractName :
        (new URL(window.location.href)).searchParams.get("contractName");
      contract = await near.loadContract(contractName, {
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ["getNearAddress"],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ["connectEthereumAddress", "disconnectEthereumAddress"],
        sender: accountId
      });
    });

    describe("eth-connector", function() {
      const ETH_ADDRESS = "whatever actually";

      beforeAll(async function() {
        // There can be some common setup for each test.
      });

      it("can record NEAR to ETH address mapping", async function() {
        await contract.connectEthereumAddress({ethAddress: ETH_ADDRESS});
        let nearAddress = await contract.getNearAddress({ethAddress: ETH_ADDRESS});
        expect(nearAddress).toBe(accountId);
      });

      it("can remove NEAR to ETH address mapping", async function() {
        const ETH_ADDRESS = "whatever actually";
        await contract.connectEthereumAddress({ethAddress: ETH_ADDRESS});
        await contract.disconnectEthereumAddress();
        let nearAddress = await contract.getNearAddress({ethAddress: ETH_ADDRESS});
        expect(nearAddress).toBe(null);
      });
  });
});
// << tests-snippet
