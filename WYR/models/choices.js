'use strict';
const moment = require('moment')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Choices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here\
      Choices.belongsTo(models.User, {
        as: 'author',
        foreignKey: 'author_id'
      });
      Choices.hasMany(models.Comment, {
        as: 'comments',
        foreignKey: 'choice_id'
      });
    }
    isOwnedBy(user){
      return this.author_id === user.id
    }
  };
  Choices.init({
    choice_1: DataTypes.STRING,
    choice_2: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    published_on: DataTypes.DATE,
    friendlyPublishedDate:{
      type: DataTypes.VIRTUAL,
      get(){
        return moment(this.published_on).format('MMMM Do, YYYY')
      }
    }
  }, {
    sequelize,
    modelName: 'Choices',
    timestamps:false,
    tableName: 'wyr_choices'
  });
  return Choices;
};