starterControllers


// A simple controller that fetches a list of data from a service
.controller('anticipationController', function ($scope, wordsService, $filter, $timeout) {
   

    $scope.startTheAppMessage = "Click to start the app";
    $scope.isWordVisible = false;
    $scope.isWordCorrect = true;
    $scope.isWordIncorrect = false;

    $scope.currentWord = "";
    $scope.wordToCheck = "";

    $scope.isStarted = false;

    var _currentWord = "";
    var _timeoutInMs = 100;
    var _delayBeforeBlink = 2000;
    var _wordLength = 4;
    var _position = 'start'; //'start', 'middle', 'end'
    var _isStarted = false;

    var _timerBeforeBlink = null;
    var _allWords = null;
    var _usedWords = [];

    $scope.onRetryButtonClick = function () {
        $scope.wordToCheck = "";
        startBlink();
        $scope.isWordCorrect =true;
        $scope.isWordIncorrect = !$scope.isWordCorrect;
    };

    $scope.onStartChanged = function () {
        if ($scope.isStarted) {
            initialize();
            $scope.startTheAppMessage = "app started";
            iterate();
            return;
        }
        $scope.startTheAppMessage = "Click to start the app";
    };

    $scope.onCheckButtonClick = function () {
        $scope.isWordCorrect = _currentWord.toLowerCase()== $scope.wordToCheck.toLowerCase();
        $scope.isWordIncorrect = !$scope.isWordCorrect;

        if ($scope.isWordCorrect) {
            iterate();
            return;
        }
    };

    function iterate() {
        $scope.wordToCheck = "";
        _currentWord = getNewWord();
         
        $scope.currentWord = '';
        var coefficient = getAnticipationCoefficient();
        for (var i = 0; i < coefficient; i++) {
            $scope.currentWord+='. ';
        };
        $scope.currentWord += _currentWord.substring(coefficient,_wordLength);

        startBlink();
    }

function getAnticipationCoefficient() {
    if(_wordLength < 5)
        return 1;
    if(wordLength < 7)
        return 2;
    if(_wordLength < 10)
        return 3;
    
    if(_wordLength < 15)
        return 4;

    return 5;
}

    function startBlink() {
        if (!$scope.isStarted) {
            return;
        }
        _timerBeforeBlink = setTimeout(blinkCurrentWord, _delayBeforeBlink);
    }

    function getNewWord() {
        var i = getNewIndex();
        while (hasIndexBeenUsed(i))
            i = getNewIndex();

        markIndexAsUsed(i);

        return _allWords[i].text;
    }

    function markIndexAsUsed(index) {
        _usedWords.push(index);
    }

    function hasIndexBeenUsed(index) {
        for (var i = 0; i < _usedWords.length; i++) {
            if (_usedWords[i] === index) {
                return true;
            }
        }
        return false;
    }

    function getNewIndex() {
        return Math.floor(Math.random() * _allWords.length);
    }

    function blinkCurrentWord() {
        $scope.isWordVisible = true;
        try {
            $scope.$apply();
        }
        catch (e) { };
        $timeout(function () {
            $scope.isWordVisible = false;
        }, _timeoutInMs);
    }

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    function initialize() {
        _timeoutInMs = 33;//$scope.settings.blinkSpeed;
        _wordLength = 4;//$scope.settings.wordLength;
        _allWords = wordsService.getByLength(_wordLength);
    }

    $scope.testText = "attention controller";
    var words = wordsService.all();
    $scope.firstWord = wordsService.getByLength(5)[0].text;

    $scope.$on('$destroy', function () {
        $scope.sideMenuSettings.clean();
        $scope.sideMenuController.left.isEnabled = false;
        $scope.sideMenuController.right.isEnabled = false;
        $scope.rightButtons = [];
        $scope.leftButtons = [];
    });
})