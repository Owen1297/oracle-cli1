document.addEventListener("DOMContentLoaded", function() {
    let Page = 'all';
    if (Page == 'all') {
        document.getElementById('all').style.backgroundColor = '#1f1f1f';
    }
    
    document.getElementById('all').onclick = function () {
        Page = 'all';
        refresh();
    }
    
    document.getElementById('recently').onclick = function () {
        Page = 'recently';
        refresh();
    }
    
    document.getElementById('fav').onclick = function () {
        Page = 'fav';
        refresh();
    }
    
    document.getElementById('custom').onclick = function () {
        Page = 'custom';
        refresh();
    }
    
    let PreviousPage = document.getElementById(Page);
    
    function refresh() {
        let pageElement = document.getElementById(Page);
        if (pageElement && PreviousPage) {
            PreviousPage.style.backgroundColor = 'transparent';
            pageElement.style.backgroundColor = '#1f1f1f';
        } else {
            console.error("Page element or PreviousPage element is not found.");
        }
        PreviousPage = pageElement;

        if (Page == 'custom') {
            document.getElementById('HOLDER_BS').innerHTML = '';
            LoadCustom()
        }

        if (Page == 'all') {
            document.getElementById('HOLDER_BS').innerHTML = '';
            LoadAll()
        }

        if (Page == 'fav') {
            document.getElementById('HOLDER_BS').innerHTML = '';
            LoadFavorites()
        }
    }

    
    setTimeout(() => {
        countmain();
    }, 40);
    setTimeout(() => {
        countcustom();
    }, 40);
    
    LoadAll()
});

function LoadCustom() {
    const fart = localStorage.getItem("custom-app");
  
    if (fart) {
        const jsonContainer = document.getElementById('HOLDER_BS')
      const itemJSON = JSON.parse(localStorage.getItem("custom-app"));
      for (var i = 0; i < itemJSON.length; i++) {
        var item = itemJSON[i];
        const MainDiv = document.createElement("div");
        MainDiv.className = "item_application";
        jsonContainer.appendChild(MainDiv);
        MainDiv.id = item.name
        const BG_IMG = document.createElement("img");
        BG_IMG.alt = "app_ico";
        BG_IMG.id = item.name;
        BG_IMG.src = item.icon;
  
        MainDiv.appendChild(BG_IMG);
        const overlay_ = document.createElement("div");
        overlay_.className = "overlay_title";
        MainDiv.appendChild(overlay_);
        const p_title = document.createElement("p");
        overlay_.appendChild(p_title);
        p_title.textContent = item.name;
  
        const PlayButton = document.createElement("button");
        PlayButton.className = "play_button";
        overlay_.appendChild(PlayButton);
        const GAMEURL = item.url
        PlayButton.textContent = "Play";


        (function() {
            PlayButton.onclick = function() {
               go('default', GAMEURL);
            };
        })();

      }
    }
  }
  

