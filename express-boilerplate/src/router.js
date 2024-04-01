const express = require('express')
const router = new express.Router()

const brandController = require('./controllers/brand.controller');
const categoryController = require('./controllers/category.controller');
const productController = require('./controllers/product.controller');
const customerController = require('./controllers/customer.controller');
const roleController = require('./controllers/role.controller');
const userController = require('./controllers/user.controller')

const passport = require('passport');
const customerAuth = require('./middlewares/customerAuth');
const userAuth = require('./middlewares/userAuth');
const errorHandler = require('./middlewares/errorHandler');

//Categories
router.post('/categories', categoryController.addCategory)

//Brands
router.post('/brands', brandController.addBrand)

//Products
router.get('/products', productController.getProducts)

//Customers
router.post('/customers/login', customerController.contactLogin);
router.post('/customers/logout',customerAuth, customerController.logoutCustomer)
router.post('/customers', customerController.contactRegister);
router.post('/generateOtp', customerController.generateOtp);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('hello world..  done successful');
});
//router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/login' }));
router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
router.get('/auth/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.send('hello world..  done successful');
});
//router.get('/auth/facebook/redirect', passport.authenticate('facebook', { failureRedirect: '/login' }));

//Roles
router.post('/roles', roleController.createRole);
router.get('/roles', roleController.getRoles);

//Users
router.post('/users', userAuth('createUser'), userController.createUser);
router.post('/users/login', userController.loginUser);
router.post('/users/logout',userAuth(), userController.logoutUser)


router.use(errorHandler.notFoundErrorHandler);
router.use(errorHandler.commonErrorHandler);    


module.exports = router