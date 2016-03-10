var app=angular.module("quizApp", ['ngRoute']);

app.factory('quizData', function() {
	var data=$http.get('questions.json');
	return data;
});


app.config(['$routeProvider', function($routeProvider) {  
	
	$routeProvider.when('/touchToBegin', {                                          
		templateUrl: 'app/touchToBegin/touchToBeginTemplate.html',        
		controller: "touchToBeginController"
	});
	
	$routeProvider.when('/shareResults', {                                          
		templateUrl: 'app/shareResults/shareResultsTemplate.html',        
		controller: "shareResultsController"
	});
	
	$routeProvider.when('/results', {                                          
		templateUrl: 'app/results/resultsTemplate.html',        
		controller: "resultsController"
	});
	
	$routeProvider.when('/question/:question-num', {                                          
		templateUrl: 'app/question/questionTemplate.html',        
		controller: "questionController"
	});
	
	$routeProvider.when('/privacy', {                                          
		templateUrl: 'app/privacy/privacyTemplate.html',        
		controller: "privacyController"
	});
	
	$routeProvider.when('/chooseQuiz', {                                          
		templateUrl: 'app/chooseQuiz/chooseQuizTemplate.html',        
		controller: "chooseQuizController"
	});
	
	$routeProvider.when('/other-page', {          
		templateUrl: 'app/templates/other-page-template.html'  
	});
	
	$routeProvider.when('/quitPage', {                                          
		templateUrl: 'app/quitPage/quitPage.html',        
		controller: "quitPageController"
	});
	
	$routeProvider.when('/quizDescriptions', {                                          
		templateUrl: 'app/quizDescriptions/quizDescriptionTemplate.html',        
		controller: "quizDescriptionController"
	});
	
	$routeProvider.when('/sentConfirmation', {                                          
		templateUrl: 'app/sentConfirmation/sentConfirmationTemplate.html',        
		controller: "sentConfirmationController"
	});
	
	$routeProvider.otherwise({
		redirectTo: 'app/touchBegin/touchBeginTemplate.html'
	});
	
}]);

app.controller('questionController',['$routeParams', function($routeParams) {  
	
	console.log($routeParams.question-num);
	
}]);