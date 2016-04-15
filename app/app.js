var app = angular.module('quizApp', ['ngRoute']);

app.factory('quizData', function($http) {
	return $http.get('app/questions.json');
});

var session_answers = [];
var session_quiz;

app.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider.when('/touchBegin', {
		templateUrl: 'app/templates/touchBegin.html',
		controller: 'touchBeginController'
	});
	
	$routeProvider.when('/shareResults', {
		templateUrl: 'app/templates/shareResults.html',
		controller: 'shareResultsController'
	});
	
	$routeProvider.when('/results/:quizID', {
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
	
	$routeProvider.when('/quitPage/:quizID', {
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
