'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ Post, User }) {
      this.belongsTo(Post, { foreignKey: 'postId' });
      this.belongsTo(User, {foreignKey: 'userId'})
    }
  }
  Comment.init(
    {
      body: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
