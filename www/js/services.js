angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('exerciseService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pets = [
    { id: 0, title: 'attention', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'peripheral vision', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
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
            return { blinkSpeed: 400, wordLength: 5, maxBlinkSpeed: 600, minBlinkSpeed: 200, maxWordLength: 10, minWordLength: 3 };
        }
        return null;
    }
    return {
        getSettings: getSettings
    };
});
