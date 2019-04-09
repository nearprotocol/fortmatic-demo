const Fortmatic = require('fortmatic');
const Web3 = require('web3');

let fm = new Fortmatic('pk_test_04A320747FF2103C');
let web3 = new Web3(fm.getProvider());

web3.eth.getAccounts((error, accounts) => {
    if (error) throw error;

    console.log('accounts', accounts);

    const from = accounts[0];
    const msg = hexEncode('Hello, World!');
    const params = [msg, from];
    const method = 'personal_sign';
   
    web3.currentProvider.sendAsync({
      id: 1,
      method,
      params,
      from,
    }, function(error, result) {
      if (error) throw error;
      console.log(result);

      document.querySelector('.console').innerHTML += `\nSigned successfully:\n${JSON.stringify(result)}`;
    });
});

function hexEncode(str) {
    return '0x' + new Buffer(str).toString('hex');
}