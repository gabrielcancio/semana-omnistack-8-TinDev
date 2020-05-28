const axios = require('axios');

const Dev = require('../models/Dev');

module.exports = {
    async store(request, response) {
        const { username } = request.body;
        
        if(!username) {
            return response.status(400).json({ message: 'Usuário inválido' });
        }

        const userExists = await Dev.findOne({ user: username });

        if(userExists) {
            return response.json(userExists);
        }

        const githubResponse = await axios.get(`http://api.github.com/users/${username}`);

        const { name, login, bio, avatar_url } = githubResponse.data;

        const dev = await Dev.create({
            name,
            user: login,
            bio,
            avatar: avatar_url
        });

       return response.json(dev);
    },

    async index(request, response) {
        const { user } = request.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } }
            ]
        });

        return response.json(users);

        
    }
}