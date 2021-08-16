const express = require('express');
const cors = require('cors');
const helmet  =require('helmet');
require('dotenv').config();

//routes
const testApi = require('./routes/testApi');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const messageRoutes = require('./routes/messages');
const helloRoutes = require('./routes/helloModel');

//database
const { sequelize } = require('./models/index');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cors()); //partage entre serveurs
app.use(helmet());

app.use('/api', testApi);
app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/hello', helloRoutes);


//Retourne l'état de la connexionéé
const databaseTest = async function(){
    try{
       await sequelize.authenticate();
        console.log('Connecté à la base de données MySQL!');
          
      } catch (error) {
        console.error('Impossible de se connecter, erreur suivante :', error);
      }
    }
databaseTest();

module.exports = app;