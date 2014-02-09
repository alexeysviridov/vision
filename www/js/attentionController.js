angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('attentionController', function($scope, wordsService, $filter, $timeout) {
  // "Pets" is a service returning mock data (services.js)

$scope.startTheAppMessage = "Click to start the app";
$scope.isWordVisible = false;
$scope.isWordCorrect = false;
$scope.isWordIncorrect = false;

$scope.currentWord = "";
$scope.wordToCheck = "";

$scope.isStarted = false;


var _timeoutInMs = 100;
var _wordLength = 8;
var _delayBeforeBlink = 2000;

var _timer = null;
var _allWords = null;
var _usedWords = [];

$scope.onRetryButtonClick = function()
{
	$scope.wordToCheck = "";
	startBlink();
};

$scope.onStartChanged = function()
{
	if($scope.isStarted)
	{
		initialize();
		$scope.startTheAppMessage = "app started";
		iterate();
		return;
	}
    //$timeout.cancel( _timer );
	clearInterval(_timer);
	$scope.startTheAppMessage = "Click to start the app";
};

$scope.onCheckButtonClick = function()
{
	$scope.isWordCorrect = $scope.currentWord.toLowerCase() == $scope.wordToCheck.toLowerCase();
	$scope.isWordIncorrect = !$scope.isWordCorrect;
	
	if($scope.isWordCorrect)
	{
		iterate();
		return;
	}
};

function iterate()
{
	$scope.wordToCheck = "";
	$scope.currentWord = getNewWord();

	startBlink();
}

function startBlink()
{
    _timer = setInterval(blinkCurrentWord, _delayBeforeBlink);
}

function getNewWord()
{
	var i = getNewIndex();
	while(hasIdexBeenUsed(i))
		i = getNewIndex();

	markIndexAsUsed(i);

	return _allWords[i].text;
}

function markIndexAsUsed(index)
{
	_usedWords.push(index);
}

function hasIdexBeenUsed(index)
{
	for (var i = 0; i < _usedWords.length; i++) {
        if (_usedWords[i] === index) {
            return true;
        }
    }
    return false;
}

function getNewIndex()
{
	return Math.floor(Math.random()*_allWords.length);
}

function blinkCurrentWord()
{
    $scope.isWordVisible = true;
    try {
        $scope.$apply();
    }
    catch (e) {};
	$timeout(function () {
	    $scope.isWordVisible = false;
	}, _timeoutInMs);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function initialize()
{
	_allWords = wordsService.getByLength(_wordLength);
}

 $scope.testText = "attention controller";
 var words = wordsService.all();
 $scope.firstWord = wordsService.getByLength(5)[0].text;
})