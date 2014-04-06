(function ($) {
    

    $.fn.imageClock = function (options) {
        var settings = $.extend({
            clockWidth: 200,
            clockHeight: 200,
            
            clockFaceImg: '',
            hourHandImg: '',
            minuteHandImg: '',
            secondHandImg: '',

            clockFaceHighResImg: '',
            hourHandHighResImg: '',
            minuteHandHighResImg: '',
            secondHandHighResImg: '',

            smoothRotation: false,
            useSecondHand: true,
            retina: false
        }, options);

        createWidget(this, settings);
        return this;
    }

    function createWidget(element, config) {
        var clockWidth;//width and height of the clock
        var clockHeight;
        var clockDiv;
        var secondHand;
        var minuteHand;
        var hourHand;
        var imgsLoaded = 0;

        var secondHandSpeed;
        var smoothRotation = false;
        var useSecondHand = true;
        var imagesToLoad = 4;
        var callInterval = 1000;
        var retina = false;

        (function (element, config) {
            clockDiv = element;
            clockWidth = config.clockWidth;
            clockHeight = config.clockHeight;
            secondHandSpeed = config.secondHandSpeed;

            if (config.useSecondHand == "false") {
                useSecondHand = false;
                imagesToLoad = 3;

            }


            if (config.smoothRotation == "true" && config.useSecondHand) {
                smoothRotation = true;
                callInterval = 50;
            }


            //set clock holder css
            clockDiv.css({ "height": clockHeight + "px", "width": clockWidth + "px", "position": "relative" });

            //add graphical elements 
            retina = window.devicePixelRatio > 1;//check if retina

            if (config.retina) {

                clockDiv.append("<img id='bg' src=" + config.clockFaceHighResImg + " height=" + clockHeight + " width=" + clockWidth + " />");
                clockDiv.append("<img id='hourHand' src=" + config.hourHandHighResImg + " />");
                clockDiv.append("<img id='minuteHand' src=" + config.minuteHandHighResImg + " />");
                if (useSecondHand) clockDiv.append("<img id='secondHand' src=" + config.secondHandHighResImg + " />");

            } else {

                clockDiv.append("<img id='bg' src=" + config.clockFaceImg + " /><img id='hourHand' src=" + config.hourHandImg + " /><img id='minuteHand' src=" + config.minuteHandImg + " />");
                if (useSecondHand) clockDiv.append("<img id='secondHand' src=" + config.secondHandImg + " />");

            }

            //define elements
            if (config.useSecondHand) secondHand = $("#secondHand");
            minuteHand = $("#minuteHand");
            hourHand = $("#hourHand");

            //check to see if the images are loaded
            $('#bg').load(function () { checkIfImagesLoaded(); });
            if (useSecondHand) secondHand.load(function () { checkIfImagesLoaded(); });
            minuteHand.load(function () { checkIfImagesLoaded(); });
            hourHand.load(function () { checkIfImagesLoaded(); });

            //set clock css
            var handIds = $("#" + config.divId + " #bg, #hourHand, #minuteHand, #secondHand");
            handIds.css({ "position": "absolute", "display": "none" });
            //handIds.css({"position":"absolute"});
            element.start = start;
            element.stop = stop;
            element.reset = reset;

            reset();
            rotateHands();
        }(element, config));

        function checkIfImagesLoaded() {
            imgsLoaded++;
            if (imgsLoaded == imagesToLoad) {//once all the images are loaded
                if (retina) {
                    if (useSecondHand) secondHand.css({ "height": secondHand.height() / 2, "width": secondHand.width() / 2 });
                    minuteHand.css({ "height": minuteHand.height() / 2, "width": minuteHand.width() / 2 });
                    hourHand.css({ "height": hourHand.height() / 2, "width": hourHand.width() / 2 });
                }

                if (useSecondHand) secondHand.css({ "left": (clockWidth - secondHand.width()) / 2 + "px", "top": (clockHeight - secondHand.height()) / 2 + "px" });//set x and y pos
                minuteHand.css({ "left": (clockWidth - minuteHand.width()) / 2 + "px", "top": (clockHeight - minuteHand.height()) / 2 + "px" });//set x and y pos
                hourHand.css({ "left": (clockWidth - hourHand.width()) / 2 + "px", "top": (clockHeight - hourHand.height()) / 2 + "px" });//set x and y pos		
                if (useSecondHand) setSecondStart();

                //clockDiv.fadeIn();//fade it in
                clockDiv.find('img').fadeIn();
                //minuteHand.css({"display":"none"});

                //call rotatehands function
            }

        }

        var intervalID;
        var currentDate;
        function start() {
            if (imgsLoaded == imagesToLoad) {
                intervalID = setInterval(function () {
                    rotateHands();
                    currentDate.setMilliseconds(currentDate.getMilliseconds() + callInterval);
                }, callInterval);//1000 = 1 second

                rotateHands();//make sure they start in the right position
            }
        }

        function stop() {
            clearInterval(intervalID);
        }
        function reset() {
            currentDate = new Date(2014, 1, 1, 0, 0, 0);
        }

        function setSecondStart() {
            var now = currentDate;
            var secondAngle = 6 * now.getSeconds();//turn the time into angle

            secondHand.rotate(secondAngle, 'abs');//set the hand angle
        }


        function rotateHands() {
            //get current time/date from local computer

            var now = currentDate;
            //set the second hand
            var secondAngle = 6 * now.getSeconds();//turn the time into angle
            if (useSecondHand) {

                if (smoothRotation) {
                    var smoothSecondAngle = now.getMilliseconds() / 1000 * 6 + secondAngle;
                    secondHand.rotate(smoothSecondAngle, 'abs');//set the hand angle
                } else {
                    if (secondAngle == 0) {
                        secondHand.rotate(-6, 'abs');//set the hand angle
                    }
                    secondHand.rotate({ animateTo: secondAngle, duration: secondHandSpeed }, 'abs');
                }
            }

            //set the minute hand

            var minuteAngle = 6 * now.getMinutes() + secondAngle / 60;//turn the time into angle

            minuteHand.rotate(minuteAngle, 'abs');//set the hand angle

            //set the hour hand
            var hourAngle = 360 / 12 * now.getHours();//turn the time into angle

            hourHand.rotate((hourAngle + minuteAngle / 12) % 360, 'abs');//set the hand angle

        }

    }

    
}(jQuery));


