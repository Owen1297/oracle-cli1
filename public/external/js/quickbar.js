var overlay = document.createElement('div');
overlay.id = 'overlay';
overlay.style.display = 'none';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
overlay.style.zIndex = '9999';
document.body.appendChild(overlay);

var powerOffButton = document.getElementById('PowerOff');
var darkenInterval; 

function darkenOverlay() {
    var opacity = parseFloat(overlay.style.backgroundColor.slice(14, -1));
    if (isNaN(opacity)) opacity = 0; 
    opacity += 0.01;
    overlay.style.backgroundColor = 'rgba(0, 0, 0, ' + opacity + ')'; 
    if (opacity >= 1) {
        clearInterval(darkenInterval);
        window.location.href = 'https://classroom.google.com/';
    }
}

powerOffButton.onclick = function () {
    powerOffButton.textContent = 'Powering off the Browser...';
    overlay.style.display = 'block';
    darkenInterval = setInterval(darkenOverlay, 20);
};


document.getElementById('FS').onclick = function () {
    const TabID = tabManager.getVisTabID();
    const iframe = document.getElementById('Tab' + TabID + '_iframe')

    iframe.requestFullscreen();
}

document.getElementById('nowgg-fix').onclick = function () {
    fetch('external/js/nowgg-patcher.js')
        .then(response => response.text())
        .then(scriptContent => {
            const TabID = tabManager.getVisTabID();
            const iframeDocument = document.getElementById('Tab' + TabID + '_iframe').contentDocument;
            const Script = iframeDocument.createElement('script');
            Script.textContent = scriptContent;
            iframeDocument.body.appendChild(Script);
        })
        .catch(error => console.error('Error fetching script:', error));
};



var quickAccessBar = document.getElementById('quick-access-bar');
var originalMarginLeft = window.getComputedStyle(quickAccessBar).getPropertyValue('margin-left');

document.getElementById('hidebar').onclick = function () {
    quickAccessBar.style.marginLeft = -parseInt(window.getComputedStyle(quickAccessBar).getPropertyValue('width')) + "px";
}

document.getElementById('sidebar').onclick = function () {
    quickAccessBar.style.marginLeft = originalMarginLeft;
    quickAccessBar.style.display = 'flex';
}



function Load(proxy, url) {
    const TabID = tabManager.getVisTabID();
    const IframePart = document.getElementById('Tab' + TabID + '_iframe')
    const goTo = (proxy === 'default') ? JSON.parse(localStorage.getItem('client-settings')).proxy : proxy;
    IframePart.src = `go.html#${goTo}=${btoa(url)}`;
}


document.getElementById('refresh').onclick = function () {
    const TabID = tabManager.getVisTabID();
    const IframePart = document.getElementById('Tab' + TabID + '_iframe')
    const iframeDocument = IframePart.contentDocument;
    const Link = iframeDocument.location.href
    iframeDocument.location.href = 'about:blank'
    iframeDocument.location.href = Link
}