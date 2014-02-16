var starterControllers = angular.module('starter.controllers', [])

.controller('appController', function ($scope) {
    $scope.sideMenuSettings = {
        leftSideMenuTemplateUrl: '',
        rightSideMenuTemplateUrl: '',
        rightSideMenuScope: undefined,
        leftSideMenuScope: undefined,
        clean: function () {
            this.leftSideMenuTemplateUrl = '';
            this.rightSideMenuTemplateUrl = '';
            this.rightSideMenuScope = undefined;
            this.leftSideMenuScope = undefined;
        }
    };

});
