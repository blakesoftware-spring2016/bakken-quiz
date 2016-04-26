app.controller("shareResultsController", ['$scope','$location', 'quizData','$uibModal', function($scope, $location, quizData, $uibModal) {

	$scope.checkEmails = function() {

  		angular.forEach($scope.shareResultsForm.$error.required, function(field) {
    		field.$setDirty();
		});

	};

      $scope.back = function() {
		for(var property in session_answers) {
			delete session_answers[property];
		};
		$location.path('/chooseQuiz');
	  };
      
      $scope.continue = function() {
		$location.path('/results');
	};
      
      
}]);
