const { Router } = require('express');
const viewController = require('@controllers/viewController');

const router = Router();

router.get('/', viewController.index);
router.get('/products', viewController.allProducts);
router.get('/add-product', viewController.addProduct);
router.get('/products/:product_id', viewController.product);
export default router;
