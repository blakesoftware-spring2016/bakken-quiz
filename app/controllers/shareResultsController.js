app.controller('shareResultsController', function($scope, $location, quizData, $http) {
	
	$scope.checkEmails = function() {
		angular.forEach($scope.shareResultsForm.$error.required, function(field) {
    		field.$setDirty();
		});
	};
	
	$scope.sendResults = function() {
		$scope.checkEmails();
		// Send a POST request to the server to send the email
		var data = {
			email: $scope.email,
			email2: $scope.emailCheck,
			firstName: $scope.firstName,
			lastName: $scope.lastName,
			title: session_results.title,
			description: session_results.description
		};
		// Only send a quote if it's not undefined or empty
		if (session_results.quote) {
			data.quote = session_results.quote;
		}
		$http.post('/shareResults', data).then(function(response) {
			console.log(response);
		}, function(error) {
			console.log(error);
		});
		// Show the popup
		$scope.showPopup = true;
	};
	
    $scope.chooseQuiz = function() {
		$location.path('/chooseQuiz');
	};
    
    $scope.back = function() {
    	window.history.back();
	};
	
});
