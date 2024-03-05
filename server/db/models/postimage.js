const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostImage extends Model {
    static associate({ Post }) {
      this.belongsTo(Post, { foreignKey: 'postId' });
    }
  }
  PostImage.init(
    {
      postId: DataTypes.INTEGER,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PostImage',
    }
  );
  return PostImage;
};
