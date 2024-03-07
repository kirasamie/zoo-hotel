const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ User, Order, Comment }) {
      this.belongsTo(User, { foreignKey: 'workerId' });
      this.belongsTo(Order, { foreignKey: 'orderId' });
      this.hasMany(Comment, { foreignKey: 'postId' });
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
