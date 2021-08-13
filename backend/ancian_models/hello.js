const { Model, DataTypes, Sequelize } =require('sequelize');
const sequelize = new Sequelize('mysql::memory');
    class hello extends Model {}

  hello.init({
      hello: { type: DataTypes.STRING, allowNull: false },
    },
    {
        sequelize, // We need to pass the connection instance
        modelName: 'hello'
    },
    {
        tableName:'hello'
    });
 
    exports.hello = hello;
