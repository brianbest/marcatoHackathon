function runTest() {
	//score variables for each skill
	//kinetic, visual, audio .. at default values
	//tempScores will become score and reset to 0 after every "round" of 10 questions
	var scoreK = 2;
	var scoreV = 7;
	var scoreA = 1;

	//scores to be calculated every round
	var tempScoreK = 0;
	var tempScoreV = 0;
	var tempScoreA = 0;

	//default totalScore
	var totalScore = 10;

	//scores used to calculate weight for questions
	var skillK = scoreK/ totalScore;
	var skillV = scoreV/ totalScore;
	var skillA = scoreA/ totalScore;

	setType();

	function setType() {
		//creating objects for skills array
		var kinetic = {value: skillK, name: "skillK"};
		var visual = {value: skillV, name: "skillV"};
		var audio = {value: skillA, name: "skillA"};
		//create array for skills
		var weight = [kinetic, visual, audio];

		//sort numerically/ascending
		function compare(a,b) {
  			if (a.value < b.value)
     		return -1;
  			if (a.value > b.value)
    		return 1;
  			return 0;
		}
		weight.sort(compare);

		//implementing dominant skill cap of 0.5 (if needed)
		var dominantSkill = weight[2];
		if (dominantSkill > 0.5) {
			//save the amount that has been shaved off
			var shaveScore = weight[2].value - 0.5;
			//reduce the largest to 0.5
			weight[2].value -= shaveScore;

			//distribute the shaved amount between the weaker skills
			var addScore = shaveScore/ 2;
			
			weight[0].value += addScore;
			weight[1].value += addScore;
		}

		//random variable to choose type
		var typeSetter = Math.random();

		//for the weakest skill
		 if (typeSetter <= weight[0].value) {
		 	console.log("smallest");

		 	switch (weight[0].name) {

		 		case "skillK":
		 			console.log("It's K");
		 			break;
				
				case "skillV":
					console.log("It's V");
					break;

				case "skillA":
					console.log("It's A");
					break; 
		 	}
		 	return;
		 }

		 //for the strongest skill
		 var weightCalc = weight[0].value + weight[1].value;

		 if (typeSetter >= weightCalc) {
		 	console.log("largest");

		 	switch (weight[2].name) {

		 		case "skillK":
		 			console.log("It's K");
		 			break;
				
				case "skillV":
					console.log("It's V");
					break;

				case "skillA":
					console.log("It's A");
					break; 
		 	}
		 	return;
		 }

		 //for the middle skill
		 else {
		 	console.log("middle");

		 	switch (weight[1].name) {

		 		case "skillK":
		 			console.log("It's K");
		 			break;
				
				case "skillV":
					console.log("It's V");
					break;

				case "skillA":
					console.log("It's A");
					break; 
		 	}
		 	return;
		 }
	}
}