const {Model, DataTypes} = require("sequelize");
const brypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class User extends Model { // link login pw in js later 
    checkpassword(loinpw){
        return brypt.compareSync(loinpw, this.password);
    }
}

User.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
         
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [20],
            },
          }, 
          user_photo: {
            type: DataTypes.STRING
          }
      

},
{
    hooks: {
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
);

module.exports = User; 