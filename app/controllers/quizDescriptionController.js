app.controller("quizDescriptionController", ['$scope','$location','$routeParams', 'quizData', function($scope, $location, $routeParams, quizData) {



    quizData.then(function(response) {

        var quizID = $routeParams.quizID;
		$scope.quiz = response.data[quizID];
		
		$scope.start_quiz = function() {
			// As the user is starting a new quiz, delete all previous session data
			session_answers = {};
			$location.path('/question/' + quizID + '/0');
		}
		
    });

    if ($routeParams.quizID === '0') {
		$scope.descriptionBackground = "backgroundMaryDescription";
	} else {
		$scope.descriptionBackground = "backgroundRomanticDescription";
	}

}]);
