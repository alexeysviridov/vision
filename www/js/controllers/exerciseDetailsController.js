starterControllers
// A simple controller that shows a tapped item's data
.controller('exerciseDetailsController', function ($scope, $stateParams, exerciseService, exerciseSettingsService, $ionicModal) {
    // "Pets" is a service returning mock data (services.js)
    $scope.exercise = exerciseService.get($stateParams.petId);
    $scope.settings = exerciseSettingsService.getSettings($scope.exercise.id);

    $scope.exercisePath = 'templates/exercises/' + $stateParams.petId + '.html'

    $scope.rightButtons = [];
    $scope.leftButtons = [];
});