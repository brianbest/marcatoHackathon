//Global Vars
//===================================================
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




//Make Questions
//===================================================
//function for creating question objects
function makeQuestion(questions, rights, wrong1, wrong2){
		// var thisQuestion = new object();
		this.question = questions;
		this.rightAnswer = rights;
		this.wrongAnswer1 = wrong1;
		this.wrongAnswer2 = wrong2;
		// return thisQuestion;
}
	//default question objects
	var question1 = new makeQuestion("What color is the sky?", "Blue", "Hex", "Dunno");
	var question2 = new makeQuestion("What color is the ocean?", "Blue", "Cloth", "Knife");
	var question3 = new makeQuestion("What time is it?", "Now", "Never", "Before");

	//array of questions
	var questionBin = [question1, question2, question3];
	var selectedQuestion = "";

//function for picking a random question
function pickQuestion(){
	selectedQuestion = questionBin[Math.floor(Math.random() * questionBin.length)];
	//askQuestion(selectedQuestion);
}

pickQuestion();

function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
		}
		return array;
}

//Place question
//===================================================
$('.questionbox').find('p').html(selectedQuestion.question);



//Sub-Functions
//===================================================
function startButton(event) {

	final_transcript = '';
	recognition.lang = "en-US";//select_dialect.value;
	recognition.start();
}

function playQuestion(){
	var msg = new SpeechSynthesisUtterance(selectedQuestion.question);
		window.speechSynthesis.speak(msg);
}

function upgrade(){
	alert('Why do you hate me?');
}
//===================================================

var i = ['',textQuestion,speechQuestion,dragQuestion];

i[](selectedQuestion.rightAnswer);

//Carols text
//=========================================================
function textQuestion(a){

	$('.textQuestion').removeClass('hide');

	$('form').submit(function(){
		event.preventDefault();
		var answer = document.getElementById("txtans").value;
		console.log("answer is" +answer);
		var text = document.createTextNode(answer);
		document.getElementById("answerbox").appendChild(text);

		document.getElementById("txtans").value="";
	});
}
//=========================================================


//Brian's speech to text
//=========================================================
function speechQuestion(a){
	$('.speechQuestion').removeClass('hide');
	//var asked_question = q;
	var asked_answer = a.toLowerCase();

	//The Magic area!
	//===================================================
		recognition.continuous = false;
		recognition.onresult = function(event) {
			transcript = event.results[0][0].transcript;
			transcript = transcript.toLowerCase();
			document.getElementById('capText').innerHTML = transcript;
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

//Jake's code
//===================================================
function dragQuestion(a) {
	$('.dragQuestion').removeClass('hide');

	$('#answerbox').html('drag your answer here');

	console.log("click works");

	var answerOptions = [selectedQuestion.rightAnswer,
							selectedQuestion.wrongAnswer1,
							selectedQuestion.wrongAnswer2];

	var answerOptionsRandom = shuffleArray(answerOptions);

	for (i = 0; i < answerOptionsRandom.length; i++) {
		if (answerOptionsRandom[i] === selectedQuestion.rightAnswer) {
			var rightAnswer = document.createTextNode(answerOptionsRandom[i]);
			var computeAnswer = answerOptionsRandom[i];
			var postRightAnswer = document.getElementById("answer" + (i + 1));
			postRightAnswer.appendChild(rightAnswer);
		}

		else {
			var wrongAnswer = document.createTextNode(answerOptionsRandom[i]);
			var postWrongAnswer = document.getElementById("answer" + (i + 1));
			postWrongAnswer.appendChild(wrongAnswer);
		}
	}

	$('#answer1').draggable();
	$('#answer2').draggable();
	$('#answer3').draggable();

	$('#answerArea').droppable( {
			drop: function( event, ui ) {
				var selectedAnswer = ui.draggable.context;
				console.log(selectedAnswer);
				var checkAnswer = selectedAnswer.innerHTML;
				console.log(checkAnswer + computeAnswer);
					if (checkAnswer === computeAnswer) {
						$('#answerArea').html("Correct");
					}
					else {
						$('#answerArea').html( "Incorrect! Try again dummy" );
					}
			}
	});
}
//===================================================
