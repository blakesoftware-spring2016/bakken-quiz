app.controller('timeoutController', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {

	$scope.timeoutAfter = 3600000;
	$scope.timer;

	$scope.executeOnTimeout = function() {
		$location.path('/touchBegin');
		$scope.makeTimer();
	}

	$scope.makeTimer = function() {
		timer = $timeout($scope.executeOnTimeout, $scope.timeoutAfter);
	}

	$scope.resetTimer = function() {
		$timeout.cancel(timer);
		$scope.makeTimer();
	}

	$scope.makeTimer();

	window.onmousemove = $scope.resetTimer;
	window.onkeydown = $scope.resetTimer;
	window.onclick = $scope.resetTimer;

}]);
