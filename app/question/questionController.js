app.controller("questionController", ['$scope','$location', '$routeParams', '$http', function($scope, $location, $routeParams, $http) {
	$http.get('app/questions.json').then(function(response) {
		$scope.data = response.data;
	});
	$scope.next = function() {
		// As always, Angular's syntax is terrible...but it kinda works!
		if ($routeParams.questionNum == $scope.data.questions.length - 1) {
            $location.path('/results');
        } else {
            $location.path('/question/' + String(Number($routeParams.questionNum) + 1));
        }
    };
    $scope.back = function() {
        if ($routeParams == 0) {
            $location.path('/quizDescriptions');
        } else {
            $location.path('/question/' + String(Number($routeParams.questionNum) - 1));
        };
    };
}]);
