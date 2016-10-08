(function(ip){
  'use strict';

  // var user = 'lucas';
  var user = null;

  var $form = document.querySelector('[data-js="form"]');
  $form.addEventListener('submit', handleSubmit,false);

  function handleSubmit(e){
    e.preventDefault();
    postAjaxData();
    $form.reset();
  }

  function postAjaxData() {

    var ajax = new XMLHttpRequest();
    if(user === null)
      user = 'anônimo';
    var $message = document.querySelector('[data-js="inputmsg"]');

    ajax.open('POST', 'http://' + ip + ':8080/msg');
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send('name='+ user +'&msg='+ $message.value);
    console.log('enviando mensagem...');
    if(isRequestOk)
      console.log('mensagem enviada!');

  }

  function isRequestOk(aj){
    return aj.readyState === 4;
  }

}(ip));
