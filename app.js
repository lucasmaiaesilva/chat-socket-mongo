var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

// mongoose settings
var MsgSocket = require('./models/modelMsg');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socketio', { poolSize: 1 });

// config to receive posts
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    res.json({message: 'postagem feita com sucesso'});
  });
});

io.on('connection', function(socket){
  console.log('um usuário conectou');

  MsgSocket.find(function(err, msgs){
    if(err)
      return err;
    socket.emit('news', msgs);
  });


  socket.on('disconnect', function(){
     console.log('usuario desconectou');
   });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
