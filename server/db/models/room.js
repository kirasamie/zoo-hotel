const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate({ Order }) {
      this.hasMany(Order, { foreignKey: 'orderRoomId' });
    }
  }
  Room.init(
    {
      roomAbout: DataTypes.TEXT,
      roomPhoto: DataTypes.STRING,
      roomCapacity: DataTypes.INTEGER,
      roomPetType: DataTypes.INTEGER,
      roomPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );
  return Room;
};
