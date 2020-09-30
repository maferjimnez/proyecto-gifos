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


// *!   HERO SECTION

///       SEARCH BAR       ///

// * * DOM ELEMENTS * * //
const $searchInput = document.getElementById('search_input');
const $btnSearch = document.getElementById('searchIcon');
const $searchResultGallery = document.getElementById('search__results__gallery')
const $searchTitle = document.getElementById('search__results__title');
const $btnShowMore = document.getElementById('show_more_btn');

let offset = 0;


// * * FUNCTIONS * * //
async function searchGif(){

    event.preventDefault()
    
    if (offset === 0) {
		$searchResultGallery.innerHTML = '';
	}

    await fetch(searchEndpointWithApiKey + $searchInput.value + '&limit=12' + '&offset=' + offset)
        .then(data => data.json())
        .then(result => {
            console.log(result)
                if (result.data == 0) {
                 $searchResultGallery.innerHTML =  `<section class="search__error__container">
                                                        <h4 class="search__error__title">${$searchInput.value}</h4>
                                                        <img src="/assets/icon-busqueda-sin-resultado.svg" alt="" srcset="">
                                                        <h5>Intenta con otra búsqueda.</h5>
                                                    </section> `
        
                 } else {
                    displayGif(result)
                }
        })
        .catch (err => console.log("error", err));
}


function displayGif(result) {
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

const showMore = () => {
	offset += 12;
	searchGif();
};


// * * SUGERECIAS * * //






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

