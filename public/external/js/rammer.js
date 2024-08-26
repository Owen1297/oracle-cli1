import StrShuffler from "/lib/StrShuffler.js";
import Api from "/lib/api.js";

function setError(err) {
    var element = document.getElementById("warning");
    if (err) {
        element.style.display = "flex";
        var er_1 = document.getElementById('elegance_loading_error');
        er_1.textContent = 'Error : ' + err;
    } else {
        element.style.display = "none";
    }
    if (err === 'must generate a session id first') {
        document.getElementById('session-create-btn').click();
            
        document.title = 'Generating Session ID';

        setTimeout(function() {
            const ID = document.getElementById('EleganceSessionID').value;
            localStorage.setItem('aria-default', ID);
        }, 500);
        
        setTimeout(function() {
            window.location.reload()
        }, 700);
    }
}
window.addEventListener("error", setError);

(function () {
    const api = new Api();
    var localStorageKey = "rammerhead_sessionids";
    var localStorageKeyDefault = "rammerhead_default_sessionid";
    var sessionIdsStore = {
        get() {
            var rawData = localStorage.getItem(localStorageKey);
            if (!rawData) return [];
            try {
                var data = JSON.parse(rawData);
                if (!Array.isArray(data)) throw "getout";
                return data;
            } catch (e) {
                return [];
            }
        },
        set(data) {
            if (!data || !Array.isArray(data)) throw new TypeError("must be array");
            localStorage.setItem(localStorageKey, JSON.stringify(data));
        },
        getDefault() {
            var sessionId = localStorage.getItem(localStorageKeyDefault);
            if (sessionId) {
                var data = sessionIdsStore.get();
                data.filter(function (e) {
                    return e.id === sessionId;
                });
                if (data.length) return data[0];
            }
            return null;
        },
        setDefault(id) {
            localStorage.setItem(localStorageKeyDefault, id);
        }
    };

    function renderSessionTable(data) {
        var tbody = document.querySelector("tbody");
        while (tbody.firstChild && !tbody.firstChild.remove());
        for (var i = 0; i < data.length; i++) {
            var tr = document.createElement("tr");
            appendIntoTr(data[i].id);
            appendIntoTr(data[i].createdOn);

            var fillInBtn = document.createElement("button");
            fillInBtn.textContent = "Fill in existing session ID";
            fillInBtn.className = "btn btn-outline-primary";
            fillInBtn.onclick = index(i, function (idx) {
                setError();
                sessionIdsStore.setDefault(data[idx].id);
                loadSettings(data[idx]);
            });
            appendIntoTr(fillInBtn);

            var deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "btn btn-outline-danger";
            deleteBtn.onclick = index(i, function (idx) {
                setError();
                api.deletesession(data[idx].id).then(() => {
                    data.splice(idx, 1)[0];
                    sessionIdsStore.set(data);
                    renderSessionTable(data);
                });
            });
            appendIntoTr(deleteBtn);

            tbody.appendChild(tr);
        }
        function appendIntoTr(stuff) {
            var td = document.createElement("td");
            if (typeof stuff === "object") {
                td.appendChild(stuff);
            } else {
                td.textContent = stuff;
            }
            tr.appendChild(td);
        }
        function index(i, func) {
            return func.bind(null, i);
        }
    }
    function loadSettings(session) {
        document.getElementById("session-id").value = session.id;
        document.getElementById("session-httpproxy").value = session.httpproxy || "";
        document.getElementById("session-shuffling").checked = typeof session.enableShuffling === "boolean" ? session.enableShuffling : true;
    }
    function loadSessions() {
        var sessions = sessionIdsStore.get();
        var defaultSession = sessionIdsStore.getDefault();
        if (defaultSession) loadSettings(defaultSession);
        renderSessionTable(sessions);
    }
    function addSession(id) {
        var data = sessionIdsStore.get();
        data.unshift({ id: id, createdOn: new Date().toLocaleString() });
        sessionIdsStore.set(data);
        renderSessionTable(data);
    }
    function editSession(id, httpproxy, enableShuffling) {
        var data = sessionIdsStore.get();
        for (var i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].httpproxy = httpproxy;
                data[i].enableShuffling = enableShuffling;
                sessionIdsStore.set(data);
                return;
            }let workerLoaded;
            let uvWorkerLoaded;
            let dipWorkerLoaded;
            
            function encodeUrl(str) {
              if (!str) return str;
              return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
            }
            
            async function worker() {
              return await navigator.serviceWorker.register("../sw.js", {
                scope: "/e/dynamic",
              });
            }
            
            async function dip_worker() {
              return await navigator.serviceWorker.register("../dip/dip.sw.js", {
                scope: "/dip/",
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
              await dip_worker();
              dipWorkerLoaded = true;
            })
            
            document.addEventListener('DOMContentLoaded', async function(){
              await uvworker();
              uvWorkerLoaded = true;
            })
            
            
            document.addEventListener('DOMContentLoaded', function () {
                function rh(url) {
                  console.log('Rammerhead URL:', url);
                  if (localStorage.getItem('el-default')) {
                    let UBox = document.getElementById('session-url');
                    UBox.value = url;
                    const SessionID = localStorage.getItem('el-default');
            
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
                function uv2(url) {
                  window.navigator.serviceWorker.register('./uv2/sw.js', {
                    scope: '/uv2/service/'
                  }).then(() => {
                    setTimeout(function() {
                      window.location.href = '/uv2/service/' + encodeUrl(url);
                  }, 500);
                  });
                };
                function dip(url) {
                  console.log('dip URL:', url);
                  
                  if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('./dip/dip.sw.js', {
                      scope: '/dip/'
                    })
                    .then(registration => {
                      console.log('Service Worker registered with scope:', registration.scope);
                    })
                    .catch(error => {
                      console.error('Service Worker registration failed:', error);
                    });
                  } else {
                    console.error('Service Worker is not supported in this browser.');
                  }
                
                  setTimeout(function() {
                    window.location.href = '/dip/' + encodeUrl(url);
                  }, 500);
                }
                
                function dn(url) {
                  console.log('DN URL:', url);
                  window.navigator.serviceWorker.register('../sw.js', {
                    scope: __dynamic$config.prefix
                  }).then(() => {
                    setTimeout(function() {
                      window.location.href = __dynamic$config.prefix + encodeUrl(url);
                  }, 500);
                  });
                }
                
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
                      case 'uv2':
                        uv2(atob(url));
                        break;
                      case 'dip':
                        dip(atob(url));
                        break;
                      case 'dn':
                        dn(atob(url));
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
                    let SessionID = localStorage.getItem('el-default');
                    document.getElementById('session-id').value = SessionID;
            
                    //
                    setTimeout(function() {
                        const ID = document.getElementById('EleganceSessionID').value;
                        localStorage.setItem('el-default', ID);
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
        }
        throw new TypeError("cannot find " + id);
    }

    api.get("/mainport").then((data) => {
        var defaultPort = window.location.protocol === "https:" ? 443 : 80;
        var currentPort = window.location.port || defaultPort;
        var mainPort = data || defaultPort;
        if (currentPort != mainPort) window.location.port = mainPort;
    });

    api.needpassword().then(doNeed => {
        if (doNeed) {
            document.getElementById("password-wrapper").style.display = "";
        }
    });
    window.addEventListener("load", function () {
        loadSessions();

        var showingAdvancedOptions = false;
        document.getElementById("session-advanced-toggle").onclick = function () {
            // eslint-disable-next-line no-cond-assign
            document.getElementById("session-advanced-container").style.display = (showingAdvancedOptions =
                !showingAdvancedOptions)
                ? "block"
                : "none";
        };

        document.getElementById("session-create-btn").addEventListener("click", () => {
            setError();
            api.newsession().then((id) => {
                addSession(id);
                document.getElementById('EleganceSessionID').value = id
                document.getElementById("session-id").value = id;
                document.getElementById("session-httpproxy").value = "";
            });
        });
        async function go() {
            setError();
            const id = document.getElementById("session-id").value;
            const httpproxy = document.getElementById("session-httpproxy").value;
            const enableShuffling = document.getElementById("session-shuffling").checked;
            const url = document.getElementById("session-url").value || "https://www.google.com/";
            if (!id) return setError("must generate a session id first");
            const value = api.sessionexists(id);
            if (!value) return setError("session does not exist. try deleting or generating a new session");
            await api.editsession(id, httpproxy, enableShuffling);
            editSession(id, httpproxy, enableShuffling);
            const shuffleDict = await api.shuffleDict(id);
            if (!shuffleDict) {
                window.location.href = "/" + id + "/" + url;
            } else {
                var shuffler = new StrShuffler(shuffleDict);
                window.location.href = "/" + id + "/" + shuffler.shuffle(url);
            }
        }
        document.getElementById("session-go").onclick = go;
        document.getElementById("session-url").addEventListener("keydown", (event) => {
            if (event.key === "Enter") go();
        });
    });
})();