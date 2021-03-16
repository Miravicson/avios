import sqlDB from '@models/index';
import { catchAsync } from '@utils';

const Products = sqlDB.products;

export const index = (req, res) => {
  res
    .status(200)
    .render('index', { title: 'Avios', message: 'Up and running' });
};

export const allProducts = catchAsync(async (req, res, next) => {
  const products = await Products.findAll({});
  res.status(200).render('allProducts', {
    title: 'All Products',
    products: products,
  });
});
export const product = (req, res) => {
  res.status(200).render('product', {});
};
export const addProduct = (req, res) => {
  res.status(200).render('addProduct', { title: 'Add Product' });
};

export const nonIndex = (req, res) => {
  res.status(200).json({ message: 'Non Index' });
};