function LoadAll() {
    fetch('../external/js/g-list.json')
        .then(response => response.json())
        .then(data => {
            const jsonContainer = document.getElementById('HOLDER_BS');
            data.forEach(item => {
                const MainDiv = document.createElement('div')
                MainDiv.className = 'item_application';
                jsonContainer.appendChild(MainDiv)
                const BG_IMG = document.createElement('img')
                BG_IMG.alt = 'app_ico'
                BG_IMG.id = item.name
                BG_IMG.src = item.icon
                MainDiv.id = btoa(item.name)

                MainDiv.appendChild(BG_IMG)
                const overlay_ = document.createElement('div')
                overlay_.className = 'overlay_title';
                MainDiv.appendChild(overlay_);
                const p_title = document.createElement('p')
                overlay_.appendChild(p_title);
                p_title.textContent = item.name

                const PlayButton = document.createElement('button');
                PlayButton.className = 'play_button';
                overlay_.appendChild(PlayButton);

                const FavButton = document.createElement('div');
                FavButton.className = 'fukumean';
                
                const favoriteIMG = document.createElement('img');
                favoriteIMG.src = 'external/img/star.png';

                FavButton.appendChild(favoriteIMG);

                overlay_.appendChild(FavButton);
                PlayButton.textContent = 'Play';
                (function() {
                  PlayButton.onclick = function() {
                     go(item.proxy, item.url);
                  };
              })();

              (function() {
                FavButton.onclick = function() {
                   Favorite(item.name);
                };
            })();
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

function go(proxy, url) {
    const goTo = (proxy === 'default') ? JSON.parse(localStorage.getItem('client-settings')).proxy : proxy;
    window.location.href = `go.html#${goTo}=${btoa(url)}`;
}

let count1 = 0;
let count2 = 0;


function countmain() {
    fetch('../external/js/g-list.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                count1 = count1 + 1;
            });
            document.getElementById('count').textContent = count1;
        })
        .catch(error => console.error('Error fetching JSON:', error));
}


function countcustom() {
    const fart = localStorage.getItem("custom-app");
  
    if (fart) {
      const itemJSON = JSON.parse(localStorage.getItem("custom-app"));
      for (var i = 0; i < itemJSON.length; i++) {
        count2 = count2 + 1
      }
      document.getElementById('custom_count').textContent = count2;
    }
  }

  function Favorite(title) {
    if (typeof(Storage) !== "undefined") {
        let favorites = localStorage.getItem("favorites");
        if (favorites) {
            favorites += "\n" + title;
        } else {
            favorites = title;
        }
        localStorage.setItem("favorites", favorites);
        console.log(title);
    } else {
        console.log("Sorry, your browser does not support web storage... or its corrupted?");
    }
}

function DumpFavorites() {
    let favorites = localStorage.getItem("favorites");
    if (favorites) {
        let favoriteArray = favorites.split("\n");
        favoriteArray.forEach((item, index) => {
            console.log(`Item${index + 1} : ${item}`);
        });
    } else {
        console.log("No favorites found.");
    }
}

function LoadFavorites() {
    let favorites = localStorage.getItem("favorites");

    if (!favorites) {
        console.log("No favorites found.");
        return;
    }

    fetch('../external/js/g-list.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let favoriteArray = favorites.split("\n");
            data.forEach(item => {
                if (favoriteArray.includes(item.name)) {
                    createDiv(item.name, item.icon, item.url, item.proxy)
                }
            });
        })
        .catch(error => console.error('Error fetching or parsing JSON:', error));
}


function createDiv(name, icon, url, proxy) {
    const jsonContainer = document.getElementById('HOLDER_BS');

    const MainDiv = document.createElement('div');
    MainDiv.className = 'item_application';
    jsonContainer.appendChild(MainDiv);
    MainDiv.id = btoa(name)

    const BG_IMG = document.createElement('img');
    BG_IMG.alt = 'app_ico';
    BG_IMG.id = name;
    BG_IMG.src = icon;
    MainDiv.appendChild(BG_IMG);

    const overlay_ = document.createElement('div');
    overlay_.className = 'overlay_title';
    MainDiv.appendChild(overlay_);

    const p_title = document.createElement('p');
    p_title.textContent = name;
    overlay_.appendChild(p_title);

    const PlayButton = document.createElement('button');
    PlayButton.className = 'play_button';
    PlayButton.textContent = 'Play';
    PlayButton.onclick = function() {
        go(proxy, url);
    };
    overlay_.appendChild(PlayButton);
}


function search_item() {
    let input = document.getElementById("searchbar").value.toLowerCase();
    let x = document.getElementsByClassName("HOLDER_BS");
  
    let z = document.getElementsByClassName("appliance-container");
    for (let i = 0; i < z.length; i++) {
        let appName = z[i].getElementsByTagName("h1")[0].innerText.toLowerCase();
    
        if (input === "" || appName.includes(input)) {
          z[i].style.display = "block";
        } else {
          z[i].style.display = "none";
        }
      }
      
    document.body.style.overflow = input !== "" ? "hidden" : "auto";
  }
  