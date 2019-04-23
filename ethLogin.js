const Fortmatic = require('fortmatic');
const Web3 = require('web3');

let fm = new Fortmatic('pk_test_04A320747FF2103C');
let web3 = new Web3(fm.getProvider());

let lastId = 1;

// Initializing connection to the NEAR DevNet.
let near = await nearlib.dev.connect(settings);
let contract = await near.loadContract(contractName, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ["getNearAddress"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ["connectEthereumAddress", "disconnectEthereumAddress"],
    sender: accountId
});

exports.loginWithSms = async () => {
    let accounts = await getAccounts();
    console.log('accounts', accounts);

    const from = accounts[0];

    const msg = hexEncode('Hello, World!');
    const params = [msg, from];
    const method = 'personal_sign';

    const result = await sendAsync({
        id: ++lastId,
        method,
        params,
        from,
    });
    console.log(result);
    
    // TODO
    //const nearAddress = await contract.getNearAddress({ethAddress: from});

    return result;
}

const getAccounts = promisify(web3.eth.getAccounts.bind(web3.eth));
const sendAsync = promisify(web3.currentProvider.sendAsync.bind(web3.currentProvider));

function promisify(fn) {
    return () => {
        let args = Array.from(arguments);
        return new Promise((resolve, reject) => {
            fn.apply(args.concat([(error, result) => {
                if (error) return reject(error);
                resolve(result);
            }]));
        });
    }
}

function hexEncode(str) {
    return '0x' + new Buffer(str).toString('hex');
}