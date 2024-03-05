const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate({ Order, RoomImage }) {
      this.hasMany(Order, { foreignKey: 'orderRoomId' });
      this.hasMany(RoomImage, { foreignKey: 'roomId' });
    }
  }
  Room.init(
    {
      roomAbout: DataTypes.TEXT,
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
