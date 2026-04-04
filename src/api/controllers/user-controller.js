import { addUser, findUserById, listAllUsers } from "../models/user-model.js";

// 1. Lisätään 'async' ja 'await', muuten saat vain tyhjiä vastauksia
const getUsers = async (req, res) => {
    const users = await listAllUsers();
    res.json(users);
};

// 2. Nimetään tämä 'getUser', jotta se täsmää reitittimen kanssa
const getUser = async (req, res) => {
    const user = await findUserById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

const postUser = async (req, res) => {
    // Muista odottaa (await) tietokannan vastausta tässäkin
    const result = await addUser(req.body);
    if (result && result.user_id) {
        res.status(201).json({message: 'User added successfully', result});
    } else {
        res.sendStatus(400);
    }
};

const putUser = (req, res) => {
    res.json({message: 'User item updated successfully'});
};

const deleteUser = (req, res) => {
    res.json({message: 'User item deleted successfully'});
};

// 3. Exportataan nimet, joita routerisi odottaa
export {getUsers, getUser, postUser, putUser, deleteUser};