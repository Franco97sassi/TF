require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,
  native: false, 
  dialectOptions: {
    ssl: false
  }
}
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { User, Product, Color, Stock, Category, Price, Track} = sequelize.models;


Product.hasMany(Stock); // Productos tiene muchos stock
Stock.belongsTo(Product); // Stock pertece a Producto
Color.hasMany(Stock);
Stock.belongsTo(Color);
Product.belongsToMany(Color, { through: 'ProductColor', as: 'colors', foreignKey: 'productId' });
Color.belongsToMany(Product, { through: 'ProductColor', as: 'products', foreignKey: 'colorId' });
Product.belongsToMany(Category, { through: 'ProductCategory', as: 'categories', foreignKey: 'productId' });
Category.belongsToMany(Product, { through: 'ProductCategory', as: 'products', foreignKey: 'categoryId' });

Product.hasMany(Price, { as: 'prices' });
Price.belongsTo(Product);





module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};