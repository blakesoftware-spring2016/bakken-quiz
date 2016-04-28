var app = angular.module('quizApp', ['ngRoute','ngAnimate', 'ui.bootstrap']);

app.factory('quizData', function($http) {
	return $http.get('app/questions.json');
});

var session_answers = {};

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
	
	$routeProvider.when('/chooseQuiz', {
		templateUrl: 'app/templates/chooseQuiz.html'
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
