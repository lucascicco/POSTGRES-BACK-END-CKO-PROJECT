import { Router } from 'express';
import multer from 'multer';

import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SectionController';
import AvatarFileController from './app/controllers/AvatarFileController';
import LocationController from './app/controllers/LocationController';
import PersonalDataController from './app/controllers/PersonalData';
import ProductsController from './app/controllers/ProductsController';
import PurchaseController from './app/controllers/PurchaseController';
import FavoriteItemsController from './app/controllers/FavoriteItems';
import ProductFeaturesController from './app/controllers/FeaturesProduct';

import authMiddleware from './app/middlewares/auth';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SectionStore';
import validateProductStore from './app/validators/ProductStore';
import validateProductUpdate from './app/validators/ProductUpdate';
import validatePersonalDataStore from './app/validators/PersonalDataStore';
import validatePersonalDataUpdate from './app/validators/PersonalDataUpdate';
import validateLocationStore from './app/validators/LocationStore';
import validateLocationUpdate from './app/validators/LocationUpdate';
import validatePurchaseStore from './app/validators/PurchaseStore';
import validateSendingFeatures from './app/validators/SendingFeatures';

import MessageController from './app/controllers/MessagesEmail';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post('/users', validateUserStore, UserController.store);
routes.post('/login', validateSessionStore, SessionController.store);

routes.get('/products', ProductsController.getAllProducts);
routes.get('/productsByCategory', ProductsController.getProductsByCategory);
routes.get('/product', ProductsController.getOneProduct);

// cep validation
routes.get('/checkingCep', LocationController.checkingCep);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

// files
routes.post('/avatar', upload.single('file'), AvatarFileController.store);

// cellhpone
routes.get('/cellphone', PersonalDataController.getNumber);

// Products
routes.post(
  '/product',
  upload.single('file'),
  validateProductStore,
  ProductsController.store
);

routes.get('/verifierProduct', ProductsController.getOneProductTinyDetail);
routes.put('/product', validateProductUpdate, ProductsController.update);
routes.delete('/product', ProductsController.DeleteProduct);
routes.get('/productsExceptMine', ProductsController.getAllProductsExceptMine);
routes.get('/myProducts', ProductsController.getMyProducts);
routes.get('/myCart', ProductsController.CartOfProducts);
routes.put('/changestatus', ProductsController.ChangeStatus);
routes.get('/allowcreateproduct', ProductsController.CreateNewProductYesNo);

// purchases
routes.post('/createPurchase', validatePurchaseStore, PurchaseController.store);
routes.get('/myPurchases', PurchaseController.GetAllPurchases_Buyer);
routes.get('/mySells', PurchaseController.GetAllPurchases_Seller);
routes.get('/mySellsByProductId', PurchaseController.SellsDoneByProduct);

// location
routes.post('/location', validateLocationStore, LocationController.store);
routes.post(
  '/location_purchase',
  validateLocationStore,
  LocationController.purchase_store
);
routes.put('/location', validateLocationUpdate, LocationController.update);

// personal data
routes.post(
  '/personal_data',
  validatePersonalDataStore,
  PersonalDataController.store
);
routes.put(
  '/personal_data',
  validatePersonalDataUpdate,
  PersonalDataController.update
);

// favoriteItems
routes.put('/Add_favoriteitem', FavoriteItemsController.AddItem);
routes.put('/Remove_favoriteitem', FavoriteItemsController.RemoveItem);
routes.get('/getfavoriteitems', FavoriteItemsController.GetArray);

routes.get('/frete', ProductsController.FreteCalculate);
routes.post(
  '/features',
  validateSendingFeatures,
  ProductFeaturesController.store
);

routes.put(
  '/features',
  validateSendingFeatures,
  ProductFeaturesController.update
);

// sending email
routes.post('/sendingEmailSeller', MessageController.sendMessageSeller);
routes.post('/sendingEmailBuyer', MessageController.sendMessageBuyer);

export default routes;
