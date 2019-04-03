var socketio = io();

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ja-JP';
recognition.continuous = true;

const child = document.getElementById('child');
const oneceButton = function(){
  child.remove();
  recognition.start();
  socketio.emit('remove','remove');
  child.removeEventListener('click', oneceButton);
}
child.addEventListener('click', oneceButton);


  socketio.on('message',function(msg){
    document.getElementById('messages').innerText = msg
  });

  socketio.on('remove', function(msg){
    console.log()
    child.remove();
  });

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    socketio.emit('message', text);
    recognition.stop();
  }

  recognition.onend = (event) => {
    recognition.start()
  }