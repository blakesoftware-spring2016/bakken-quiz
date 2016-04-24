app.controller('popupControllerAge', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {

	$scope.dismiss = function(value) {
        $uibModalInstance.close(value);
    };

}]);
