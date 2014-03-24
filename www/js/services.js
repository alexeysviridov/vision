angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('exerciseService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pets = [
    { id: 0, title: 'attention', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'concentration', description: 'Train your conentration skills.' },
    { id: 2, title: 'anticipation', description: 'Everyone likes turtles.' },
    { id: 3, title: 'imaginative reading', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];

  return {
    all: function() {
      return pets;
    },
    get: function(petId) {
      // Simple index lookup
      return pets[petId];
    }
  }
})

.factory('exerciseSettingsService', function () {
    function getSettings(exerciseId) {
        if (exerciseId === 0) {
            return { blinkSpeed: 10, wordLength: 5, maxBlinkSpeed: 400, minBlinkSpeed: 5, maxWordLength: 10, minWordLength: 3 };
        }
        return null;
    }
    return {
        getSettings: getSettings
    };
});
