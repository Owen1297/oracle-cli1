const Bar = document.getElementById("search_bar")
const S_CONFIG = JSON.parse(localStorage.getItem('client-settings'))
const img_c = document.getElementById('search_logo')
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
    var inputValue = document.getElementById("search_bar").value;
    const URL = search(inputValue, Engine)
    window.location.href = 'go.html#'+ S_CONFIG.proxy + '=' + btoa(URL)
  }
