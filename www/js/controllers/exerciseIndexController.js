starterControllers
// A simple controller that fetches a list of data from a service
.controller('exerciseIndexController', function ($scope, exerciseService) {
    $scope.sideMenuController.right.isEnabled = false;
    $scope.sideMenuController.left.isEnabled = false;
    $scope.exercises = exerciseService.all();

    $scope.toggleProjects = function () {
        $scope.sideMenuController.toggleLeft();
    };

});