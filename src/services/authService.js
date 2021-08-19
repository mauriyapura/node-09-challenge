const userService = require("../services/userServices");
const AppError = require("../errors/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const logger = require("../loaders/logger/index");

const login = async(email, password)=>{

    try {
        //validacion de email
        const user = await userService.findByEmail(email);
        if(!user){
            throw new AppError("Authentication failed! Email or Password incorrect", 401);
        }

        //validacion de user enabled
        if(!user.enable){
            throw new AppError("Authentication failed! User Disabled", 403);

        }

        //validacion de password
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            throw new AppError("Authentication failed! Email or Password incorrect", 401);
        }        

        //Generar jwt
        const token = _encrypt(user._id);

        return {
            token,
            user: user.name,
            role: user.role
        }


    } catch (error) {
        throw error;
    }
}


const validToken = async(token) => {
    try {        
        // validar que el token venga como parametro
        if(!token){
            throw new AppError("Authentication failed! Token required", 401);
        }   
        logger.info(`Token Received ${token}`);
    
        // validar que el token sea integro
        let id;
        try {
            const obj = jwt.verify(token, config.auth.secret);
            id = obj.id;    
            //logger.info(`User id in the token: ${id}`);
            
        } catch (verifyError) {
            throw new AppError("Authentication failed! Invalid Token!", 401);            
        }
    
        // validar si hay usuario en base de dato
        const user = await userService.findById(id);
        if(!user){
            throw new AppError("Authentication failed! Invalid Token - User not found", 401);
        }
        //validar si usuario esta habilitado
        if(!user.enable){
            throw new AppError("Authentication failed! User disabled", 401);
        }    
        //retornar el usuario
        return user;

    } catch (err) {
        throw err;
    }
}

const validRole = (user, ...roles) => {
    if(!roles.includes(user.role)){
        throw new AppError("Authorization failed! User without the privileges", 401);        
    }
    return true;
}



_encrypt = (id)=>{
    return jwt.sign({ id }, config.auth.secret , { expiresIn: config.auth.ttl });
}


module.exports = {
    login,
    validToken,
    validRole
}

