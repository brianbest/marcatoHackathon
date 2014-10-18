
//Global Vars
//===================================================
var final_transcript ='';
var transcript ='';
var question = '1+1= ?';
var answer = '2';

//===================================================

//The Magic area!
//===================================================
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  //recognition.interimResults = true;

  //recognition.onstart = function() { ... }
  recognition.onresult = function(event) {
    transcript = event.results[0][0].transcript;

  };
  recognition.onend = function() {
    recognition.stop();
    if (transcript === answer){
      var msg = new SpeechSynthesisUtterance('correct!');
        window.speechSynthesis.speak(msg);
      alert('Right!');
    }else{
      var msg = new SpeechSynthesisUtterance('wrong!');
        window.speechSynthesis.speak(msg);
      alert('WRONG! -- GTFO!');
    }
  };
  recognition.onerror = function(event) {
    var interim_transcript = event;
    console.log("error: " + interim_transcript);
  };
}

//===================================================


//Functions of awesome
//===================================================
function startButton(event) {

  final_transcript = '';
  recognition.lang = "en-US";//select_dialect.value;
  recognition.start();
}

function playQuestion(){
  var msg = new SpeechSynthesisUtterance(question);
    window.speechSynthesis.speak(msg);
}

function upgrade(){
  alert('Why do you hate me?');
}

//===================================================
