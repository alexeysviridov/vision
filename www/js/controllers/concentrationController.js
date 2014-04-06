starterControllers

.controller('concentrationController', function ($scope) {
    $scope.startTheAppMessage = "Click to start the app";
    $scope.isStarted = false;

    $scope.onStartChanged = function () {
        if ($scope.isStarted) {
            $scope.startTheAppMessage = "app started";
            return;
        }
        $scope.startTheAppMessage = "Click to start the app";
    };
});