app.controller("resultsController", ['$scope','$location', '$routeParams', 'quizData', '$uibModal', function($scope, $location, $routeParams, quizData, $uibModal) {

    quizData.then(function(response) {

		var quizID = $routeParams.quizID;
        var quiz = response.data[quizID];
		var questions = quiz.questions;
		// For percentage quizzes, in which the answer is essentially boolean
		// And the result is calculated based the percentage of the questions the user idenfifies with the target property
		if (quiz.type === 'percentage') {
			var target_count = 0;
			// Loop through each question
			for (var i = 0; i < questions.length; i++) {
				// Fetch the selected answer using the session data
				var answer = questions[i].answers[session_answers[i]];
				// If the selected answerk idenfifies with the target property, increment it
				if (answer.target) target_count++;
			}
			// Calculate the percentage of answers that identify with the target
			var percentage = target_count / questions.length;
			// Determine the actual result based on the percentage
			var final_result = quiz.results[Math.floor(percentage * quiz.results.length)];
			// So... now we know the result!
			// Make it available to the template
			$scope.title = final_result.title;
			$scope.description = final_result.description;
		}
		// For multiple selection quizzes, in which each answer choice can be assigned to one or more 'buckets'
		// The category in which the user has the most 'buckets' defines the result
		else if (quiz.type === 'multi') {
			var results_count = {};
			// Loop through each question
			for (var i = 0; i < questions.length; i++) {
				// Fetch the selected answer using the session data
				var answer = questions[i].answers[session_answers[i]];
				// Loop through each answers' buckets
				for (var j = 0; j < answer.buckets.length; j++) {
					var bucket = answer.buckets[j];
					// Add the bucket to the results object if it doesn't already exist
					if (typeof results_count[bucket] === 'undefined') {
						results_count[bucket] = 1;
					}
					// Or increment the bucket count in the results object if it does exist
					else {
						results_count[bucket]++;
					}
				}
			}
			// Loop through each possible category to determine the most frequent/greatest
			var greatest_category;
			for (var category in results_count) {
				// If the greatest category doesn't exist, set it
				// If the current category is greater than the greatest category, update the greatest category
				if (!greatest_category || results_count.category > results_count.greatest_category) {
					greatest_category = category;
				}
			}
			// So... now we know the result!
			// Make it available to the template
			var final_result = quiz.results[greatest_category];
			$scope.title = final_result.title;
			$scope.description = final_result.description;
		}

    });
    
    $scope.continue = function() {
      $location.path('/shareResults');
    };
    
    $scope.back = function() {
      $location.path('/chooseQuiz');
    };
    
}]);
