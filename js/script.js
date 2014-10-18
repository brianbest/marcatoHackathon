var answer = '2'

$('form').submit(function(){
	event.preventDefault();
	var txtanswer = document.getElementById("txtans").value;
	console.log("user answer is" +txtanswer);
	var text = document.createTextNode(txtanswer);	
	document.getElementById("answerbox").appendChild(text);
	console.log("text is " + text);
	if(text !== answer){
		console.log("wow they suck");
		alert("Too bad!");
	}else{
		console.log("Correct!");
		alert("Awesome job!");
	};
	document.getElementById("txtans").value="";
	
});

