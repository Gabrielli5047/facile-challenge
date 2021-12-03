# facile-challenge
Desafio Técnico e Criativo

Avaliação: 
Avaliaremos como você organiza seu código (arquitetura de pastas), seu raciocínio lógico, seu uso de padrões, 
construção de componentes, como as tecnologias foram utilizadas e a performance da aplicação. O objetivo é 
analisar a capacidade de aplicar seu conhecimento de acordo com sua experiência. 
Descrição: 

Seu serviço irá receber inicialmente como parâmetro uma string, que deverá ser encriptada. A string recebida, 
deverá ser salva no banco de dados encriptada e retornar o id do registro criado. Quando o registro for 
consultado por ID, deverá retornar o mesmo registro com a string salva desencriptada. 

RESUMO:

Construi uma api, conectada ao banco de dados utilizando o express, pg e knex.
Para realização do desafio utilizei um modulo integrado chamado crypto que pode ser usado para criptografar e descriptografar strings, números, buffers, streams e muito mais.

ORGANIZAÇÃO DAS PASTAS/ARQUIVOS:

  Connection
    1. Instalei o pg para fazer a conexao com o banco de dados:
        npm i pg
    2. connection/connection.js 
    É onde utilizei a bibliotexa knex, para escrever instruções SQL de forma mais simplificada, sem precisar escrevê-las.
        ex na mao: conexao.query('select * from strings')
        ex com knex: knex.select('*').from('strings')
    3. utilizei o dotenv para criar variaveis de ambiente no .env, substitui nas propriedades do connection e não enviar para o github quando desse o git push.

  Controllers
    1. Controllers/ChallengeEncriptador
        Controlador, Local onde criei as funções cadastrarString, onde cadastra a string no banco criptografada, e findString, onde busca a string e mostra a string descriptografada atravez do id, são as funções que fazem as requisições.
        Local onde está toda a lógica e faz as operações.

  routes.js
    1. Arquivo que será o meu roteador das rotas, tambem importa o express e nele criamos as rotas configuradas.
        const express = require('express');
        const {cadastrarString, findString} = require('./controllers/ChallengeEncriptador.js');
        const routes = express();
        ex: routes.post('/encripts', cadastrarString);
    Exporta o routes e disponibiliza para usar no index.js

  server.js
    1.É o onde Configura o servidor, onde cria e usa as rotas.

  index.js
    1. É o ponto de partida da sua aplicação, onde tem a função "listen" que escuta em qual porta toda a sua aplicação vai rodar.

  crypto.js
    1. Arquivo onde foi criada as funç~eos para criptografar e descriptografar, que foram utilizadas nas funções do meu controlado.

    .gitignore : Para não enviar para o github o que for colocado dentro deste arquivo;
    .env : para salvar as minhas variaveis de ambiente.
        const algorithm = process.env.ALGORITHM; === aes-256-ctr

DESENVOLVIMENTO:

1. Para iniciar um novo projeto, criando um arquivo package.json -> npm init -y
2. Utilizei algumas bibliotecas para utilizar pacotes prontos.
3. Para utilizar os pacotes chamei a função require('nome do pacote requisitado'), retornando tudo que o pacote oferece.
4. Para criar um servidor http, instalei o pacote express:
        npm i express
    4.1 Criar servidor http, que receberá requisiçoes e irá responder.
    4.2 Importa o express:
        const express = require('express');
    4.3 Cria uma aplicação:
        const routes = express();
    4.4 Para este desafio criei duas rotas, uma pra criar uma string, que será criptografada e salva no banco criptografada:
        routes.post('/encripts', cadastrarString);
        E outra rota para buscar e mostrar o id e a string descriptografada, quando for requisitada.
        routes.get('/encripts/:idString', findString);
5.0 E a aplicação irá escutar as requisições na porta 3333 e irá respondê-las
        app.listen(process.env.PORT || 3333);

FUNCIONAMENTO:

  ARQUIVO CRYPTO.JS:
  Para criptografar utilizei o crypto, e para usa-lo basta fazer:
    1. Const crypto = require('crypto');
    2. Chamei tambem o dotven, para utilizar as variaveis: require('dotenv').config()
        algorithm : Entrada para o algoritmo que será usado para criar a cifra. Utilizei o encadeamento de bloco de cifra aes 256 
        -> aes-256-cbc.
        secretKey:  Leva entrada para a chave bruta que é usada pelo algoritmo e iv, sendo o segredo e tem que ter no minimo 32 caracteres
        -> vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3
    iv : é um número aleatório gerado para aumentar a segurança da criptografia e descriptografia.

  FUNÇÃO ENCRYPT:
    
    1. Const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
        O método crypto.createCipheriv () primeiro criará e, em seguida, retornará o objeto cifrado de acordo com o algoritmo passado para a chave e o fator de autorização fornecidos (iv)
    2. Const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        Retorna um novo Bufferque é o resultado da concatenação de todas as Buffer instâncias list juntas. Para parar a criptografia usei o final(), retorna um, buffer então precisamos definir uma codificação de saída hex e anexar o valor hexadecimal ao final da mensagem criptografada 
    3. Return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
        Retornando iv e os dados criptografados.

  FUNÇÃO DECRYPT:

    1. Const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
        Para descriptografar a string, podemos usar a createDecipheriv(), função do crypto, passar o algoritmo, o segredokey e o Buffer.from(hash.iv, 'hex'). 
        O método Buffer.from () cria um novo buffer preenchido com a string;
        O hash será passado como parametro, no hash deve conter o iv e o content, para que a descriptografia sera realizada com sucesso.
    2. Const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
        Retorna um novo Bufferque é o resultado da concatenação de todas as Buffer instâncias list juntas.
        O update() é um método no decrypter para descriptografar a mensagem criptografada.
        O contant é a string criptografada.
    3. Return decrpyted.toString();
        O método toString() retorna uma string representando o objeto.

  FUNÇÃO REGISTERSTRING
        É uma das funções utilizada como controlador, para registrar a string criptografada no banco de dados.
  FUNÇÃO FINDSTRING
        É uma das funções utilizadadas como controlador, para buscar a string descriptografada, atravez do id.


BIBLIOTECAS:
npm i dotenv: Utilizei para configurar o .env e para criar as variaveis de ambiente;
npm i express:  gerenciar a api
npm i nodemon -D: Restartando a aplicação
npm i pg: biblioteca do postgres, que faaz a conexão com o banco
npm i knex: para escrever instruções SQL de forma mais simplificada, sem precisar escrevê-las.




