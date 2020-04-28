/** 
 * Modulo de autenticacao do usuario
 */
const app = require('express');
const basicAuth = require('express-basic-auth');

var autenticacao = {

    foo: function () {
        return "Foo";
    }

};

module.exports = autenticacao;