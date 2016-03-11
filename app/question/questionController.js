app.controller("questionController", ['$scope','$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
	
	$http.get('app/questions.json').then(function(response) {
		$scope.data = response.data;
	});
	
	$scope.next = function() {
		// As always, Angular's syntax is terrible...but it kinda works!
		if ($routeParams.questionNum == $scope.data.questions.length - 1) {
            $location.path('/results');
        } else {
            $location.path('/question/' + (Number($routeParams.questionNum) + 1));
            console.log(Number($routeParams.questionNum) + 1);
        };
    };
	
    $scope.back = function() {
        if($routeParams == quizData.questions[0]) {
            $location.path('/quizDescriptions');
        } else {
            $location.path('/question/' + (Number($routeParams.questionNum) - 1));
            console.log(Number($routeParams.questionNum) - 1);
        };
    };

    $scope.questionNumber = Number($routeParams.questionNum);
    $scope.questionData = quizData.questions[questionNumber];
    $scope.questionTitle = questionData.question;

    //Array containing answer objects with "answer": question text, "buckets": []
    $scope.questionAnswers = questionData.multiChoiceAnswers;
}]);
