const JSONManager = (function () {

    // this API is very basic
    // i don't expect this getting used in projects but ay its here

    // customGameManager 0.2.1

    const LocalKey = 'custom-app'; // where your shit is stored

    function promptApp() {
        var icon = prompt("Enter the custom icon URL:");
        var name = prompt("Enter the custom app name:");
        var url = prompt("Enter the custom URL:");
        
        writeApp(icon, name, url);
        return { icon: icon, name: name, url: url };
    }

    function writeApp(icon, name, url) {
        const existingAppsJSON = localStorage.getItem(LocalKey);
        const existingApps = existingAppsJSON ? JSON.parse(existingAppsJSON) : [];

        existingApps.push({ icon, name, url });

        const updatedAppsJSON = JSON.stringify(existingApps);

        localStorage.setItem(LocalKey, updatedAppsJSON);
    }

    function removeApp(name) {
        const existingAppsJSON = localStorage.getItem(LocalKey);
        if (existingAppsJSON) {
            const existingApps = JSON.parse(existingAppsJSON);
            const filteredApps = existingApps.filter(app => app.name !== name);
            const updatedAppsJSON = JSON.stringify(filteredApps);
            localStorage.setItem(LocalKey, updatedAppsJSON);
        }
    }

    function modifyExistingApp(icon, name, url, oldName) {
        const existingAppsJSON = localStorage.getItem(LocalKey);
        if (existingAppsJSON) {
            const existingApps = JSON.parse(existingAppsJSON);
            const updatedApps = existingApps.map(app => {
                if (app.name === oldName) {
                    return { icon, name, url };
                }
                return app;
            });
            const updatedAppsJSON = JSON.stringify(updatedApps);
            localStorage.setItem(LocalKey, updatedAppsJSON);
        }
    }

    function logApps() {
        console.log(localStorage.getItem(LocalKey))
    }

    function importConfig() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
    
        fileInput.onchange = function (event) {
            const file = event.target.files[0];
    
            const reader = new FileReader();
    
            reader.onload = function (e) {
                try {
                    const importedData = JSON.parse(e.target.result);
                    localStorage.setItem(LocalKey, JSON.stringify(importedData));
                    console.log('Data successfully imported and saved to localStorage:', importedData);
                    alert('Succesfully Imported The config (Check your Games!)')
                } catch (error) {
                    console.error('Error importing and saving JSON data:', error);
                }
            };
    
            reader.readAsText(file);
        };
    
        fileInput.click();
    };

    function exportConfig() {
        const jsonData = localStorage.getItem(LocalKey);
        if (!jsonData) {
            console.error('JSON data not found in localStorage');
            return;
        }
        try {
            const parsedData = JSON.parse(jsonData);
            const blob = new Blob([JSON.parse(JSON.stringify(jsonData))], { type: 'application/json' });
            const a = document.createElement('a');
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = 'apps.json';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading JSON data:', error);
        }
    }
    
    function getAppsJSON() {
        return localStorage.getItem(LocalKey)
    }

    function custom_apps() {
        let Variable = false

        if (localStorage.getItem(LocalKey)) {
            Variable = true
        }

        return Variable
    }

    function promptModification(OG_NAME) {
        var icon = prompt("Enter the custom icon URL:");
        var name = prompt("Enter the custom app name:");
        var url = prompt("Enter the custom URL:");
        
        modifyExistingApp(icon, name, url, OG_NAME);
    }

    return {
        writeApp,
        removeApp,
        modifyExistingApp,
        logApps,
        importConfig,
        exportConfig,
        getAppsJSON,
        custom_apps,
        promptApp,
        promptModification
    };
})();

let AppSelect;
let previousAppSelect;

function MANAGER_SELECT_OPERATION(name) {
    previousAppSelect = AppSelect;
    AppSelect = name;
    if(previousAppSelect) {
        document.getElementById(previousAppSelect).style.backgroundColor = '';
    }
    document.getElementById(name).style.backgroundColor = 'green';
}


if (document.getElementById('manager')) {
   const appContainer  = document.getElementById('app-holder');

   function createAppDiv(icon, name, url) {
    var appDiv = document.createElement("div");
    appDiv.className = "manage-app-div";
    appDiv.id = name
    appDiv.onclick = function() {
      MANAGER_SELECT_OPERATION(name)
    };

    var img = document.createElement("img");
    img.className = "manage-app-img";
    img.src = icon;
    img.alt = "ICO";
    var p = document.createElement("p");
    p.className = "manage-app-p";
    p.textContent = name;
    appDiv.appendChild(img);
    appDiv.appendChild(p);
    appContainer.appendChild(appDiv)
  }
  const fart = localStorage.getItem('custom-app')
  
  if (fart) {
    const appsJSON = JSON.parse(localStorage.getItem('custom-app'))
    for (var i = 0; i < appsJSON.length; i++) {
        var app = appsJSON[i];
        createAppDiv(app.icon, app.name, app.url);
      }
  }

  document.getElementById('newapp').onclick = function () {
    JSONManager.promptApp()
    setTimeout(() => {
        globalRefresh()
    }, 800);
  }

  document.getElementById('clear').onclick = function () {
    localStorage.removeItem('custom-app')
    setTimeout(() => {
        globalRefresh()
    }, 800);
  }

  document.getElementById('importconfig').onclick = function () {
    JSONManager.importConfig()
    setTimeout(() => {
        globalRefresh()
    }, 1200);
  }

  document.getElementById('exportconfig').onclick = function () {
    JSONManager.exportConfig()
  }

  document.getElementById('delete').onclick = function () {
    JSONManager.removeApp(AppSelect)
    document.getElementById(AppSelect).remove()
  }

  document.getElementById('modify').onclick = function () {
    JSONManager.promptModification(AppSelect)
    setTimeout(() => {
        globalRefresh()
    }, 800);
  }

  document.getElementById('X').onclick = function () {
    document.getElementById('manager').style.display = 'none';
  }
}


function globalRefresh() {
    const appsJSON = JSON.parse(localStorage.getItem('custom-app'))
    document.getElementById('app-holder').innerHTML = '';

    for (var i = 0; i < appsJSON.length; i++) {
    var app = appsJSON[i];
     createAppDiv(app.icon, app.name, app.url);
  }
}

function OpenManager() {
    document.getElementById('manager').style.display = 'flex';
}