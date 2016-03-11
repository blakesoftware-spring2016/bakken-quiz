app.controller("questionController", ['$scope','$location', 'quizData', '$routeParams', function($scope, $location, quizData, $routeParams) {
	var data = quizData.$$state.value.data;
    $scope.next = function() {
		// As always, Angular's syntax is terrible...but it kinda works!
		if ($routeParams.questionNum == data.questions.length - 1) {
            $location.path('/results');
        } else {
            $location.path('/question/' + String(Number($routeParams.questionNum) + 1));
        }
    };
    $scope.back = function() {
        if($routeParams == 0) {
            $location.path('/quizDescriptions');
        } else {
            $location.path('/question/' + String(Number($routeParams.questionNum) - 1));
        };
    };
}]);
