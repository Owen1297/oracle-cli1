function styledLog(message, style) {
    console.log(`%c${message}`, style);
}

var adjustmentCompleted = false;
var attempts = 0;

function adjustElements() {
    if (adjustmentCompleted) {
        console.log(
            "%cNow.GG Adjustment already completed. Stopping script.",
            "font-size: 15px; color: green;"
        );
        return true;
    }
    var roblox = document.getElementById("js-game-video");
    var controlBar = document.getElementById("ng-control-bar");
    if (roblox && controlBar) {
        roblox.style.top = "415px";
        controlBar.style.top = "91%";
        console.log(
            "%cSuccessfully adjusted Now.GG.",
            "font-size: 15px; color: yellow;"
        );
        adjust();
        return true;
    } else {
        console.log(
            "%cFailed to find elements (roblox or controlBar).",
            "font-size: 15px; color: red;"
        );
        return false;
    }
}

function CheckAndAdjust() {
    var intervalId = setInterval(function () {
        RunTopLogs();
        attempts++;
        if (adjustElements()) {
            clearInterval(intervalId);
        } else if (attempts >= 30) {
            console.log(
                "The script should be fine? if problems occur please run it again",
                "font-size: 15px; color: red;"
            );
            clearInterval(intervalId);
        }
    }, 5000);
}

function adjust() {
    setInterval(function () {
        var roblox = document.getElementById("js-game-video");
        var controlBar = document.getElementById("ng-control-bar");
        var customClassElement = document.querySelector(".sc-rUGft.hLgqJJ");
        if (roblox) {
            checkAndAdjustStyles(roblox, "top", ["415px"]);
        }
        if (controlBar) {
            checkAndAdjustStyles(controlBar, "top", ["91%"]);
        }
        if (customClassElement) {
            customClassElement.remove();
            console.log(
                '%cRemoved class "sc-rUGft hLgqJJ".',
                "font-size: 15px; color: green;"
            );
        }
    }, 3000);
}

function checkAndAdjustStyles(element, property, targetValues) {
    if (element) {
        var currentStyle = window.getComputedStyle(element)[property];
        if (!targetValues.includes(currentStyle)) {
            element.style[property] = targetValues[0];
            console.log(
                `%cAdjusted ${property} to ${targetValues[0]}.`,
                "font-size: 15px; color: green;"
            );
        }
    } else {
        console.log(
            "%cElement is null. Skipping check and adjustment.",
            "font-size: 15px; color: red;"
        );
    }
}

function RunTopLogs() {
    console.log(
        'succesfully patched nowgg'
    );
}

CheckAndAdjust();

console.log(
    "%cNow.GG Adjustment script started. Checking every 5 seconds.",
    "font-size: 15px; color: blue;"
);


document.getElementById('ng-control-bar').style.display = 'none';
document.getElementById('ng-control-bar').className = 'kaboom';
document.getElementById('ng-control-bar').style.zIndex = '-9010';
document.getElementById('ng-control-bar').style.background = 'transparent';


function replaceCDNImages(htmlString) {
    const regex = /https?:\/\/cdn\.now\.gg\/([\w\/.-]+)/g;
    const replacedHtml = '';

    return replacedHtml;
}

const replacedHtml = replaceCDNImages(document.body);