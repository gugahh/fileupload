const express = require('express');
const path = require('path');
const app = express();
const { networkInterfaces } = require('os');

const FILE_PATH = './arquivos/'; 
const FILE_DOWNLOAD_PORT = 9500;

console.log(">> Iniciando app filedownload. ");
console.log(">> Baixe seu arquivo em: http://" 
    + get_local_ip()
    + ":"
    + FILE_DOWNLOAD_PORT
    + "/{nome_do_arquivo}"
    );

app.get('/about', 
    function (req, res, next) {
        console.log("about");
        res.send(req.params);
    }
);

app.get('/download', 
    function (req, res, next) {
        res.send("Eh obrigatorio informar o parametro arquivo.");
    }
);

app.get('/download/:filename', 
    function (req, res, next) {

        console.log(req.params);

        var filePath = FILE_PATH + req.params.filename;
        var fileName = path.basename(req.params.filename);

        res.download(filePath, fileName);
        //res.send(req.params);
    }
);

function get_local_ip() {
    const nets = networkInterfaces();

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return '<host desconhecido>';
}

app.listen(FILE_DOWNLOAD_PORT);