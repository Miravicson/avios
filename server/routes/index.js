import { Router } from 'express';
import productRouter from './v1/productRoutes';

// eslint-disable-next-line import/prefer-default-export
export const v1Router = new Router();

v1Router.use('/products', productRouter);
