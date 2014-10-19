

function getNewQuestion(){
  $('#answerbox').html("");
  console.log(total_scoreK,total_scoreV,total_scoreA,total_overall);

  if(total_asked >= 10){
    endRound();
  }else{
    runTest(total_scoreK,total_scoreV,total_scoreA,total_overall);
  }

}
