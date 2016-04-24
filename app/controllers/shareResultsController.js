app.controller("shareResultsController", ['$scope','$location', 'quizData','$uibModal', function($scope, $location, quizData, $uibModal) {

	$scope.checkEmails = function() {

		if ($scope.shareResultsForm.$valid) {
			var modalInstance = $uibModal.open({
	            animation: true,
	            templateUrl: 'app/templates/popupContentSent.html',
	            controller: 'popupControllerSent',
	            size: 'lg'
	        });
	        modalInstance.result.then(function(selectedItem) {
	            $scope.selected = selectedItem;
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
            controller: 'popupController',
            size: 'lg'
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        });

    };

}]);
