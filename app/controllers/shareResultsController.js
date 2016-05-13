app.controller('shareResultsController', function($scope, $location, quizData, $http) {
	
	$scope.submitted = false;
	
	$scope.checkEmails = function() {
		$scope.emailsMatch = ($scope.email === $scope.emailCheck) ? true : false;
	};
	
	$scope.send = function() {
		$scope.submitted = true;
		// Verify the form is valid before sending
		if ($scope.shareResultsForm.$valid && $scope.emailsMatch) {
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
		}
	};
    
    $scope.back = function(event) {
		$location.path('/results');
	};
	
	$scope.chooseQuiz = function() {
		$location.path('/chooseQuiz');
	};
	
});
