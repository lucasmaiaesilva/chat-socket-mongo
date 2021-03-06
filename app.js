var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cors = require('cors');

// var ip = '10.0.0.101';
var ip = 'localhost';
// change for the ip of your localhost to work on remote machines


// mongoose settings
var MsgSocket = require('./models/modelMsg');
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + ip + '/socketio', { poolSize: 1 });


var listener = require('mongo-watcher');

var options = {
  database: 'socketio'
};

var changeStream = listener.listen(options);

changeStream.on('data', function(data) {
  pegarInformacoes();
});

function pegarInformacoes(){
  MsgSocket.find(function(err, msgs){
    if(err)
      return err;

    io.emit('news', msgs);
  });
}

//config to receive posts
// var corsOptions = {
//   origin: 'http://localhost:8080',
//   credentials: true
// };

app.use(express.static('front'));
// app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on('connection', function(socket){
  console.log('um usuário conectou');

  pegarInformacoes();

  socket.on('disconnect', function(){
     console.log('usuario desconectou');
   });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/front/index.html');
});

app.post('/msg', function(req, res){
  var msg = new MsgSocket();
  msg.name = req.body.name;
  msg.msg = req.body.msg;

  msg.save(function(err){
    if(err)
      res.json(err);
    res.json({ message: 'postagem feita com sucesso' });
  });
});



http.listen(8080, function(){
  console.log('listening on *:8080');
});
