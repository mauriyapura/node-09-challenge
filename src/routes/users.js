const {
    putRequestValidations,
    postRequestValidations,
    deleteRequestValidations,
    getRequestValidations,
    getAllRequestValidations
} = require("../middlewares/users")
const {Router} = require("express");
const {
    getAllUsers,
    createUser,
    updateUser,
    getById,
    deleteUser
} = require("../controllers/users"); 

const routes = Router();

routes.get("/", getAllRequestValidations, getAllUsers);
routes.post("/", postRequestValidations, createUser);
routes.put("/:id", putRequestValidations, updateUser);
routes.get("/:id", getRequestValidations, getById);
routes.delete("/:id", deleteRequestValidations, deleteUser);


module.exports = routes; 

