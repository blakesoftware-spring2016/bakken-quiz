app.controller('popupController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {

	$scope.dismiss = function(value) {
        $uibModalInstance.close(value);
    };

}]);
