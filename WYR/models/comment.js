'use strict';
const moment = require('moment')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.hasMany(models.Reply, {
        as: 'replies',
        foreignKey: 'parent_comment_id'
      })
    }
  };
  Comment.init({
    author_name: DataTypes.STRING,
    body: DataTypes.STRING,
    commented_on: DataTypes.DATE,
    choice_id: DataTypes.INTEGER,
    parent_comment_id: DataTypes.INTEGER,
    is_deleted: DataTypes.BOOLEAN,
    commentedAgo: {
      type: DataTypes.VIRTUAL,
      get(){
        let commentedOn = moment(this.commented_on);
        let now = moment();
        return moment.duration(commentedOn.diff(now)).humanize(true);
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: false,
    tableName: 'wyr_comments',
    defaultScope: {
      where: {
        parent_comment_id: null
      }
    }
  });
  return Comment;
};