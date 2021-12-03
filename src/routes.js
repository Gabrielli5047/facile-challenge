const express = require('express');
const {cadastrarString, findString} = require('./controllers/ChallengeEncriptador.js');

const routes = express();

routes.post('/encripts', cadastrarString);
routes.get('/encripts/:idString', findString);

module.exports = routes;