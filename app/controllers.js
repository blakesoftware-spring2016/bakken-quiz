app.controller('timeoutController', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
	
	$scope.timeoutAfter = 7000;
	$scope.timer;
	
	$scope.executeOnTimeout = function() {
		$location.path('/touchBegin');
		$scope.makeTimer();
	}
	
	$scope.makeTimer = function() {
		timer = $timeout($scope.executeOnTimeout, $scope.timeoutAfter);
	}
	
	$scope.resetTimer = function() {
		$timeout.cancel(timer);
		$scope.makeTimer();
	}
	
	$scope.makeTimer();
	
	window.onmousemove = $scope.resetTimer;
	window.onkeydown = $scope.resetTimer;
	window.onclick = $scope.resetTimer;
	
}]);

//chooseQuizController
app.controller("chooseQuizController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {

}]);

//privacyController
app.controller("privacyController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {

}]);

//questionController
app.controller("questionController", ['$scope','$location', '$routeParams', 'quizData', '$uibModal', function($scope, $location, $routeParams, quizData, $uibModal) {

	quizData.then(function(response) {
		// Get parameters from route
		$scope.quizID = $routeParams.quizID;
		$scope.questionID = $routeParams.questionID;
		// Make all data associated with the current quiz available to the template
		$scope.quiz = response.data[$scope.quizID];
		$scope.questions = $scope.quiz.questions;
		$scope.question = $scope.questions[$scope.questionID];
		$scope.answers = $scope.question.answers;
	});

	$scope.next = function() {
		// As always, Angular's syntax is terrible...but it kinda works!
		if ($scope.questionID == $scope.questions.length - 1) {
            $location.path('/results/' + String($scope.quizID));
        } else {
            $location.path('/question/' + String($scope.quizID) + '/' + String(++$scope.questionID));
        }
    };

    $scope.back = function() {
        if ($scope.questionID == 0) {
            $location.path('/quizDescription/' + String($scope.quizID));
        } else {
			$location.path('/question/' + String($scope.quizID) + '/' + String(--$scope.questionID));
        };
    };

	$scope.isSelected = function($index) {
		if (session_answers[$scope.questionID] === $index) return true;
		else return false;
	};

	$scope.select = function($index) {
		session_answers[$scope.questionID] = $index;
	};

    $scope.open = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/templates/popupContent.html',
            controller: 'popupController',
            size: 'lg'
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        });
	
	};
	
}]);

//quitPageController
app.controller("quitPageController", ['$scope','$location', '$routeParams', 'quizData', function($scope, $location, $routeParams, quizData) {
    
	quizData.then(function(response) {
		// Get parameters from route
		$scope.quizID = $routeParams.quizID;
		// Make all data associated with the current quiz available to the template
		$scope.questions = response.data[$scope.quizID].questions;
	});
	
	$scope.cancel = function() {
		window.history.back();
	};
	
	$scope.quit = function() {
		// Delete all user data if they decide to quit
		delete session_answers;
		// Redirect to choose quiz page
		$location.path('/chooseQuiz');
	};
	
}]);

//quizDescriptionsController
app.controller("quizDescriptionController", ['$scope','$location','$routeParams', 'quizData', function($scope, $location, $routeParams, quizData) {

    quizData.then(function(response) {
		
        var quizID = $routeParams.quizID;
		$scope.quiz = response.data[quizID];
		$scope.question_href = '#/question/' + quizID + '/0';
		$scope.questions = $scope.quiz.questions;
		
		for (var i = 0; i < $scope.questions.length; i++) {
			session_answers.push(null);
		}
		
    });

}]);

//resultsController
app.controller("resultsController", ['$scope','$location', '$routeParams', 'quizData', function($scope, $location, $routeParams, quizData) {
	
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
	
    $scope.open = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/templates/popupContent.html',
            controller: 'popupController',
            size: 'lg'
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        });
		
	};

}]);

//sentConfirmationController
app.controller("sentConfirmationController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {
	
}]);

app.controller("shareResultsController", ['$scope','$location', 'quizData','$uibModal', function($scope, $location, quizData, $uibModal) {
	
	$scope.checkEmails = function() {
		
		if ($scope.shareResultsForm.$valid) {
			var modalInstance = $uibModal.open({
	            animation: true,
	            templateUrl: 'app/templates/popupContentSent.html',
	            controller: 'popupControllerSent',
	            size: 'lg'
	        });
	        modalInstance.result.then(function(selectedItem) {
	            $scope.selected = selectedItem;
	        });
			// $location.path('/sentConfirmation');
  		}
		
  		angular.forEach($scope.shareResultsForm.$error.required, function(field) {
    		field.$setDirty();
		});
		
	};
  
    $scope.open = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/templates/popupContent.html',
            controller: 'popupController',
            size: 'lg'
        });
		
        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        });
		
    };
	
}]);

//touchBeginController
app.controller('touchBeginController', ['$scope','$location', function($scope, $location) {
	
	$scope.buttonClick = function() {
		$location.path('/chooseQuiz');
	};
	
}]);

app.controller('popupController', function($scope, $uibModalInstance) {
	
	$scope.dismiss = function(value) {
        $uibModalInstance.close(value);
    };
	
});

app.controller('popupControllerSent', function($scope, $uibModalInstance) {
    
	$scope.dismiss = function(value) {
        $uibModalInstance.close(value);
    };
	
});

app.controller('popupControllerAge', function($scope, $uibModalInstance) {
    
	$scope.dismiss = function(value) {
        $uibModalInstance.close(value);
    };
	
});
