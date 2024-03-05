const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PetImage extends Model {
    static associate({ Pet }) {
      this.belongsTo(Pet, { foreignKey: 'petId' });
    }
  }
  PetImage.init(
    {
      petId: DataTypes.INTEGER,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PetImage',
    }
  );
  return PetImage;
};
