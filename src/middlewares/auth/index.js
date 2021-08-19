const {check} = require("express-validator");
const AppError = require("../../errors/appError");
const {validationResult} = require("../commons")
const { validToken, validRole } = require("../../services/authService"); 

const _emailRequired = check("email", "Email required").not().isEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
const _password = check("password", "Password required").not().isEmpty();


const postLoginRequestValidations = [
    _emailRequired,
    _emailValid,
    _password,
    validationResult
]


const validJWT = async(req, res, next)=>{
    try {        
        const token = req.header('Authorization');
        const user = await validToken(token);
        req.user = user;
        next();

    } catch (err) {
        next(err);
    }
}

const hasRole = (...roles) =>{

    return (req, res, next)=>{

        try {
            validRole(req.user, ...roles);
            next();            
        } catch (err) {
            next(err);            
        }

    }

}


module.exports = {
    postLoginRequestValidations,
    validJWT,
    hasRole   
}



