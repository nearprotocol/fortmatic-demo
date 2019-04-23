let ethLogin = require('./ethLogin');

ethLogin.loginWithSms().catch(console.error).then(console.log);