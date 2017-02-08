const crypto = require('crypto');

let CryptoHelper = {
    generateSalt: () => {
        return crypto.randomBytes(128).toString('base64');
    },
    generateHashedPassword: (salt, pwd) => {
        return crypto.createHmac('sha256', salt).update(pwd).digest('hex');
    }
};
module.exports = CryptoHelper;