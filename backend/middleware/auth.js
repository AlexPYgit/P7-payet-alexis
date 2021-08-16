
//Vérifi si les champ retourné son vide 
exports.checkNotNull = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    if(email == null || name == null || password == null ) {
        return res.status(400).json({ error : 'missing parameters'});
    }else {
        next()
    }
};

//Vérifi la vilidité de l'email
exports.checkEmail = (req, res, next) => {
    const email = req.body.email;
    const  validateEmail = (email) =>{
        let emailReg = /([a-zA-Z0-9_.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)/;
        // (/^([w-.]+)@((?:[w]+.)+)([a-zA-Z]{2,4})/i);
        let valid = emailReg.test(email);
    
        if(!valid) {
            return false;
        } else {
            return true;
        }
    }
    if(validateEmail(email)){
        next()
   } else {
    return res.status(400).json({ error : 'missing parameters verify your email'});
    }
};
