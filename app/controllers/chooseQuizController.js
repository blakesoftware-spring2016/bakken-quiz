app.controller('chooseQuizController', function($scope, $location, $routeParams, quizData) {
	
    quizData.then(function(response) {
		
        $scope.data = response.data;
		
		$scope.choose = function(quizID) {
			// Reset all user answers
			session_answers = {};
			// Set the quiz and go to question page
			session_quiz = quizID;
			$location.path('/description');
		};
		
    });
	
});
