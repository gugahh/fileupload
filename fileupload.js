var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var express = require('express');
const FILE_UPLOAD_PATH = '/home/gugahh/Projetos/Node/FileUpload/arquivos/'; 

const FILE_UPLOAD_PORT = 9000;
const FILE_DOWNLOAD_PORT = 8000;

// Gerencia o Download (serviço de arquivos) via http
var app = express();
app.use('/arquivos', express.static(FILE_UPLOAD_PATH));
app.listen(FILE_DOWNLOAD_PORT);

// Gerencia o Upload de arquivos, via um form 
http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = FILE_UPLOAD_PATH + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        //TODO: tratar erro de arquivo repetido
        //TODO: Permitir criar subdiretorio (?)
        if (err) throw err;
        res.write('Arquivo Recebido com sucesso!');
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(FILE_UPLOAD_PORT);