import config from '@config';
import { AppError } from '@utils';
import { Sequelize } from 'sequelize';
import Product from '@models/productModel';

const { sql } = config;

const sequelize = new Sequelize(sql.db, sql.user, sql.password, {
  host: sql.host,
  dialect: sql.dialect,
  operatorsAliases: false,

  pool: {
    max: +sql.pool.max,
    min: +sql.pool.min,
    acquire: +sql.pool.acquire,
    idle: +sql.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.products = Product(sequelize, Sequelize);
db.initialize = function initialize() {
  this.sequelize.sync({ force: false });
};

// Instance methods

db.products.createProduct = function createProduct(productData) {
  return this.create(productData);
};

db.products.updateProduct = async function updateProduct(
  productId,
  productData
) {
  await this.update(productData, { where: { id: +productId } });
};

db.products.deleteVariety = async function deleteVariety(productId, varietyId) {
  const productDocument = await this.findOne({
    where: {
      id: productId,
    },
  });
  if (!productDocument) {
    throw new AppError(`No product found with Id: ${productId}`, 404);
  }

  if (
    !productDocument.product_varieties ||
    +varietyId < 0 ||
    +varietyId > productDocument.product_varieties.length - 1
  ) {
    return;
  }
  const modified = productDocument.product_varieties.splice(+varietyId, 1);
  await this.update(
    { product_varieties: modified },
    { where: { id: productId } }
  );
};

export default db;
