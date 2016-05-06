app.controller("questionController", ['$scope','$location', '$routeParams', 'quizData', function($scope, $location, $routeParams, quizData) {

	$scope.weOnQ1 = false;

	// Set correct background
	if ($routeParams.quizID === '0') {
		// $(".questionContainer").addClass("backgroundMaryQuestion");
		$scope.questionBackground = "backgroundMaryQuestion";
		$scope.classToAddToNumberDiv = "maryText";
		$scope.romanticStyleClass = "";
		if ($routeParams.questionID === "3") {
			$scope.questionOverflowClass = "overflow";
		}
	} else {
		// $(".questionContainer").addClass("backgroundRomanticQuestion");
		$scope.questionBackground = "backgroundRomanticQuestion";
		$scope.classToAddToNumberDiv = "romanticText";
		$scope.romanticStyleClass = "romanticStyle";
	}

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
			$scope.weOnQ1 = true;
		} else {
			$location.path('/question/' + String($scope.quizID) + '/' + String(--$scope.questionID));
			$scope.weOnQ1 = false;

		};
	};

	$scope.isSelected = function($index) {
		if (session_answers[$scope.questionID] === $index) return true;
		else return false;

	};

	$scope.select = function($index) {
		session_answers[$scope.questionID] = $index;
		console.log($scope.youSure);
	};

	$scope.continue = function() {
		$location.path('/chooseQuiz');
	}

	$scope.backToDesc = function() {
		$location.path('/quizDescription/' + String($scope.quizID));
	}

}]);
