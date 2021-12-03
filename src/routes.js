const express = require('express');
const {registerString, findString} = require('./controllers/ChallengeEncriptador.js');

const routes = express();

routes.post('/encripts', registerString);
routes.get('/encripts/:idString', findString);

module.exports = routes;