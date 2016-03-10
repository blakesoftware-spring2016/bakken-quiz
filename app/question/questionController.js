app.controller("questionController", ['$scope','$location', 'quizData', '$routeParams', function($scope, $location, quizData, $routeParams) {
    $scope.next = function() {
        if($routeParams == quizData.questions[quizData.questions.length - 1]) {
            $location.path('/results');
        };
    };
    
    $scope.back = function() {
        if($routeParams == quizData.questions[0]) {
            $location.path('/quizDescriptions');
        } else {
            $location.path('?')
        }
    };
}]);