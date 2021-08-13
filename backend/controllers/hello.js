const { sequelize } = require('../models/index');
// const hello = require('../models/hello');
const connectDB = require('../models');


exports.helloModel = async function(req, res){
    try{
        console.log(hello)
         const result =  await sequelize.query( `INSERT INTO hello values('je tes le post')`);
        res.status(201).json(result)
    }catch (e){
        return res.status(400).json(console.log(e));
    
}
}

