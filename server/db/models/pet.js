const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate({ User, Order }) {
      this.hasMany(Order, { foreignKey: 'orderPetId' });
      this.belongsTo(User, { foreignKey: 'petUserId' });
    }
  }
  Pet.init(
    {
      petUserId: DataTypes.INTEGER,
      petType: DataTypes.INTEGER,
      petName: DataTypes.STRING,
      petBreed: DataTypes.STRING,
      petGender: DataTypes.STRING,
      petAge: DataTypes.INTEGER,
      petIsSprayed: DataTypes.BOOLEAN,
      petAbout: DataTypes.TEXT,
      petPhoto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Pet',
    }
  );
  return Pet;
};
