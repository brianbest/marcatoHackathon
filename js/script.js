$('form').submit(function(){
	event.preventDefault();
	var answer = document.getElementById("txtans").value;
	console.log("answer is" +answer);
	var text = document.createTextNode(answer);
	document.getElementById("answerbox").appendChild(text);

	document.getElementById("txtans").value="";
});