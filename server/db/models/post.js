const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ User, Order }) {
      this.belongsTo(User, { foreignKey: 'workerId' });
      this.belongsTo(Order, { foreignKey: 'orderId' });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      workerId: DataTypes.INTEGER,
      postPhotoLink: DataTypes.STRING,
      orderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
