app.controller("resultsController", ['$scope','$location', '$routeParams', 'quizData', '$uibModal', function($scope, $location, $routeParams, quizData, $uibModal) {

    quizData.then(function(response) {

		var quizID = $routeParams.quizID;
        var quiz = response.data[quizID];
		var questions = quiz.questions;
		// Add Easter egg if the user doesn't answer any questions
		// Exit out of calculation to prevent errors
		if (Object.keys(session_answers).length === 0) {
			$scope.results = [{
				title: 'INSERT TITLE FOR EASTER EGG HERE',
				description: 'INSERT DESCRIPTION FOR EASTER EGG HERE'
			}]
			return;
		}
		// For percentage quizzes, in which the answer is essentially boolean
		// And the result is calculated based the percentage of the questions the user idenfifies with the target property
		if (quiz.type === 'bool') {
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

    $scope.open = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/templates/popupContent.html',
            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
				$scope.popupTitle = "Are you sure you want to quit?";
				$scope.confirm = "Yes";
				$scope.back = "No";

				$scope.dismiss = function(value) {
        			$uibModalInstance.close(value);
				};
			}],
            size: 'lg'
        });

        modalInstance.result.then(function(dismissVal) {
            if(dismissVal === "Yes") {
				for(var property in session_answers) {
					delete session_answers[property];
				};
			};
        });

	};

	$scope.ageCheck = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/templates/popupContent.html',
            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
				$scope.popupTitle = "Are you 13 or older?";
				$scope.confirm = "Yes";
				$scope.back = "No";

				$scope.dismiss = function(value) {
        			$uibModalInstance.close(value);
				};
			}],
            size: 'lg'
        });
		console.log("ageCheck");
        modalInstance.result.then(function(dismissVal) {
            if(dismissVal === "Yes") {
				$location.path('/shareResults');
			};
        });

	};

}]);
