# P7-payet-alexis
réalisation d'un MVP d'une messagerie d'entreprise


1) cloner le repos distant 
 https://github.com/AlexPYgit/P7-payet-alexis.git

 # * gestion base de donnée *
2) 
 créer une base de donnée en vous connectant à votre compte mysql et effectuer la commande
 "CREATE DATABASE groupomania;"
 migrer la bases de donnée fourni dans le dossier database du projet dans votre 
  base de données mysql précédemment créé avec la commande 
 "mysql -u [nom_d'utilisateur] -p groupomania < [chemin du fichier data_base_groupomania]\data_base_groupomania.sql"

 # * gestion backend  *
3)
 avec un terminal de commande rendez-vous à la racine du dossier (.../backend).
 puis lancer la commande "npm install"

 -Une fois l'installation terminé, aller dans le dossier config puis ouvrez le fichier config, 
 et renseigner les champs "username" , "password", "databases" avec vos informations de connection mysql.
 -ensuite allez dans le fichier .env et enseigner les champs "EMAIL_ADMIN" , "NAME_ADMIN " , "PASSWORD " 
 et "SECRET_TOKEN" (secret_token avec une chaîne de caractère complexe aléatoire).
 -de nouveau dans votre terminale de commande, lancer la commande "npm run start".
-le compte administrateur sera créé automatiquement.

# * gestion frontend *
4) 
 -avec un terminal de commande aller à la racine du projet (.../frontend/forum-app)
 puis exécuter la commande "npm install".

 -une fois l'installation terminé, lancer la commande " npm run serve" ,
 puis après compilation complète. Ouvrez votre navigateur sur l'adresse " http://localhost:8080/"

! Vous pouvez désormais vous rendre sur le site !

------------------
 
