import { Router } from 'express';
import * as productController from '@controllers/productController';

const router = Router();

router
  .route('/')
  .post(productController.createProduct)
  .get(productController.fetchAllProducts);

router
  .route('/:productId')
  .get(productController.fetchProduct)
  .patch(productController.updateProduct);

router.delete(
  '/:productId/variety/:varietyId',
  productController.deleteVariety
);

export default router;
