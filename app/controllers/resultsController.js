app.controller('resultsController', function($scope, $location, $routeParams, quizData) {

	// Set correct background
	$scope.isRomantic = session_quiz;
	$scope.isMary = !($scope.isRomantic);

    quizData.then(function(response) {
		var quizID = session_quiz;
        var quiz = response.data[quizID];
		var questions = quiz.questions;
		// Add Easter egg if the user doesn't answer any questions
		// Exit out of calculation to prevent errors
		if (Object.keys(session_answers).length === 0) {
			session_results = {
				title: 'INSERT TITLE FOR EASTER EGG HERE',
				description: 'INSERT DESCRIPTION FOR EASTER EGG HERE'
			};
			// Make results available to the template
			$scope.result = session_results;
			return;
		}
		// For percentage quizzes, in which the answer is essentially boolean
		// And the result is calculated based the percentage of the questions the user idenfifies with the target property
		if (quiz.type === 'bool') {
			var target_count = 0;
			// Loop through each question
			for (var i = 0; i < questions.length; i++) {
				// Only continue with calculataion if the user answered the given question
				if (typeof session_answers[i] !== 'undefined') {
					// Fetch the selected answer using the session data
					var answer = questions[i].answers[session_answers[i]];
					// If the selected answerk idenfifies with the target property, increment it
					if (answer.target) target_count++;
				}
			}
			// Calculate the percentage of answers that identify with the target based upon the number of questions that were answered
			// Unanswered questions are not included in percentage calculataion
			var percentage = target_count / Object.keys(session_answers).length;
			// Determine the actual result based on the percentage
			var result_index = Math.floor(percentage * quiz.results.length);
			// If the percentage is 1, the array index gets screwed up...so fix it
			if (percentage === 1) result_index--;
			var result = quiz.results[result_index];
			// So... now we know the result!
			// Make it available to the template
			$scope.result = {
				title: result.title,
				description: result.description
			};
			session_results = $scope.result;
		}
		// For multiple selection quizzes, in which each answer choice can be assigned to one or more 'buckets'
		// The category in which the user has the most 'buckets' defines the result
		else if (quiz.type === 'multi') {
			var results_count = {};
			// Loop through each question
			for (var i = 0; i < questions.length; i++) {
				// Only continue with calculataion if the user answered the given question
				if (typeof session_answers[i] !== 'undefined') {
					// Fetch the selected answer using the session data
					var answer = questions[i].answers[session_answers[i]].bucket;
					// Add the bucket to the results object if it doesn't already exist
					if (typeof results_count[answer] === 'undefined') {
						results_count[answer] = 1;
					}
					// Or increment the bucket count in the results object if it does exist
					else {
						results_count[answer]++;
					}
				}
			}
			// Loop through each possible category to determine the most frequent/greatest
			var greatest_num = 0;
			var greatest_categories = [];
			for (var category in results_count) {
				// If the greatest category doesn't exist, set it
				// If the current category is greater than the greatest category, replace the array with the greatest category
				if (results_count[category] > greatest_num) {
					greatest_num = results_count[category];
					greatest_categories = [category];
				}
				// If the current category has the same frequency of the greatest, add it to the array of greatest categories
				else if (results_count[category] === greatest_num) {
					greatest_categories.push(category);
				}
			}
			// If there's a tie...
			var tie_breaker_priority = 0;
			while (greatest_categories.length > 1) {
				// Loop through every question to decide which one is the tie breaker
				// Begin with the question with the greatest priority (priority 0)
				for (var i = 0; i < questions.length; i++) {
					if (questions[i].priority === tie_breaker_priority) {
						// If there's no answer for the current question, continue to next one
						if (typeof session_answers[i] === 'undefined') continue;
						var answer = questions[i].answers[session_answers[i]].bucket;
						// Loop through each of tied categories to determine if one was the answer
						for (var j = 0; j < greatest_categories.length; j++) {
							// If the selected answer was one of the categories that caused the tie, we have a winner!
							if (greatest_categories[j] === answer) {
								greatest_categories = [greatest_categories[j]];
								break;
							}
						}
					}
				}
				// If the tie was unresolved, try another tie breaker
				tie_breaker_priority++;
			}
			// So... now we know the result!
			var result = quiz.results[greatest_categories[0]];
			session_results = {
				title: result.title,
				description: result.description,
				quote: result.quote
			};
			// Make results available to the template
			$scope.result = session_results;
		}
    });

    $scope.continue = function() {
		$location.path('/shareResults');
    };

    $scope.back = function() {
		$location.path('/chooseQuiz');
    };

});
