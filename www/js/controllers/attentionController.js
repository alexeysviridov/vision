starterControllers


// A simple controller that fetches a list of data from a service
.controller('attentionController', function($scope, wordsService, $filter, $timeout) {
    // "Pets" is a service returning mock data (services.js)

    var rightSideMenuScope = new (function (settingsChangedCallback) {
        var scope =  {
            exercise: $scope.exercise,
            settings: createSettingsCopy($scope.settings),
            cancelSettings: function () {
                setScopeValues($scope.settings);
                $scope.sideMenuController.close();
            },
            applySettings: function () {
                setSettingsValues(scope.settings);
                $scope.sideMenuController.close();
                settingsChangedCallback();
            }
        }
        function createSettingsCopy(settings) {
            return { maxBlinkSpeed: settings.maxBlinkSpeed, minBlinkSpeed: settings.minBlinkSpeed, maxWordLength: settings.maxWordLength, minWordLength: settings.minWordLength };
        }

        function setScopeValues(settings) {
            scope.settings.blinkSpeed = settings.blinkSpeed;
            scope.settings.wordLength = settings.wordLength;
        }

        function setSettingsValues(settings) {
            $scope.settings.blinkSpeed = parseInt(settings.blinkSpeed);
            $scope.settings.wordLength = parseInt(settings.wordLength);
        }

        $timeout(function () {
            setScopeValues($scope.settings);
        }, 100);
        return scope;
    })(initialize);
    
    $scope.sideMenuSettings.rightSideMenuTemplateUrl = 'templates/exercise-settings/0-settings.html';
    $scope.sideMenuSettings.rightSideMenuScope = rightSideMenuScope;

   

    
    $scope.sideMenuController.left.isEnabled = false;
    $scope.sideMenuController.right.isEnabled = true;

    $scope.startTheAppMessage = "Click to start the app";
    $scope.isWordVisible = false;
    $scope.isWordCorrect = false;
    $scope.isWordIncorrect = false;

    $scope.currentWord = "";
    $scope.wordToCheck = "";

    $scope.isStarted = false;

    var _timeoutInMs = 100;
    var _wordLength = 4;
    var _delayBeforeBlink = 2000;
    var _isStarted = false;

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
        _timeoutInMs = $scope.settings.blinkSpeed;
        _wordLength = $scope.settings.wordLength;
	    _allWords = wordsService.getByLength(_wordLength);
    }

     $scope.testText = "attention controller";
     var words = wordsService.all();
     $scope.firstWord = wordsService.getByLength(5)[0].text;
    
     $scope.$on('$destroy', function () {
         $scope.sideMenuSettings.clean();
         $scope.sideMenuController.left.isEnabled = false;
         $scope.sideMenuController.right.isEnabled = false;
     });
})