app.controller('timeoutController', function($scope, $location, $timeout) {
	
	$scope.timeoutAfter = 360000;
	$scope.timer;
	
	$scope.executeOnTimeout = function() {
		$location.path('/touchBegin');
		$scope.createTimer();
	}
	
	$scope.createTimer = function() {
		timer = $timeout($scope.executeOnTimeout, $scope.timeoutAfter);
	}
	
	$scope.resetTimer = function() {
		$timeout.cancel(timer);
		$scope.createTimer();
	}
	
	$scope.createTimer();
	
	window.onmousemove = $scope.resetTimer;
	window.onkeydown = $scope.resetTimer;
	window.onclick = $scope.resetTimer;
	
});
