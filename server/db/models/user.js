const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Pet, Post, Order, Comment }) {
      this.hasMany(Pet, { foreignKey: 'petUserId' });
      this.hasMany(Post, { foreignKey: 'workerId' });
      this.hasMany(Order, { foreignKey: 'orderUserId' });
      this.hasMany(Comment, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      phone: DataTypes.STRING,
      isWorker: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
