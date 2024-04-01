const BIG_COMMERCE = require('../../config/common.config').BIG_COMMERCE;
const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': BIG_COMMERCE.ACCESS_TOKEN,  
        'X-Auth-Client': BIG_COMMERCE.CLIENT_ID 
    }
};

module.exports = options;