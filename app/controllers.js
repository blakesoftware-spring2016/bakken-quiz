//chooseQuizController
app.controller("chooseQuizController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {
    
}]);

//privacyController
app.controller("privacyController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {
	
}]);

//questionController
app.controller("questionController", ['$scope','$location', '$routeParams', 'quizData', function($scope, $location, $routeParams, quizData) {
	
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
		if (session_answers[$scope.question] === $index) {
			return true;
		} else {
			return false;
		}
	};
	
	$scope.select = function($index) {
		session_answers[$scope.question] = $index;
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
		for (var i = 0; i < $scope.questions.length; i++) {
			delete $scope.questions[i].selected;
		}
		// Redirect to choose quiz page
		$location.path('/chooseQuiz');
	};
	
	
}]);

//quizDescriptionsController
app.controller("quizDescriptionController", ['$scope','$location','$routeParams', 'quizData', function($scope, $location, $routeParams, quizData) {
    
    quizData.then(function(response) {
        var quizID = $routeParams.quizID;
        $scope.data = response.data[quizID];
		$scope.question_href = '#/question/' + quizID + '/0';
		$scope.quiz = response.data[quizID];
		$scope.questions = $scope.quiz.questions;
		
    });
	
	for(var i = 0; i < $scope.questions.length; i++){
		session_answers[i] = null;	
	};
	
}]);

//resultsController
app.controller("resultsController", ['$scope','$location', '$routeParams', 'quizData', function($scope, $location, $routeParams, quizData) {
	
    quizData.then(function(response) {
        var quizID = $routeParams.quizID;
        $scope.quiz = response.data[quizID];
			   
		$scope.questions = $scope.quiz.questions;
		
		var results = {};
		var target; // counter for majorityQuiz
        
        for(var i = 0; i < $scope.questions.length; i++) {
			debugger;
			var question = $scope.questions[i];
			var answer = question.answers[question.selected];
			// loops through each bucket array
			for(var j = 0; j < answer.buckets.length; j++){
				// counts answers for all buckets
				if(typeof results[answer.buckets[j]] === 'undefined') {
					results[answer.buckets[j]] = 1;
				} else {
					results[answer.buckets[j]]++;
				}
				// counts target answers
				if(answer.buckets === "Target") {
					target++;
				}
			}
		}
		
		var greatest;
		for(var prop in results) {
			if(!greatest || results.prop > results.greatest){
				greatest = prop;
			}
		}
		
		if($scope.quiz.type == "percentageQuiz") {
			var percentage = results.greatest/$scope.questions.length;
		} else if ($scope.quiz.type == "majorityQuiz") {
			var percentage = target / $scope.questions.length;
			var answerIndex = Math.floor(percentage * $scope.quiz.resultBuckets.length);
			$scope.title = $scope.quiz.resultBuckets[answerIndex].title;
			
		}
		
    });                                 
    
}]);

//sentConfirmationController
app.controller("sentConfirmationController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {
	
}]);

//shareResultsController
app.controller("shareResultsController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {
	
}]);

//touchBeginController
app.controller('touchBeginController', ['$scope','$location', function($scope, $location) {
	
	$scope.buttonClick = function() {
		$location.path('/chooseQuiz');
	};
	
}]);
