document.getElementById('ex-cf').onclick = function () {
    requestDownload()
}

document.getElementById('imp-cf').onclick = function () {
    importConfig()
}

const ASS_CONFIG = JSON.parse(localStorage.getItem('client-settings'))

var KYS_FATTASS = document.getElementById(ASS_CONFIG.proxy);
if (KYS_FATTASS) {
    KYS_FATTASS.style.backgroundColor = 'purple';
}

document.getElementById('engine').value = ASS_CONFIG.search_engine

let proxy1;
let theme1;
let search_engine1;
let ai_endpoint1;
let favico2;
let favtitle2;
let ai_key1;
let ai_model1;
let inspect_script1;

document.getElementById('uv').onclick = function () {
    proxy1 = 'uv'
    coca()
    document.getElementById('uv').style.backgroundColor = 'purple';
}

document.getElementById('dn').onclick = function () {
    proxy1 = 'dn'
    coca()
    document.getElementById('dn').style.backgroundColor = 'purple';
}

document.getElementById('rh').onclick = function () {
    proxy1 = 'rh'
    coca()
    document.getElementById('rh').style.backgroundColor = 'purple';
}


document.getElementById('nodeunblocker').onclick = function () {
    proxy1 = 'nodeunblocker'
    coca()
    document.getElementById('nodeunblocker').style.backgroundColor = 'purple';
}


function coca() {
    var imageSelection = document.getElementById('hoxys');
        var images = imageSelection.getElementsByTagName('img');
        for (var i = 0; i < images.length; i++) {
            images[i].style.backgroundColor = '#232323';
        }
}


function modifyConfig(proxy1, theme1, search_engine1, ai_endpoint1, favico2, favtitle2, ai_key1, ai_model1, inspect_script1) {
    var basicConfig = { 
        theme: theme1 ||'dark',
        proxy: proxy1 || 'uv',
        search_engine: search_engine1 || 'google',
        ai_endpoint: ai_endpoint1 ||'https://api.shuttleai.app/v1',
        ai_key: ai_key1 || 'default',
        favico: favico2 || 'none',
        favtitle: favtitle2 || 'none',
        ai_model: ai_model1 ||'gpt-4',
        inspect_script: inspect_script1 ||'default'
       };
     
       var configString = JSON.stringify(basicConfig);
       localStorage.setItem('client-settings', configString);
}

document.getElementById('metro').onclick = function () {
    modifyConfig(proxy1, document.getElementById('Theme').value, document.getElementById('engine').value, ai_endpoint1, favtitle2, favtitle2, ai_key1, ai_model1, inspect_script1)
}


function SaveConfig() {
    modifyConfig(proxy1, document.getElementById('Theme').value, document.getElementById('engine').value, ai_endpoint1, favtitle2, favtitle2, ai_key1, ai_model1, inspect_script1)
  }