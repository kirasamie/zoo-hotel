const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate({ User, Order, PetImage }) {
      this.hasMany(Order, { foreignKey: 'orderPetId' });
      this.hasMany(PetImage, { foreignKey: 'petId' });
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
    },
    {
      sequelize,
      modelName: 'Pet',
    }
  );
  return Pet;
};
