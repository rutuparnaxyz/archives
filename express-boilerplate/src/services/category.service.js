const axios = require('axios');
const options = require('../utils/bigcommerce')

async function addCategory(categoryBody){
    try {
        const category = await axios.post('https://api.bigcommerce.com/stores/m0o2znijdl/v3/catalog/categories', JSON.stringify(categoryBody), options)
        return category.data;
    } catch (error) {
        throw new Error(error.message);
    }  
}

module.exports = {
    addCategory
}