// * *      NAVBAR ELEMENTS       * * //
const $navbarMenu = document.getElementById("navbar");
const $btnMenu = document.getElementById("btnMenu");
const $darkModeBtn = document.querySelector("#dark_mode_btn");

// * *      DARK MODE ICONS * * //
const $logo = document.querySelector('.img_logo');
const $camera = document.querySelector('#camera');
const $cameraRoll = document.querySelector('#camera_roll');
const $btnCrear = document.getElementById('btnCrear');

// * *            BODY             * * //
const $body = document.querySelector('#body');
const $heroConteiner = document.querySelector('#hero__container');

// * *      SEARCH ELEMENTS       * * //
const $searchResultGallery = document.getElementById('search__results__gallery');
const $searchTitle = document.getElementById('search__results__title');
const $btnShowMore = document.getElementById('show_more_btn');
const $searchResultContainer = document.querySelector('.search__results__container');
const $searchErrorContainer = document.querySelector('.search__error__container');

// searchbar hero
const $searchInput = document.getElementById('search_input');
const $btnSearch = document.getElementById('searchIcon');

// searchbar navbar
const $searchInputNavbar = document.querySelector('#search_input_navbar');
const $btnSearchNavbar = document.querySelector('#searchIcon_navbar');

// search suggestions
const $recomendedSearchContainer = document.querySelector('#recommendedSearch__container');
const $recomendedSearch = document.querySelector('.recommended__search');


// * * TRENDINGS ELEMENTS * * //
// trending tags
const $trendingTagsConteiner = document.querySelector('#trending__tags__container');
const $trendingTagsContent = document.querySelector('#tags__content');

// trending gifs
const $trendingGifsConteiner = document.querySelector('#trending_gifs_conteiner');
const $trendingGifsSlider = document.querySelector('.trending_gifs_content');
const $btnArrowPrevious = document.querySelector('#btn-previous');
const $btnArrowNext = document.querySelector('#next-btn');


// * * GIFS BUTTONS FUNCTIONS * * //
// favourite
const $favouritesSectionConteiner = document.querySelector('#main__favourites');
const $navbarFavourite = document.querySelector('#navbar_favourite');
const $favouritesGifContent = document.querySelector('.favourites_gifs_container');


// * * CREATE GIF * * //
const $createGifConteiner = document.querySelector('#crearGif__conteiner');
const $userVideo = document.querySelector('#user_video');
const $titleVideo = document.querySelector('#title_texts');
const $videoConteiner = document.querySelector('#video_conteiner');
const $paragraphVideo = document.querySelector('#paragraph_central');
const $startBtn = document.querySelector('#start_btn');
const $recordBtn = document.querySelector('#record_btn');
const $textScreenConteiner = document.querySelector('.texts_central');
const $stepOne = document.querySelector('#step_1');
const $stepTwo = document.querySelector('#step_2');
const $stepThree = document.querySelector('#step_3');
const $recordingTimer = document.querySelector('#recording_timer');
const $userGif = document.querySelector('#user_gif');
const $stopBtn = document.querySelector('#stop_btn');
const $uploadBtn = document.querySelector('#upload_btn');
const $recordAgainBtn = document.querySelector('#record_again');
const $videoOverlay = document.querySelector('#video_overlay');
const $overlayIcon = document.querySelector('#icon_overlay');
const $overlayText = document.querySelector('#paragraph_overlay');
const $overlayActionBtns = document.querySelector('#actions_overlay');

// * *      MIS GIFOS       * * //
const $misGifosConteiner = document.querySelector('#mis_gifos_conteiner');
const $misGifosContent = document.querySelector('#mis_gifos_content');
const $misGifosGallery = document.querySelector('.mis_gifos_gallery');

// * *      MAX GIFO       * * //
const $maxGifConteiner = document.querySelector('#max_gif_conteiner');
const $maxGif = document.querySelector('#gif_max');
const $maxGifTitle = document.querySelector('#gifmax_title');
const $maxGifUser = document.querySelector('#gifmax_user');
const $maxFavIcon = document.querySelector('#gifmax_fav');