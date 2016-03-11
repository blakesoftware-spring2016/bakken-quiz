app.controller("questionController", ['$scope','$location', 'quizData', '$routeParams', function($scope, $location, quizData, $routeParams) {
    $scope.next = function() {
        if($routeParams == quizData.questions[quizData.questions.length - 1]) {
            $location.path('/results');
        } else {
            $location.path('/question/' + (Number($routeParams.question-num) + 1));
            console.log(Number($routeParams.question-num) + 1);
        };
    };
    
    $scope.back = function() {
        if($routeParams == quizData.questions[0]) {
            $location.path('/quizDescriptions');
        } else {
            $location.path('/question/' + (Number($routeParams.question-num) - 1));
            console.log(Number($routeParams.question-num) - 1);
        };
    };
}]);