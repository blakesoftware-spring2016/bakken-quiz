app.controller("shareResultsController", ['$scope','$location', 'quizData', function($scope, $location, quizData, $uibModal) {
	
	$scope.checkEmails = function() {
		angular.forEach($scope.shareResultsForm.$error.required, function(field) {
    		field.$setDirty();
		});
	};
	
    $scope.back = function() {
		$location.path('/chooseQuiz');
	};
    
    $scope.backResults = function() {
    	window.history.back();
	};
	
}]);
