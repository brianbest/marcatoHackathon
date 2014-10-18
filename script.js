
//Global Vars
//===================================================
var final_transcript ='';


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
    var interim_transcript = event.transcript;
    alert(interim_transcript);
  };
  recognition.onend = function() {
    if (recognizing) {
      recognition.stop();
      return;
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

function upgrade(){
  alert('Why do you hate me?');
}

//===================================================
