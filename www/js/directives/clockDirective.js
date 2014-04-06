starterDirectives

.directive('clock', function () {
    return {
        restrict: 'E',
        scope: {
            isStarted: '='
        },
        template: '<div id="analog-clock"></div>',
        link: function (scope, element, attrs, controller) {
            var config = {

                /*the name of the div containing the clock*/
                divId: "analog-clock",

                /*set to false if you don't want to use the second hand*/
                useSecondHand: "true",

                /*width and height of the clock*/
                clockWidth: "390",
                clockHeight: "560",

                /*location of the images*/
                clockFaceImg: "img/clockBg.png",
                hourHandImg: "img/hourHand.png",
                minuteHandImg: "img/minuteHand.png",
                secondHandImg: "img/secondHand.png",
                /*location of the high res images for retina display*/
                //clockFaceHighResImg: "images/clockBgHighRes.png",
                //hourHandHighResImg: "images/hourHandHighRes.png",
                //minuteHandHighResImg: "images/minuteHandHighRes.png",
                //secondHandHighResImg: "images/secondHandHighRes.png",

                /*Set true to make hand move at steady speed*/
                smoothRotation: "true",

                /*speed of the second hand. Lower is faster. */
                /*Must be under 1000. */
                /*If smooth rotation is true, this does nothing.*/
                secondHandSpeed: "100"

            };

            var clocks = $(element).find('#analog-clock').imageClock(config);
            //var myAnalogClock = new AnalogClock(config);

            scope.$watch('isStarted', function (newVal, oldVal) {
                if (newVal) {
                    clocks.reset();
                    clocks.start();
                } else {
                    clocks.stop();
                }
            });
        }
    };
})