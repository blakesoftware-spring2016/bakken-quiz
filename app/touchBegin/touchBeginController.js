app.controller("touchBeginController", ['$scope','$location', function($scope, $location) {
  $scope.buttonClick = function() {
      $location.path('/question');
    };
    
}]);