angular.module('starter.controllers', [])

.controller('appController', function ($scope) {
    $scope.parameters = {
        leftSideMenu: ''
    };
})

// A simple controller that fetches a list of data from a service
.controller('exerciseIndexController', function($scope, exerciseService) {
    // "Pets" is a service returning mock data (services.js)
  $scope.exercises = exerciseService.all();

  $scope.toggleProjects = function() {
    $scope.sideMenuController.toggleLeft();
  };

})


// A simple controller that shows a tapped item's data
.controller('exerciseDetailController', function ($scope, $stateParams, exerciseService, exerciseSettingsService, $ionicModal) {
  // "Pets" is a service returning mock data (services.js)
    $scope.exercise = exerciseService.get($stateParams.petId);
    $scope.settings = exerciseSettingsService.getSettings($scope.exercise.id);

    $scope.toggleProjects = function() {
        $scope.sideMenuController.toggleLeft();
    };

    //---- Settings ----
    function settingsInit() {
        $scope.rightButtons = [
        { 
            type: 'button-clear',
            content: 'Settings',
            tap: function(e) {
                $scope.openModal();
            }
        }];

        function getSettingPath() {
            return 'templates\\exercise-settings\\' + $scope.exercise.id + '-settings.html';
        }

        $ionicModal.fromTemplateUrl(getSettingPath(),
            function (modal) {
                $scope.modal = modal;
            },
            {
                scope: $scope,
                // The animation we want to use for the modal entrance
                animation: 'slide-in-up'
            });

        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
    }

    if ($scope.settings) {
        settingsInit();
    }
    //------------------
});
