starterControllers


// A simple controller that fetches a list of data from a service
.controller('peripheralVisionController', function ($scope, wordsService, $filter, $timeout) {
   

    $scope.startTheAppMessage = "Click to start the app";
    $scope.isWordVisible = false;
    $scope.isWordCorrect = true;
    $scope.isWordIncorrect = false;

    $scope.currentWord1 = "";
    $scope.currentWord2 = "";
    $scope.wordToCheck = "";

    $scope.isStarted = false;

    var _timeoutInMs = 100;
    var _delayBeforeBlink = 2000;
    var _wordLength = [3, 4];

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
        $scope.isWordCorrect = ($scope.currentWord1.toLowerCase() + " " + $scope.currentWord2.toLowerCase())== $scope.wordToCheck.toLowerCase();
        $scope.isWordIncorrect = !$scope.isWordCorrect;

        if ($scope.isWordCorrect) {
            iterate();
            return;
        }
    };

    function iterate() {
        $scope.wordToCheck = "";
        $scope.currentWord1 = getNewWord();
        $scope.currentWord2 = getNewWord();

        startBlink();
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
        _timeoutInMs = 100;//$scope.settings.blinkSpeed;
        _wordLength = [3,4];//$scope.settings.wordLength;
        _allWords = wordsService.getByLength(_wordLength[0]);
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