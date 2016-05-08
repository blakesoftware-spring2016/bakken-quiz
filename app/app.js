var app = angular.module('quizApp', ['ngRoute','ngAnimate']);

var session_results = {};
var session_answers = {};
var session_quiz = 0;

app.factory('quizData', function($http) {
	return $http.get('app/questions.json');
});

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
	
	$routeProvider.when('/question/:questionID', {
		templateUrl: 'app/templates/question.html',
		controller: 'questionController'
	});
	
	$routeProvider.when('/chooseQuiz', {
		templateUrl: 'app/templates/chooseQuiz.html',
		controller: 'chooseQuizController'
	});
	
	$routeProvider.when('/description', {
		templateUrl: 'app/templates/description.html',
		controller: 'descriptionController'
	});
	
	$routeProvider.when('/sentConfirmation', {
		templateUrl: 'app/templates/sentConfirmation.html',
		controller: 'sentConfirmationController'
	});
	
	$routeProvider.otherwise({
		redirectTo: '/touchBegin'
	});
	
}]);
