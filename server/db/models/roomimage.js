const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomImage extends Model {
    static associate({ Room }) {
      this.belongsTo(Room, { foreignKey: 'roomId' });
    }
  }
  RoomImage.init(
    {
      roomId: DataTypes.INTEGER,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RoomImage',
    }
  );
  return RoomImage;
};
