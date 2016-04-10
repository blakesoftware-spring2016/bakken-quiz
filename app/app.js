var app = angular.module('quizApp', ['ngRoute']);

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


app.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider.when('/touchBegin', {
		templateUrl: 'app/touchBegin/touchBeginTemplate.html',
		controller: 'touchBeginController'
	});
	
	$routeProvider.when('/shareResults', {
		templateUrl: 'app/shareResults/shareResultsTemplate.html',
		controller: 'shareResultsController'
	});
	
	$routeProvider.when('/results', {
		templateUrl: 'app/results/resultsTemplate.html',
		controller: 'resultsController'
	});
	
	$routeProvider.when('/question/:questionNum', {
		templateUrl: 'app/question/questionTemplate.html',
		controller: 'questionController'
	});
	
	$routeProvider.when('/privacy', {
		templateUrl: 'app/privacy/privacyTemplate.html',
		controller: 'privacyController'
	});
	
	$routeProvider.when('/chooseQuiz', {
		templateUrl: 'app/chooseQuiz/chooseQuizTemplate.html',
		controller: 'chooseQuizController'
	});
	
	$routeProvider.when('/quitPage', {
		templateUrl: 'app/quitPage/quitPageTemplate.html',
		controller: 'quitPageController'
	});
	
	$routeProvider.when('/quizDescriptions', {
		templateUrl: 'app/quizDescriptions/quizDescriptionTemplate.html',
		controller: 'quizDescriptionController'
	});
	
	$routeProvider.when('/sentConfirmation', {
		templateUrl: 'app/sentConfirmation/sentConfirmationTemplate.html',
		controller: 'sentConfirmationController'
	});
	
	$routeProvider.otherwise({
		redirectTo: '/touchBegin'
	});
	
}]);
