///YHAHAHAHAHAHA So FUNNY BINDEX🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣
//kys
let pageURL = window.location.href;
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

function requestDownload() {
    const jsonData = localStorage.getItem('client-settings');
    if (!jsonData) {
        console.error('JSON data not found in localStorage');
        return;
    }
    try {
        const parsedData = JSON.parse(jsonData);
        const blob = new Blob([parsedData], { type: 'application/json' });
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'data.json';
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading JSON data:', error);
    }
}

var currentPage = "";
        var currentPageURL = window.location.href;
        if (currentPageURL.includes("index.html")) {
            currentPage = "index.html";
        }
        else if (currentPageURL.includes("main.html")) {
            currentPage = "main.html";
        }
        else {
            currentPage = "extra.html";
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
                        localStorage.setItem('client-settings', JSON.stringify(importedData));
                        console.log('Data successfully imported and saved to localStorage:', importedData);
                        alert('succesfully imported')
                    } catch (error) {
                        console.error('Error importing and saving JSON data:', error);
                    }
                };
        
                reader.readAsText(file);
            };
        
            fileInput.click();
        };