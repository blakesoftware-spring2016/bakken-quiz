app.controller("shareResultsController", ['$scope','$location', 'quizData','$uibModal', function($scope, $location, quizData, $uibModal) {

	$scope.checkEmails = function() {

		if ($scope.shareResultsForm.$valid) {
			var modalInstance = $uibModal.open({
	            animation: true,
	            templateUrl: 'app/templates/popupContent.html',
	            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
					$scope.popupTitle = "Are you sure you want to quit?";
					$scope.confirm = "Yes";
					$scope.back = "No";

					$scope.dismiss = function(value) {
        				$uibModalInstance.close(value);
					};
				}],
	            size: 'lg'
	        });

	        modalInstance.result.then(function(dismissVal) {
				if(dismissVal === "Yes") {
					for(var property in session_answers) {
						delete session_answers[property];
					};
				};
	        });
			// $location.path('/sentConfirmation');
  		}

  		angular.forEach($scope.shareResultsForm.$error.required, function(field) {
    		field.$setDirty();
		});

	};

    $scope.open = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/templates/popupContent.html',
            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
				$scope.popupTitle = "Are you sure you want to quit?";
				$scope.confirm = "Yes";
				$scope.back = "No";

				$scope.dismiss = function(value) {
        			$uibModalInstance.close(value);
				};
			}],
            size: 'lg'
        });

        modalInstance.result.then(function(dismissVal) {
            if(dismissVal === "Yes") {
				for(var property in session_answers) {
					delete session_answers[property];
				};
			};
        });

    };

}]);
