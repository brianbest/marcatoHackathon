
var answer = document.getElementById("txtans").value;
console.log("answer is" +answer);
document.getElementById(answerbox).appendChild(document.createTextNode(answer));
document.getElementById("txtans").value="";