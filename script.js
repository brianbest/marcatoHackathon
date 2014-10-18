//Global Vars
//===================================================
var question = '1+1= ?';
var answer = '2';

//function Vars
//===================================================
var final_transcript ='';//for speech
var transcript ='';// for speech

//check if speech to text is available
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var recognition = new webkitSpeechRecognition();
}

//===================================================


speechQuestion(question, answer);

function speechQuestion(q, a){

  var asked_question = q;
  var asked_answer = a;

  //The Magic area!
  //===================================================
    recognition.continuous = false;
    recognition.onresult = function(event) {
      transcript = event.results[0][0].transcript;
      document.getElementById('capText').html(transcript);
    };
    recognition.onend = function() {
      recognition.stop();
      if (transcript === asked_answer){
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

//Sub-Functions needed for speach
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
