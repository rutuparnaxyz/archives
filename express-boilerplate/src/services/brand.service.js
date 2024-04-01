const axios = require('axios');
const options = require('../utils/bigcommerce')

async function addBrand(brandBody){
    try {
        const brand = await axios.post('https://api.bigcommerce.com/stores/2acctzivgs/v3/catalog/brands', JSON.stringify(brandBody), options)
        return brand.data;
    } catch (error) {
        throw new Error(error.message);
    }  
}

module.exports = {
    addBrand
}