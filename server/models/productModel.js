export default (sequelize, Sequelize) => {
  const Product = sequelize.define(
    'product',
    {
      product_name: {
        type: Sequelize.STRING,
      },
      product_description: {
        type: Sequelize.STRING,
      },
      show: {
        type: Sequelize.BOOLEAN,
      },
      product_varieties: {
        type: Sequelize.JSON,
      },
    },
    { timestamps: true, createdAt: 'date_uploaded', updatedAt: 'date_edited' }
  );
  return Product;
};
