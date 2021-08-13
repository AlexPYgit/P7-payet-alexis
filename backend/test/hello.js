const { sequelize } = require('../models/index');

exports.hello = async function(req, res){
    try{
         const result =  await sequelize.query('SELECT * FROM hello')
        res.status(200).json(result)
    }catch (e){
        return console.log(e)
    }
    
}



