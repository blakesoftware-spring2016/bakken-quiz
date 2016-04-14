var app = angular.module('quizApp', ['ngRoute','ngAnimate', 'ui.bootstrap']);

app.factory('quizData', function($http) {
	return $http.get('app/questions.json');
});

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

app.directive('valueMatches', ['$parse', function ($parse) {
    return {
      require: 'ngModel',
        link: function (scope, elm, attrs, ngModel) {
          var originalModel = $parse(attrs.valueMatches),
              secondModel = $parse(attrs.ngModel);
          // Watch for changes to this input
          scope.$watch(attrs.ngModel, function (newValue) {
            ngModel.$setValidity(attrs.name, newValue === originalModel(scope));
          });
          // Watch for changes to the value-matches model's value
          scope.$watch(attrs.valueMatches, function (newValue) {
            ngModel.$setValidity(attrs.name, newValue === secondModel(scope));
          });
        }
    };
}]);


app.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider.when('/touchBegin', {
		templateUrl: 'app/templates/touchBegin.html',
		controller: 'touchBeginController'
	});
	
	$routeProvider.when('/shareResults', {
		templateUrl: 'app/templates/shareResults.html',
		controller: 'shareResultsController'
	});
	
	$routeProvider.when('/results', {
		templateUrl: 'app/templates/results.html',
		controller: 'resultsController'
	});
	
	$routeProvider.when('/question/:quizID/:questionID', {
		templateUrl: 'app/templates/question.html',
		controller: 'questionController'
	});
	
	$routeProvider.when('/privacy', {
		templateUrl: 'app/templates/privacy.html',
		controller: 'privacyController'
	});
	
	$routeProvider.when('/chooseQuiz', {
		templateUrl: 'app/templates/chooseQuiz.html',
		controller: 'chooseQuizController'
	});
	
	$routeProvider.when('/quitPage', {
		templateUrl: 'app/templates/quitPage.html',
		controller: 'quitPageController'
	});
	
	$routeProvider.when('/quizDescription/:quizID', {
		templateUrl: 'app/templates/quizDescription.html',
		controller: 'quizDescriptionController'
	});
	
	$routeProvider.when('/sentConfirmation', {
		templateUrl: 'app/templates/sentConfirmation.html',
		controller: 'sentConfirmationController'
	});
	
	$routeProvider.otherwise({
		redirectTo: '/touchBegin'
	});
	
}]);
