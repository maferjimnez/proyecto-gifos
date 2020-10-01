//!   HEADER SECTION  !//

/** BURGUER MENU **/
    const $navbarMenu = document.getElementById("navbar");
    const $btnMenu = document.getElementById("btnMenu");

const showMenu = () => {
    $navbarMenu.classList.toggle('navbar_menu_open');

    if ($navbarMenu.classList.contains("navbar_menu_open")) {
        $btnMenu.src = "assets/close.svg"
    } else{
        $btnMenu.src = "assets/burger.svg"
    }
}

// * * NAVBAR ICONS EVENTS * * //

const $btnCrear = document.getElementById('btnCrear');

$btnCrear.addEventListener('mouseover', () => {
    $btnCrear.src = "assets/CTA-crear-gifo-hover.svg";
}  )

$btnCrear.addEventListener('mouseout', () => {
    $btnCrear.src = "assets/button-crear-gifo.svg";
}  )

$btnCrear.addEventListener('click', () => {
    $btnCrear.src = "assets/CTA-crear-gifo-active.svg"
})


// * * NAVBAR STICKY * * //
const $navbarSearchBar = document.querySelector('.navbar_search_container');
const $headerContainer = document.querySelector('#header__container');

function stickyNav() {
    console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 500) {
        if (window.innerWidth < 1024) {
            $navbarSearchBar.classList.add('hide');
        } else {
            $navbarSearchBar.classList.remove('hide');
            $headerContainer.style.boxShadow =
                '0 9px 8px -10px rgba(148,147,147,0.9)';
        }
    } else {
        $navbarSearchBar.classList.add('hide');
        $headerContainer.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', stickyNav);


// *!   HERO SECTION

///       SEARCH BAR       ///

// * * DOM ELEMENTS * * //
const $searchInput = document.getElementById('search_input');
const $btnSearch = document.getElementById('searchIcon');
const $searchResultGallery = document.getElementById('search__results__gallery')
const $searchTitle = document.getElementById('search__results__title');
const $btnShowMore = document.getElementById('show_more_btn');
const $searchResultContainer = document.querySelector('.search__results__container');
const $searchErrorContainer = document.querySelector('.search__error__container');
const $recomendedSearchContainer = document.querySelector('.recommendedSearch__container');
const $recomendedSearch = document.querySelector('.recommended__search');


let offset = 0;


// * * FUNCTIONS * * //
async function searchGif(){

    event.preventDefault();
    const USER_SEARCH = $searchInput.value;

    if (offset === 0) {
		$searchResultGallery.innerHTML = '';
	}

    await fetch(searchEndpointWithApiKey + USER_SEARCH + '&limit=12' + '&offset=' + offset)
        .then(data => data.json())
        .then(result => {
            console.log(result)
                if (result.data == 0) {
                    errorSearch ();
        
                 } else {
                    displayGif(result);
                }
        })
        .catch (err => console.log("error", err));
}


function displayGif(result) {

    $searchResultContainer.classList.remove('hide');
    $btnShowMore.classList.remove('hide');

    for (let i = 0; i < result.data.length; i++){
        const gifResultContainer = document.createElement('div');
        gifResultContainer.classList.add('gif_result_container');
        gifResultContainer.innerHTML = `
                                            <img class="gif_result" src="${result.data[i].images.original.url}" alt="${result.data[i].title}">
                                            <section class="gif_content">
                                            <div class="icons">
                                                <img class="icon_fav" src="/assets/icon-fav.svg" alt="" srcset="">
                                                <img class="icon_download" src="/assets/icon-download.svg" alt="">
                                                <img class="icon_max" src="/assets/icon-max-normal.svg" alt="">               
                                            </div>
                                            <div class="details">
                                                <p class="gif_user">${result.data[i].username}</p>
                                                <h4 class="gif_title">${result.data[i].title}</h4>                          
                                            </div>
                                            </section>`
    
        $searchResultGallery.appendChild(gifResultContainer);  
    }

    $searchTitle.innerHTML = $searchInput.value;
}

function errorSearch () {
    $searchResultContainer.classList.remove('hide');
    $searchErrorContainer.classList.remove('hide');
    // $btnShowMore.style.display = 'none';

    $searchErrorContainer.innerHTML = `
                                    <h4 class="search__error__title">${$searchInput.value}</h4>
                                    <img src="/assets/icon-busqueda-sin-resultado.svg" alt="" srcset="">
                                    <h5>Intenta con otra búsqueda.</h5>`;
};

function cleanResultsContainer () {
    $searchResultContainer.classList.add('hide');
    $searchErrorContainer.classList.add('hide');

    
}

const showMore = () => {
	offset += 12;
	searchGif();
};


// * * SUGERECIAS * * //


const getSearchSuggestions = async () => {
    // event.preventDefault();
    const input = $searchInput.value;
    if (input.length >= 1) {
        await fetch(
            `https://api.giphy.com/v1/tags/related/${input}?${apiKey}&limit=4`
        )
            .then((response) => response.json())
            .then((suggestions) => {
                console.log(suggestions);
                displaySuggestions(suggestions);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};


const displaySuggestions = (suggestions) => {
    for (let i = 0; i < suggestions.data.length; i++) {
        const searchSuggestionItem = document.createElement('li');
        searchSuggestionItem.classList.add('suggestions__item');
        searchSuggestionItem.innerHTML = `${suggestions.data[i].name}`;
        $recomendedSearch.appendChild(searchSuggestionItem);
    }
};
$btnSearch.addEventListener('click', getSearchSuggestions);
// $searchInput.addEventListener('keyup', displaySuggestions);


// * *  EVENTS * * //
$btnSearch.addEventListener('click', searchGif);
$searchInput.addEventListener('keypress', function (e){
    if (e.keyCode === 13){
        searchGif();
    }
});
$searchInput.addEventListener('click', () =>{
    $btnSearch.src = "/assets/close.svg"
})
$btnShowMore.addEventListener('click', showMore);



// ! TRENDING SECTION

const getTrendingGif = async () => {
    await fetch(`${trendingEndpointWithApiKey}&limit=12&rating=g`)
        .then((response) => response.json())
        .then((trendings) => {
            console.log(trendings);
            // displayTrendingGifs(trendings);
        })
        .catch((err) => console.error(err));
};

getTrendingGif();