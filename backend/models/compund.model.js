// models/compound.model.js
module.exports = (sequelize, DataTypes) => {
  const Compound = sequelize.define('compound', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  return Compound;
};
