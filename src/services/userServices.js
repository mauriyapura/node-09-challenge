
const UserRepository = require("../repositories/userRepository");
const repositoy = new UserRepository();

const findById = async (id)=>{
    return await repositoy.findById(id);
}

const findByEmail = async(email)=>{
    return await repositoy.findByEmail(email);
}

const findAll = async(filter, options)=>{
    return await repositoy.findAllWithPagination(filter, options);
}

const save = async(user)=>{
    return await repositoy.save(user);
}

const update = async(id, user)=>{
    return await repositoy.update(id, user);
}

const remove = async(id)=>{
    return await repositoy.remove(id);
}

module.exports = {
    findById,
    findAll,
    save,
    update,
    remove,
    findByEmail
}











