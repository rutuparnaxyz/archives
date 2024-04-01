const axios = require('axios');
const options = require('../utils/bigcommerce');

async function getProducts(){
    try {
        const products = await axios.get('https://api.bigcommerce.com/stores/m0o2znijdl/v3/catalog/products', options)
        return products.data;
    } catch (error) {
        throw new Error(error.message)
    }  
}

module.exports = {
    getProducts
}