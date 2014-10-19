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

	var total_scoreK = 0;
	var total_scoreV = 0;
	var total_scoreA = 0;
	var total_overall= 0;
	var total_asked = 0;
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
	// var question1 = new makeQuestion("What color is the sky?", "Blue", "Hex", "Dunno");
	// var question2 = new makeQuestion("What color is the ocean?", "Blue", "Cloth", "Knife");
	// var question3 = new makeQuestion("What time is it?", "Now", "Never", "Before");

	//array of questions
	// var questionBin = [question1, question2, question3];
	var selectedQuestion = "";

//function for picking a random question
function pickQuestion(){
	selectedQuestion = questionBin[Math.floor(Math.random() * questionBin.length)];

	//Place question
	//===================================================
	$('.questionbox').find('p').html(selectedQuestion.question);
}



function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
		}
		return array;
}





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



//Carols text
//=========================================================
function textQuestion(a){
	var answer = a.toLowerCase();

	$('.textQuestion').removeClass('hide');
	$('form').submit(function(){
		event.preventDefault();
		var txtanswer = document.getElementById("txtans").value;
		var txtanswer = txtanswer.toLowerCase();
		console.log("user answer is " +txtanswer);
		var text = document.createTextNode(txtanswer);
		document.getElementById("answerbox").appendChild(text);
		if(txtanswer !== answer){
			var msg = new SpeechSynthesisUtterance('wrong!');
				window.speechSynthesis.speak(msg);
			total_asked++;
			document.getElementById("txtans").value="";
			$('.textQuestion').addClass('hide');
			getNewQuestion();
		}else{
			var msg = new SpeechSynthesisUtterance('correct!');
				window.speechSynthesis.speak(msg);
			console.log("Correct!");
			total_scoreA++;
			total_overall++;
			total_asked++;
			document.getElementById("txtans").value="";
			$('.textQuestion').addClass('hide');
			getNewQuestion();
		};

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
					total_scoreV++;
					total_overall++;
					total_asked++;
					$('.speechQuestion').addClass('hide');
					getNewQuestion();

				//alert('Right!');
			}else{
				var msg = new SpeechSynthesisUtterance('wrong!');
					window.speechSynthesis.speak(msg);
					$('.speechQuestion').addClass('hide');
					total_asked++;
					getNewQuestion();
				//alert('WRONG! -- GTFO!');
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
	var width = $( window ).width();
	if(width < 500){
		mobileInit();
	}


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

	$('#answer1').draggable({revert: "valid"});
	$('#answer2').draggable({revert: "valid"});
	$('#answer3').draggable({revert: "valid"});

	$('#answerArea').droppable( {
			drop: function( event, ui ) {
				var selectedAnswer = ui.draggable.context;
				console.log(selectedAnswer);
				var checkAnswer = selectedAnswer.innerHTML;
				console.log(checkAnswer + computeAnswer);
					if (checkAnswer === computeAnswer) {
						var msg = new SpeechSynthesisUtterance('correct!');
							window.speechSynthesis.speak(msg);
						$('#answerbox').html("Correct");
						$('.dragQuestion').addClass('hide');
						total_scoreK++;
						total_overall++;
						total_asked++;

						//clear old answers
						$('#answer1').html("");
						$('#answer2').html("");
						$('#answer3').html("");

						getNewQuestion();

					}
					else {
						var msg = new SpeechSynthesisUtterance('wrong!');
							window.speechSynthesis.speak(msg);
						$('#answerbox').html( "Incorrect! Try again dummy" );
						$('.dragQuestion').addClass('hide');
						total_asked++;

						//clear old answers
						$('#answer1').html("");
						$('#answer2').html("");
						$('#answer3').html("");

						getNewQuestion();
					}
			}
	});
}
//===================================================


//when on mobile

function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function mobileInit() {
    $('#answer1').addEventListener("touchstart", touchHandler, true);
    $('#answer1').addEventListener("touchmove", touchHandler, true);
    $('#answer1').addEventListener("touchend", touchHandler, true);
    $('#answer1').addEventListener("touchcancel", touchHandler, true);

		$('#answer2').addEventListener("touchstart", touchHandler, true);
		$('#answer2').addEventListener("touchmove", touchHandler, true);
		$('#answer2').addEventListener("touchend", touchHandler, true);
		$('#answer2').addEventListener("touchcancel", touchHandler, true);

		$('#answer3').addEventListener("touchstart", touchHandler, true);
		$('#answer3').addEventListener("touchmove", touchHandler, true);
		$('#answer3').addEventListener("touchend", touchHandler, true);
		$('#answer3').addEventListener("touchcancel", touchHandler, true);
}


//End the round
//===================================================
function endRound(){
	$('.forceHeight').addClass('hide');
	$('.endRound').removeClass('hide');
	$('#endRight').html(total_overall);
	var wrongQ =  total_asked - total_overall;
	$('#endWrong').html(wrongQ);
	var totalWin = Math.floor((total_overall/total_asked) * 100);
	$('#endTotal').html(totalWin + '%');

	var totalAff = total_scoreK + total_scoreV + total_scoreA;

	var kAff = Math.floor((total_scoreK/totalAff) * 100);
	var vAff = Math.floor((total_scoreV/totalAff) * 100);
	var aAff = Math.floor((total_scoreA/totalAff) * 100);

	$('#endAudio').html(aAff + '%');
	$('#endVisual').html(vAff + '%');
	$('#endKinetic').html(kAff + '%');
}
function startNewRound(){
	total_overall = 0;
	total_asked = 0;
	$('.endRound').addClass('hide');
	$('.forceHeight').removeClass('hide');
	getNewQuestion();
}
