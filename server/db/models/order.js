const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ Room, Pet, User, Post }) {
      this.belongsTo(Room, { foreignKey: 'orderRoomId' });
      this.belongsTo(Pet, { foreignKey: 'orderPetId' });
      this.belongsTo(User, { foreignKey: 'orderUserId' });
      this.hasMany(Post, { foreignKey: 'orderId' });
    }
  }
  Order.init(
    {
      orderUserId: DataTypes.INTEGER,
      orderPetId: DataTypes.INTEGER,
      orderRoomId: DataTypes.INTEGER,
      orderDateIn: DataTypes.STRING,
      orderDateOut: DataTypes.STRING,
      addInfo: DataTypes.TEXT,
      paymentStatus: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
