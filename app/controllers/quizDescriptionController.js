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
