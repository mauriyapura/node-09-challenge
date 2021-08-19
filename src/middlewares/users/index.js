
const {check} = require("express-validator");
const AppError = require("../../errors/appError");
const userService = require("../../services/userServices");
const {validationResult} = require("../commons");
const { validJWT, hasRole } = require("../auth"); 
const {ROLES, ADMIN_ROLE } = require("../../constants")


const _nameRequired = check("name", "Name required").not().isEmpty();
const _lastNameRequired = check("lastName", "Last Name required").not().isEmpty();
const _emailRequired = check("email", "Email required").not().isEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
const _emailExist = check("email").custom(
    async (email = "")=>{
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new AppError("Email already exist in DB", 400);
        }
    }
);

const _optionalEmailValid = check("email", "Email is invalid").optional().isEmail();
const _optionalEmailExist = check("email").optional().custom(
    async (email = "")=>{
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new AppError("Email already exist in DB", 400);
        }
    }
);

const _password = check("password", "Password required").not().isEmpty();
const _roleValid = check("role").optional().custom(
    async (role = "")=>{
        if(!ROLES.includes(role)){
            throw new AppError("Invalid Role", 400);
        }
    }
)

const _dateValid = check("birthdate").optional().isDate("MM-DD-YYYY");
const _idRequired = check("id").not().isEmpty();
const _idIsMongoDB = check("id").isMongoId();
const _idExist = check("id").custom(
    async (id = "")=>{
        const userFound = await userService.findById(id);
        if(!userFound){
            throw new AppError("The id does not exist in DB", 400);
        }
    }
);

//const _validJWT = 


const getRequestValidations = [
    validJWT,    
    _idRequired,
    _idIsMongoDB,
    _idExist,    
    validationResult
]


const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),    
    _nameRequired,
    _lastNameRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _password,
    _roleValid,
    _dateValid,
    validationResult,
]

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),    
    _idRequired,
    _idIsMongoDB,
    _idExist,
    _optionalEmailExist,
    _optionalEmailValid,
    _dateValid,
    _roleValid,
    validationResult,

]

const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),    
    _idRequired,
    _idIsMongoDB,
    _idExist,    
    validationResult
]

const getAllRequestValidations = [
    validJWT
       
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    deleteRequestValidations,
    getRequestValidations,
    getAllRequestValidations
}


