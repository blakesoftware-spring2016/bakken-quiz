app.controller("questionController", ['$scope','$location', '$routeParams', 'quizData', function($scope, $location, $routeParams, quizData, $uibModal) {

	// Set correct background
	$scope.isMary = false;
	$scope.isRomantic = false;
	if ($routeParams.quizID === '0') {
		// $(".questionContainer").addClass("backgroundMaryQuestion");
		$scope.isMary = true;
		$scope.classToAddToNumberDiv = "maryText";
		$scope.romanticStyleClass = "";
		if ($routeParams.questionID === "3") {
			$scope.isOverflow = true;
		}
	} else {
		// $(".questionContainer").addClass("backgroundRomanticQuestion");
		$scope.isRomantic = true;
		$scope.classToAddToNumberDiv = "romanticText";
		$scope.romanticStyleClass = "romanticStyle";
	}

	$scope.currentQuiz =

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

	$scope.continue = function() {
		$location.path('/chooseQuiz');
	}

    $scope.open = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/templates/popupContent.html',
            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
				$scope.popupTitle = 'Are you sure you want to quit?';
				$scope.confirm = 'Yes';
				$scope.back = 'No';
				$scope.dismiss = function(value) {
        			$uibModalInstance.close(value);
				};
			}],
            size: 'lg'
        });
	};

}]);
