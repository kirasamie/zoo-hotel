const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostImage extends Model {
    static associate({ Post }) {
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
