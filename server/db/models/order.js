const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ Room, Pet }) {
      this.belongsTo(Room, { foreignKey: 'orderRoomId' });
      this.belongsTo(Pet, { foreignKey: 'orderPetId' });
    }
  }
  Order.init(
    {
      orderPetId: DataTypes.INTEGER,
      orderRoomId: DataTypes.INTEGER,
      orderDateIn: DataTypes.DATE,
      orderDateOut: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
