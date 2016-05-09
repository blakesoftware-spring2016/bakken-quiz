app.controller('questionController', function($scope, $location, $routeParams, quizData) {

	// Set correct background
	$scope.isMary = false;
	$scope.isRomantic = false;
	if (session_quiz == 0) {
		// $(".questionContainer").addClass("backgroundMaryQuestion");
		$scope.isMary = true;
		$scope.classToAddToNumberDiv = "maryText";
	} else {
		// $(".questionContainer").addClass("backgroundRomanticQuestion");
		$scope.isRomantic = true;
		$scope.classToAddToNumberDiv = "romanticText";
	}

	quizData.then(function(response) {
		// Get parameters from route
		$scope.quizID = session_quiz;
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
            $location.path('/results');
        } else {
            $location.path('/question/' + String(++$scope.questionID));
        }
    };

	$scope.menu = function() {
		$scope.showPopup = true;
		$scope.popupType = 'quit';
	};

	$scope.back = function() {
		// If on question one, prompt the user that their data will be deleted
		if ($scope.questionID == 0) {
			$scope.showPopup = true;
			$scope.popupType = 'back';
		} else {
			$location.path('/question/' + String(--$scope.questionID));
		}
	};

	$scope.isSelected = function($index) {
		if (session_answers[$scope.questionID] === $index) return true;
		else return false;
	};

	$scope.select = function($index) {
		session_answers[$scope.questionID] = $index;
	};

	$scope.quit = function() {
		if ($scope.popupType === 'back') {
			$location.path('/description');
		} else {
			$location.path('/chooseQuiz');
		}
	};

});
