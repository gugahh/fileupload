const express = require('express');
const path = require('path');
const app = express();

const FILE_PATH = './arquivos/'; 
const FILE_DOWNLOAD_PORT = 9500;

console.log(">> Iniciando app filedownload. ");

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

app.listen(FILE_DOWNLOAD_PORT);