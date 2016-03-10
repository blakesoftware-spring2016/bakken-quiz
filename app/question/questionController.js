app.controller("questionController", ['$scope','$location', function($scope, $location) {
    $scope.next = function() {
        $location.path('/results');
    };
    
    $scope.back = function() {
        $location.path('/quizDescriptions');
    };
}]);