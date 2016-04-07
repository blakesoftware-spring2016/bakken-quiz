var app = angular.module('quizApp', ['ngRoute', 'ngMessages']);

app.factory('quizData', function($http) {
	return $http.get('app/questions.json');
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
