app.controller('popupControllerSent', ['$scope, $uibModalInstance', function($scope, $uibModalInstance) {

	$scope.dismiss = function(value) {
        $uibModalInstance.close(value);
    };

}]);
