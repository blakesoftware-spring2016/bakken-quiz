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
		var quizID = $routeParams.quizID;
		var questionID = $routeParams.questionID;
		
		// Make all data associated with the current quiz available to the template
		$scope.quiz = response.data[quizID];
		$scope.questions = $scope.quiz.questions;
		$scope.question = $scope.questions[$scope.questionID];
		$scope.answers = $scope.question.answers;
		
	});
	
	$scope.next = function() {
		// As always, Angular's syntax is terrible...but it kinda works!
		if ($routeParams.questionNum == $scope.questions.length - 1) {
            $location.path('/results');
        } else {
            $location.path('/question/' + String($scope.quizID) + '/' + String(++$scope.questionID));
        }
    };
	
    $scope.back = function() {
        if ($scope.questionNum == 0) {
            $location.path('/quizDescription');
        } else {
			$location.path('/question/' + String($scope.quizID) + '/' + String(--$scope.questionID));
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
app.controller("quizDescriptionController", ['$scope','$location','$routeParams', 'quizData', function($scope, $location, $routeParams, quizData) {
    
    quizData.then(function(response) {
        
        var quizID = $routeParams.quizID;
        $scope.data = response.data[quizID];
		
		$scope.question_href = '#/question/' + quizID + '/0';
    });
	
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
