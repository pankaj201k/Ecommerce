module.exports = (sequelize, Sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      require: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      unique: true,
      lowerCase: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quntity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sold: {
      type: DataTypes.INTEGER,
      default: 0,
      allowNull: true,
    },
    brand: {
      type: DataTypes.ENUM("Apple", "Samsung", "Lenevo"),
      // values: ["Apple", "Samsung", "Lenevo"],
      allowNull: false,
    },
    image: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    color: {
      type: DataTypes.ENUM("Black", "Brown", "Red"),
      // values: ["Black", "Brown", "Red"],
      allowNull: false,
    },
    ratings: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false,
    },
  });
  return Product;
};
