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
	
	$routeProvider.otherwise({
		redirectTo: '/touchBegin'
	});
	
}]);

// TODO : Uncomment this in production. This is how we should be loading the images
// Workaround for GitHub Pages implemented below

// app.run(['$http', function($http) {

// 	$http.get('/preloadImages').then(function(response) {
// 		var imageUrls = response.data;
// 		imageUrls.forEach(function(imageUrl) {
// 			$http.get(imageUrl);
// 		})
// 	});

// }]);


// TODO: Remove this from production code. This is a temporary workaround
// since we can't hit a live URL coming from the node server on GitHub Pages
app.run(['$http', function($http) {

	var imageUrls = [ 'assets/images/ChooseQuiz.png',
  'assets/images/bluebackground.png',
  'assets/images/greybackground.png',
  'assets/images/leftBracket.png',
  'assets/images/maryDescription.png',
  'assets/images/maryQuestion.png',
  'assets/images/maryShareResultsBackground.png',
  'assets/images/questionScreen.jpg',
  'assets/images/resultsMary.png',
  'assets/images/resultsRomantic.png',
  'assets/images/rightBracket.png',
  'assets/images/romQuestion.png',
  'assets/images/romantic/11friends.jpg',
  'assets/images/romantic/11journal.jpg',
  'assets/images/romantic/1city.jpg',
  'assets/images/romantic/1country.jpg',
  'assets/images/romantic/2earlyBird.jpg',
  'assets/images/romantic/2nightOwl.jpg',
  'assets/images/romantic/3clean.jpg',
  'assets/images/romantic/3dirty.jpg',
  'assets/images/romantic/4fact.jpg',
  'assets/images/romantic/4truth.jpg',
  'assets/images/romantic/6career.jpg',
  'assets/images/romantic/6passion.jpg',
  'assets/images/romanticDescription.png',
  'assets/images/romanticResults.png',
  'assets/images/romanticShareResultsBackground.png',
  'assets/images/summary.png',
  'assets/images/touchBegin.png',
  'assets/images/touchToBeginImages/blueTouchBeginBlock1.png',
  'assets/images/touchToBeginImages/blueTouchBeginBlock2.png',
  'assets/images/touchToBeginImages/blueTouchBeginBlock3.png',
  'assets/images/touchToBeginImages/blueTouchBeginBlock4.png',
  'assets/images/touchToBeginImages/greyTouchBeginBlock1.png',
  'assets/images/touchToBeginImages/greyTouchBeginBlock2.png',
  'assets/images/touchToBeginImages/greyTouchBeginBlock3.png',
  'assets/images/touchToBeginImages/greyTouchBeginBlock4.png',
  'assets/images/whichMary/11balanced.jpg',
  'assets/images/whichMary/11busy.jpg',
  'assets/images/whichMary/11create.jpg',
  'assets/images/whichMary/11fusion.jpg',
  'assets/images/whichMary/11weird.jpg',
  'assets/images/whichMary/2antarctica.jpg',
  'assets/images/whichMary/2camping.jpg',
  'assets/images/whichMary/2disney.jpg',
  'assets/images/whichMary/2louvre.jpg',
  'assets/images/whichMary/2rome.jpg',
  'assets/images/whichMary/3classical.jpg',
  'assets/images/whichMary/3film.jpg',
  'assets/images/whichMary/3folk.jpg',
  'assets/images/whichMary/3inspires.jpg',
  'assets/images/whichMary/3myOwn.jpg',
  'assets/images/whichMary/3punk.jpg',
  'assets/images/whichMary/4art.jpg',
  'assets/images/whichMary/4boat.jpg',
  'assets/images/whichMary/4book.jpg',
  'assets/images/whichMary/4hammock.jpg',
  'assets/images/whichMary/4pet.jpg',
  'assets/images/whichMary/8antique.jpg',
  'assets/images/whichMary/8efficient.jpg',
  'assets/images/whichMary/8family.jpg',
  'assets/images/whichMary/8fast.jpg',
  'assets/images/whichMary/8flying.jpg',
  'assets/images/whichMary/8motorcycle.jpg' ];

	imageUrls.forEach(function(imageUrl) {
		$http.get(imageUrl);
	});

}]);

