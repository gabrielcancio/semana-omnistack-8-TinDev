const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
    response.json({
        evento: 'Semama OmniStack',
        aluno: 'Gabriel Cancio',
        versao: 8.0
    })
});

module.exports = routes;