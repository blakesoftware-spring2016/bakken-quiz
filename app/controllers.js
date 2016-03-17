//chooseQuizController
app.controller("chooseQuizController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {


}]);


//privacyController
app.controller("privacyController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {


}]);


//questionController
app.controller("questionController", ['$scope','$location', '$routeParams', 'quizData', function($scope, $location, $routeParams, quizData) {

	quizData.then(function(response) {

		$scope.data = response.data;
		$scope.questions = response.data.questions;

		$scope.questionNum = Number($routeParams.questionNum);
	  $scope.question = $scope.questions[$scope.questionNum];
	  $scope.questionTitle = $scope.question.question;

	  // Array containing answer objects with "answer": question text, "buckets": []
	  $scope.questionAnswers = $scope.question.multiChoiceAnswers;

	});

	$scope.next = function() {
		// As always, Angular's syntax is terrible...but it kinda works!
		if ($routeParams.questionNum == $scope.questions.length - 1) {
            $location.path('/results');
        } else {
            $location.path('/question/' + String(++$scope.questionNum));
        };
    };

    $scope.back = function() {
        if ($scope.questionNum == 0) {
            $location.path('/quizDescriptions');
        } else {
            $location.path('/question/' + String(--$scope.questionNum));
        };
    };

	$scope.isSelected = function($index) {
		if ($scope.question.selected == $index) {
			return true;
		} else {
			return false;
		}
	};

	$scope.select = function($index) {
		$scope.question.selected = $index;
	};

}]);


//quitPageController
app.controller("quitPageController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {


}]);


//quizDescriptionsController
app.controller("quizDescriptionController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {


}]);


//resultsController
app.controller("resultsController", ['$scope','$location', 'quizData', function($scope, $location, quizData) {


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
