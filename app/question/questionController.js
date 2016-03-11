app.controller("questionController", ['$scope','$location', 'quizData', '$routeParams', function($scope, $location, quizData, $routeParams) {
    $scope.next = function() {
        if($routeParams == quizData.questions[quizData.questions.length - 1]) {
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
    $scope.questionData = quizData[questionNumber];
    $scope.questionTitle = questionData.question;

    //Array containing answer objects with "answer": question text, "buckets": []
    $scope.questionAnswers = questionData.multiChoiceAnswers;
}]);
