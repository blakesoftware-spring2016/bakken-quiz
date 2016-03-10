var app=angular.module("quizApp", ['ngRoute']);

app.factory('quizData', function() {
	var data=$http.get('questions.json');
	return data;
});


app.config(['$routeProvider', function($routeProvider) {  
	
	$routeProvider.when('/touchToBegin', {                                          
		templateUrl: 'touchToBegin/touchToBeginTemplate.html',        
		controller: "touchToBeginController"
	});
	
	$routeProvider.when('/shareResults', {                                          
		templateUrl: 'shareResults/shareResultsTemplate.html',        
		controller: "shareResultsController"
	});
	
	$routeProvider.when('/results', {                                          
		templateUrl: 'results/resultsTemplate.html',        
		controller: "resultsController"
	});
	
	$routeProvider.when('/question', {                                          
		templateUrl: 'question/questionTemplate.html',        
		controller: "questionController"
	});
	
	$routeProvider.when('/privacy', {                                          
		templateUrl: 'privacy/privacyTemplate.html',        
		controller: "privacyController"
	});
	
	$routeProvider.when('/chooseQuiz', {                                          
		templateUrl: 'chooseQuiz/chooseQuizTemplate.html',        
		controller: "chooseQuizController"
	});
	
	$routeProvider.when('/other-page', {          
		templateUrl: 'templates/other-page-template.html'  
	});
	
	$routeProvider.when('/quitPage', {                                          
		templateUrl: 'quitPage/quitPage.html',        
		controller: "quitPageController"
	});
	
	$routeProvider.when('/quizDescriptions', {                                          
		templateUrl: 'quizDescriptions/quizDescriptionTemplate.html',        
		controller: "quizDescriptionController"
	});
	
		$routeProvider.when('/sentConfirmation', {                                          
		templateUrl: 'sentConfirmation/sentConfirmationTemplate.html',        
		controller: "sentConfirmationController"
	});
	
	$routeProvider.otherwise({
		redirectTo: '/touchToBegin'
	});
	
}]);