const knex = require('../connection/connection.js');
const {
    encrypt,
    decrypt
} = require('../crypto');

async function cadastrarString(req, res) {
    const {
        content
    } = req.body;

    try {
        const contentCrypt = encrypt(content);

        const {
            insertUser
        } = await knex('strings').insert({
            iv: contentCrypt.iv,
            content: contentCrypt.content
        });

        const idStringCripto = await knex('strings').where('content', contentCrypt.content);
        const idString = idStringCripto[0].id;

        res.status(201).json({
            "id": idString,
            "encripted_name": contentCrypt.iv
        });

    } catch (erro) {
        return res.status(500).json({
            "code": "E_VALIDATION_FAILURE",
            "message": "O campo \"name\" é obrigatório"
        });
    }
}
async function findString(req, res) {
    const {
        idString
    } = req.params;

    try {
        const verifyId = await knex('strings').where('id', idString);


        if (verifyId.length === 0) {
            return res.status(400).json({
                mensagem: "Não existe registro para esse ID!"
            });
        }
        const {
            id: id,
            ...hash
        } = verifyId[0];
        const descripty = decrypt(hash);

        const verifyString = {
            "id": Number(idString),
            "name": descripty
        }
        res.status(201).json(verifyString);
    } catch (erro) {
        return res.status(500).json({
            mensagem: `Ocorreu um erro inesperado - ${erro.message}`
        });
    }
}

module.exports = {
    cadastrarString,
    findString
}