let workerLoaded;
let uvWorkerLoaded;

function encodeUrl(str) {
  if (!str) return str;
  return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
}

async function worker() {
  return await navigator.serviceWorker.register("../sw.js", {
    scope: "/aria/dynamic",
  });
}

async function uvworker() {
  return await navigator.serviceWorker.register("../sw.js", {
    scope: "/uv/service",
  });
}

document.addEventListener('DOMContentLoaded', async function(){
  await worker();
  workerLoaded = true;
})


document.addEventListener('DOMContentLoaded', async function(){
  await uvworker();
  uvWorkerLoaded = true;
})


document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('hashchange', function () {
      setTimeout(function() {
        var fragment = window.location.hash.substr(1);
        var parts = fragment.split('=');
        var identifier = parts[0];
        var url = parts[1];
        switch (identifier) {
          case 'rh':
            rh(atob(url));
            break;
          case 'uv':
            uv(atob(url));
            break;
          case 'dn':
            dn(atob(url));
            break;
          case 'nodeunblocker':
            window.location.href='/sussyuncle/' + (atob(url));
            break;
          default:
            console.error('Unknown fragment identifier: ' + identifier);
            break;
        }
      });
  }, 500);
    var initialFragment = window.location.hash.substr(1);
    if (initialFragment) {
      window.dispatchEvent(new Event('hashchange'));
    }
  });



function createSession(url) {
    document.getElementById('session-create-btn').click();
            
        document.title = 'Generating Session ID'
        let UBox = document.getElementById('session-url');
        UBox.value = url;
        let SessionID = localStorage.getItem('aria-default');
        document.getElementById('session-id').value = SessionID;

        //
        setTimeout(function() {
            const ID = document.getElementById('EleganceSessionID').value;
            localStorage.setItem('aria-default', ID);
        }, 500);
        
        setTimeout(function() {
            document.getElementById('session-go').click();
        }, 700);
}


function setError(err) {
    var element = document.getElementById("warning");
    if (err) {
        element.style.display = "flex";
        var er_1 = document.getElementById('elegance_loading_error');
        er_1.textContent = 'Error : ' + err;
    } else {
        element.style.display = "none";
    }
}

//loading FUNCTIONS

function rh(url) {
  console.log('Rammerhead URL:', url);
  if (localStorage.getItem('aria-default')) {
    let UBox = document.getElementById('session-url');
    UBox.value = url;
    const SessionID = localStorage.getItem('aria-default');

    document.getElementById('session-id').value = SessionID;
    setTimeout(function() {
        document.getElementById('session-go').click();
    }, 500);
} else {
    createSession(url);
}

}
function uv(url) {
  window.navigator.serviceWorker.register('./uv/sw.js', {
    scope: __uv$config.prefix
  }).then(() => {
    setTimeout(function() {
      window.location.href = __uv$config.prefix + encodeUrl(url);
  }, 500);
  });
}

function dn(url) {
  console.log("DN URL:", url);
  window.navigator.serviceWorker
    .register("../sw.js", {
      scope: __dynamic$config.prefix
    })
    .then(() => {
      setTimeout(function () {
        window.location.href = __dynamic$config.prefix + encodeUrl(url);
      }, 500);
    });
}
