angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('exerciseIndexController', function($scope, exerciseService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.exercises = exerciseService.all();

  $scope.toggleProjects = function() {
    $scope.sideMenuController.toggleLeft();
  };

})


// A simple controller that shows a tapped item's data
.controller('exerciseDetailController', function($scope, $stateParams, exerciseService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.exercise = exerciseService.get($stateParams.petId);

  $scope.toggleProjects = function() {
    $scope.sideMenuController.toggleLeft();
  };
});
