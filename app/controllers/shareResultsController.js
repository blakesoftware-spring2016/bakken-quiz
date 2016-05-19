app.controller('shareResultsController', function($scope, $location, quizData, $http) {
	
    $scope.isRomantic = session_quiz;
	$scope.isMary = !($scope.isRomantic);
    
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
				title: session_results.title,
				description: session_results.description
			};
			$http.post('/shareResults', data).then(function(response) {
				console.log(response);
			}, function(error) {
				console.log(error);
			});
			// Before showing the popup (but after the request is sent), clear form data
			// to solve an issue where a user could close the popup and click send repeatedly to spam email
			$scope.email = '';
			$scope.emailCheck = '';
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
