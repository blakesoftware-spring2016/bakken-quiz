app.controller('timeoutController', function($scope, $location, $timeout) {
	
	$scope.timeoutAfter = 2*1000;
	$scope.timer;
	$scope.timeoutAfter2nd = 6*1000;
	$scope.timer2nd;

	$scope.executeOnTimeout = function() {
		//$location.path('/touchBegin');
		if ($location.path() != '/touchBegin') {
			$scope.timeoutPopup = true;
			$scope.createTimer();
			$scope.createTimer2nd();
		}
	}
	
	$scope.createTimer = function() {
		$scope.timer = $timeout($scope.executeOnTimeout, $scope.timeoutAfter);
	}
	
	$scope.resetTimer = function() {
		$scope.$apply(function() {
			$scope.timeoutPopup = false;
		})

		$timeout.cancel($scope.timer);
		$scope.createTimer();
		$timeout.cancel($scope.timer2nd);
	}
	
	$scope.executeOnTimeout2nd = function() {
		$location.path('/touchBegin');
		$scope.$apply(function() {
			$scope.timeoutPopup = false;
		})
	}

	$scope.createTimer2nd = function() {
		$scope.timer2nd = $timeout($scope.executeOnTimeout2nd, $scope.timeoutAfter2nd);
	}



	$scope.createTimer();
	$scope.createTimer2nd();
	
	window.onmousemove = $scope.resetTimer;
	window.onkeydown = $scope.resetTimer;
	window.onclick = $scope.resetTimer;
	
});
