app.controller("shareResultsController", ['$scope','$location', 'quizData','$uibModal', function($scope, $location, quizData, $uibModal) {
	
	$scope.checkEmails = function() {
		angular.forEach($scope.shareResultsForm.$error.required, function(field) {
    		field.$setDirty();
		});
	};
	
    $scope.back = function() {
		$location.path('/chooseQuiz');
	};
	
    $scope.continue = function() {
		$location.path('/results');
	};
    
    $scope.backResults = function() {
    	window.history.back();
	};
	
}]);
