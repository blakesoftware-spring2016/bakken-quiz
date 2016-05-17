app.controller('descriptionController', function($scope, $location, quizData) {

	$scope.isRomantic = session_quiz;
	$scope.isMary = !($scope.isRomantic);
	
    quizData.then(function(response) {

		$scope.quiz = response.data[session_quiz];

		$scope.start_quiz = function() {
			// As the user is starting a new quiz, delete all previous session data
			session_answers = {};
			$location.path('/question/0');
		};

    });

    if (session_quiz === 0) {
		$scope.descriptionBackground = 'backgroundMaryDescription';
	} else {
		$scope.descriptionBackground = 'backgroundRomanticDescription';
	}

});
