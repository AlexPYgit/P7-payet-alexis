
"use strict";
// const Sequelize =require('sequelize');

//     class User {
//         async create (DataTypes) => {
//             awiat Sequelize.define('User', {
//                 name: { type: DataTypes.STRING, allowNull: false},
//                 email: { type: DataTypes.STRING, allowNull:false},
//                 admin: { type: DataTypes.BOOLEAN, allowNull: false, default: false},
//                 password: { type: DataTypes.STRING, allowNull: false},
//             })
//         }
//     }

const { Model, DataTypes, Sequelize } =require('sequelize');
const sequelize = new Sequelize('mysql::memory');
    class User extends Model {}

    User.init({
        name: { type: DataTypes.STRING, allowNull: false},
        email: { type: DataTypes.STRING, allowNull:false},
        admin: { type: DataTypes.BOOLEAN, allowNull: false, default: false},
        password: { type: DataTypes.STRING, allowNull: false},
    },
    {
       sequelize,
       modelName:'User', 
    });

    exports.User = User;
