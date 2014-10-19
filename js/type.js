function runTest() {
	//temp score variables for each skill
	//kinetic, visual, audio .. at default values
	var tempScoreK = 1;
	var tempScoreV = 9;
	var tempScoreA = 0;

	//scores to be calculated every round
	var scoreK = 0;
	var scoreV = 0;
	var scoreA = 0;

	//default totalScore
	var totalScore = 10;

	//scores used to calculate weight for questions
	var skillK = tempScoreK/ totalScore;
	var skillV = tempScoreV/ totalScore;
	var skillA = tempScoreA/ totalScore;

	setType();

	function setType() {
		//create array for skills
		var weight = [skillK, skillV, skillA];
		//sort numerically/ascending
		weight.sort(function(a, b){return a-b});

		//implementing dominant skill cap of 0.5 (if needed)
		var dominantSkill = weight[2];
		if (dominantSkill > 0.5) {
			//save the amount that has been shaved off
			var shaveScore = weight[2] - 0.5;
			//reduce the largest to 0.5
			weight[2] = 0.5;

			//distribute the shaved amount between the weaker skills
			var addScore = shaveScore/ 2;
			
			weight[0] += addScore;
			weight[1] += addScore;
			
			//check
			console.log("dominant skill reduced to 0.5");
			console.log(weight[0] + "," + weight[1] + "," + weight[2]);
		}

		//random variable to choose type
		var typeSetter = Math.random();

		//for the weakest skill
		 if (typeSetter <= weight[0]) {
		 	console.log("Running the smallest");
		 	return;
		 }

		 //for the strongest skill
		 var weightCalc = weight[0] + weight[1];

		 if (typeSetter >= weightCalc) {
		 	console.log("Running the largest");
		 	return;
		 }

		 //for the middle skill
		 else {
		 	console.log("Running the middle");
		 }
	}
}