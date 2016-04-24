app.directive('overwriteEmail', function() {
	var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
	return {
		require: '?ngModel',
		link: function(scope, elm, attrs, ctrl) {
			if (ctrl && ctrl.$validators.email) {
				ctrl.$validators.email = function(modelValue) {
					return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
				};
			}
		}
	};
});

app.directive('valueMatches', ['$parse', function($parse) {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ngModel) {
			var originalModel = $parse(attrs.valueMatches);
			secondModel = $parse(attrs.ngModel);
			// Watch for changes to this input
			scope.$watch(attrs.ngModel, function(newValue) {
				ngModel.$setValidity(attrs.name, newValue === originalModel(scope));
			});
			// Watch for changes to the value-matches model's value
			scope.$watch(attrs.valueMatches, function(newValue) {
				ngModel.$setValidity(attrs.name, newValue === secondModel(scope));
			});
		}
	};
}]);

app.directive('progressBar', function() {
    function link(scope, element, attrs) {
        console.log("its working");
        //createDivs(12);
        
    }
    return {
        templateUrl: 'app/templates/progressBar.html',
        link: link
    };
});
