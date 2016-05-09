app.controller('touchBeginController', function($scope, $location) {

	$scope.next = function() {
		$location.path('/chooseQuiz');
	};

});
