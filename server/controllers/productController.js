import { catchAsync, AppError } from '@utils';
import config from '@config';
import sqlDB from '@models/sql';
import { completeUploadBase64 } from '@services/cloudinary';

const Products = sqlDB.products;
// const { Op } = sqlDB.Sequelize;

export const createProduct = catchAsync(async (req, res, next) => {
  const { body: data } = req;
  const { images: dataUrlArray } = data;

  const images = await completeUploadBase64(
    dataUrlArray,
    config.cloudinary.productImagePath
  );
  data.images = images;

  const productInstance = await Products.createProduct(data);

  const createdProduct = await Products.findOne({
    where: { id: productInstance.id },
  });

  res.status(201).json({
    status: 'success',
    data: createdProduct,
  });
});

export const fetchProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Products.findOne({
    where: { id: productId },
  });

  if (!product) {
    return next(new AppError(`No product found with Id: ${productId}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: product,
  });
});
export const fetchAllProducts = catchAsync(async (req, res, next) => {
  const products = await Products.findAll({});
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: products,
  });
});

export const deleteVariety = catchAsync(async (req, res, next) => {
  const { productId, varietyId } = req.params;
  await Products.deleteVariety(productId, varietyId);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  await Products.updateProduct(productId, req.body);
  const updatedProduct = await Products.findOne({ where: { id: productId } });

  res.status(200).json({
    status: 'success',
    data: updatedProduct,
  });
});
