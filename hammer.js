//function for creating question objects
function question(question, right, wrong1, wrong2) {
    this.question = question;
    this.rightAnswer = right;
    this.wrongAnswer1 = wrong1;
    this.wrongAnswer2 = wrong2;
}

//default question objects
var question1 = new question("What color is the sky?", "Blue", "Hex", "Dunno");
var question2 = new question("What color is the ocean?", "Blue", "Cloth", "Knife");
var question3 = new question("What time is it?", "Now", "Never", "Before");

//array of questions
var questionBin = [question1, question2, question3];
var selectedQuestion = "";

//function for picking a random question
function pickQuestion(){
	selectedQuestion = questionBin[Math.floor(Math.random() * questionBin.length)];
	askQuestion(selectedQuestion);
}


function askQuestion() {
	console.log("click works");
	var question = document.createElement("P");
	var content = document.createTextNode(selectedQuestion.question);
	question.appendChild(content);
	
	var postQuestion = document.getElementById("questionArea");
	postQuestion.appendChild(question);

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

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

