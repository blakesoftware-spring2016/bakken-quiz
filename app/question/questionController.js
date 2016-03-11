app.controller("questionController", ['$scope','$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
	
	$http.get('app/questions.json').then(function(response) {
		
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
            $location.path('/question/' + String(Number($routeParams.questionNum) + 1));
        };
    };
	
    $scope.back = function() {
        if ($routeParams == 0) {
            $location.path('/quizDescriptions');
        } else {
            $location.path('/question/' + String(Number($routeParams.questionNum) - 1));
        };
    };
	
}]);
