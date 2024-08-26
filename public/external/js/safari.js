const tabManager = (function () {
    let tabCount = 0;

    function createTabElement() {
        const tabDiv = document.createElement('div');
        const h1 = document.createElement('h1');
        const img = document.createElement('img');
        const tbCloseBtn = document.createElement('button');
        const iframe = document.createElement('iframe');
        document.getElementById('tabs').appendChild(tabDiv)
        h1.textContent = 'Tab' + tabCount;
        tabDiv.id = 'Tab' + tabCount;
        tabDiv.appendChild(h1);
        tabDiv.className = 'tab';
        tabDiv.appendChild(img);
        img.src = 'external/img/globe.png';
        tabDiv.appendChild(tbCloseBtn);
        document.head.appendChild(document.getElementById('add'));
        document.getElementById('tabs').appendChild(document.getElementById('add'));
        writeToDisk(tabCount);
        const lockin = tabCount
        iframe.id = 'Tab' + tabCount + '_iframe';
        iframe.src = 'main.html';
        tabDiv.onclick = function () {
            openTab(lockin)
        };
        tbCloseBtn.onclick = function () {
            killTab(lockin)
        };
        hide();
        tbCloseBtn.textContent = 'Close Tab';
        document.getElementById('iframes_holder').appendChild(iframe);
        return tabDiv;
    }

    function newTab() {
        const tabDiv = createTabElement();
        tabCount += 1;
    } 

    function getVisTabID() {
        const target = document.getElementById('visible-tab');
        return target ? target.value : null;
    }

    function writeToDisk(id) {
        document.getElementById('visible-tab').value = id;
    }

    function killTab(id) {
        document.getElementById('Tab' + id).remove();
        document.getElementById('Tab' + id + '_iframe').remove();
    }

    function hide() {
        const iframes = document.querySelectorAll('#iframes_holder iframe');
        iframes.forEach(function (iframe) {
            iframe.style.display = 'none';
        });
    }

    function openTab(id) {
        writeToDisk(id)
        hide()
        document.getElementById('Tab' + id + '_iframe').style.display = 'flex';
    }

    document.getElementById('tab_ico').addEventListener('click', function () {
        const tabsContainer = document.getElementById('tabs');
        tabsContainer.style.display = (tabsContainer.style.display === 'flex') ? 'none' : 'flex';
    });

    document.getElementById('add').addEventListener('click', newTab);
    document.getElementById('add_ico').addEventListener('click', newTab);

    return {
        newTab,
        getVisTabID,
        writeToDisk,
        killTab,
        openTab
    };
})();
tabManager.newTab();


if (localStorage.getItem('client-settings')) {
    console.warn('all systems stable');
} else {
    var basicConfig = { 
        theme: 'dark',
        proxy: 'uv',
        search_engine: 'google',
        ai_endpoint: 'https://api.shuttleai.app/v1',
        ai_key: 'default',
        ai_model: 'gpt-4',
        inspect_script: 'default'
       };
     
       var configString = JSON.stringify(basicConfig);
       localStorage.setItem('client-settings', configString);
       console.log('ready!')
}

document.getElementById('home').onclick = function () {
    const TabID = tabManager.getVisTabID();
    const iframe = document.getElementById('Tab' + TabID + '_iframe')
    iframe.src = 'main.html'
}

document.getElementById('back').onclick = function () {
    const TabID = tabManager.getVisTabID();
  const iframe = document.getElementById('Tab' + TabID + '_iframe');
  if (iframe) {
      const doc = iframe.contentDocument;
      const targetLocation = doc.location;

      var newScript = doc.createElement('script');
      newScript.textContent = 'window.history.back();';
      doc.body.appendChild(newScript);
  }
}

document.getElementById('inspect').onclick = function () {
    const TabID = tabManager.getVisTabID();
  const iframe = document.getElementById('Tab' + TabID + '_iframe');
  if (iframe) {
      const iframeDocument = iframe.contentDocument;

      var newScript = iframeDocument.createElement('script');
      newScript.textContent = "(function () { var script = document.createElement('script'); script.src='https://cdn.jsdelivr.net/npm/eruda'; document.body.append(script); script.onload = function () { eruda.init(); } })();";
      iframeDocument.body.appendChild(newScript);
  }
}
document.getElementById('forward').onclick = function () {
    const TabID = tabManager.getVisTabID();
  const iframe = document.getElementById('Tab' + TabID + '_iframe');
  if (iframe) {
      const doc = iframe.contentDocument;
      const targetLocation = doc.location;

      var newScript = doc.createElement('script');
      newScript.textContent = 'window.history.forward();';
      doc.body.appendChild(newScript);
  }
}


document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'F') {
        var sfBuildElement = document.getElementById('sf-build-159');
        if (sfBuildElement.style.display === 'flex') {
            sfBuildElement.style.display = 'none';
        } else {
            sfBuildElement.style.display = 'flex';
        }
    }
});


//safari ui input fix


const Bar = document.getElementById("url-bar")
const S_CONFIG = JSON.parse(localStorage.getItem('client-settings'))
let Engine

if (S_CONFIG.search_engine == 'google') {
  Engine = 'https://www.google.com/search?q=%s'
  Bar.placeholder = 'Search With Google or Type URL'
} else if (S_CONFIG.search_engine == 'bing') {
  Engine = 'https://www.bing.com/search?q=%s'
  img_c.src = 'external/img/bign.webp'
  Bar.placeholder = 'Search With Bing or Type URL'
} else if (S_CONFIG.search_engine == 'duckduck-go') {
  Engine = 'https://duckduckgo.com/?t=h_&q=%s'
  Bar.placeholder = 'Search With Duck Duck go or Type URL'


} else {
  Engine = S_CONFIG.search_engine
  Bar.placeholder = 'Search or Type URL.'
  img_c.src = 'external/img/search.png'
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
      processInput();
    }
  }

  function search(input, template) {
    try {
      return new URL(input).toString();
    } catch (err) {}
  
    try {
      const url = new URL(`http://${input}`);
      if (url.hostname.includes(".")) return url.toString();
    } catch (err) {}
  
    return template.replace("%s", encodeURIComponent(input));
  }
  
  function processInput() {
    var inputValue = document.getElementById("url-bar").value;
    const URL = search(inputValue, Engine)
    const TabID = tabManager.getVisTabID();
    const iframe = document.getElementById('Tab' + TabID + '_iframe')
    iframe.src = 'go.html#'+ S_CONFIG.proxy + '=' + btoa(URL)
  }
