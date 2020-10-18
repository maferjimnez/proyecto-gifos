// * *     HOME PAGE       * * //
function displayHomePage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    $heroConteiner.classList.remove('hide');
    $heroConteiner.classList.add('hero__container');
    $trendingTagsConteiner.classList.remove('hide');
    $trendingGifsConteiner.classList.remove('hide');
    $favouritesSectionConteiner.classList.add('hide');
    //$favouritesGifsConteiner.classList.remove('main__favourites');
    $createGifConteiner.classList.add('hide');
    $misGifosConteiner.classList.add('hide');
    
};

// * * FAVOURITES SECTION * * //
function displayFavouritesSection() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.matchMedia("(max-width: 779px)").matches) {
        showMenu();
    }
    $favouritesSectionConteiner.classList.remove('hide');
    $favouritesSectionConteiner.classList.add('main__favourites');
    $createGifConteiner.classList.add('hide');
    $heroConteiner.classList.add('hide');
    $heroConteiner.classList.remove('hero__container');
    $trendingTagsConteiner.classList.add('hide');
    $misGifosConteiner.classList.add('hide');
    $trendingGifsConteiner.classList.remove('hide');

    templateFavouriteGifs();
};

// * * MIS GIFOS SECTION * * //

function displayMisGifos() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.matchMedia("(max-width: 779px)").matches) {
        showMenu();
    }
    
    $misGifosConteiner.classList.add('mis_gifos_conteiner');
    $misGifosConteiner.classList.remove('hide');
    $heroConteiner.classList.add('hide');
    $heroConteiner.classList.remove('hero__container');
    $trendingTagsConteiner.classList.add('hide');
    $trendingGifsConteiner.classList.remove('hide');
    $favouritesSectionConteiner.classList.add('hide');
    $createGifConteiner.classList.add('hide');

    templateMisGifos();
};

// * * CREATE GIF SECTION * * //
function displayCreateGif() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    $createGifConteiner.classList.remove('hide');
    $heroConteiner.classList.add('hide');
    $heroConteiner.classList.remove('hero__container');
    $favouritesSectionConteiner.classList.add('hide');
    $favouritesSectionConteiner.classList.remove('main__favourites');
    $trendingTagsConteiner.classList.add('hide');
    $trendingGifsConteiner.classList.add('hide');
    $misGifosConteiner.classList.add('hide');
};