(function(io, ip){
  'use strict';
  var socket = io('http://' + ip + ':8080');
  var $msg = document.querySelector('[data-js="message"]');
  socket.on('news', function(data){

    $msg.textContent = '';
    data.forEach(function(data){
      $msg.textContent += data.msg + ' - ';
    });

  });
}(io, ip));
