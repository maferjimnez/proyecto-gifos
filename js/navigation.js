// * *     HOME PAGE       * * //
function displayHomePage() {
    $heroConteiner.classList.remove('hide');
    $heroConteiner.classList.add('hero__container');
    $trendingTagsConteiner.classList.remove('hide');
    $trendingGifsConteiner.classList.remove('hide');
    $favouritesSectionConteiner.classList.add('hide');
    //$favouritesGifsConteiner.classList.remove('main__favourites');
    $createGifConteiner.classList.add('hide');
    //mis gifos hide

};


// * * FAVOURITES SECTION * * //
function displayFavouritesSection() {
    $favouritesSectionConteiner.classList.remove('hide');
    $favouritesGifsConteiner.classList.add('main__favourites');
    $createGifConteiner.classList.add('hide');
    $heroConteiner.classList.add('hide');
    $heroConteiner.classList.remove('hero__container');
    $trendingTagsConteiner.classList.add('hide');

    templateFavouriteGifs()
};

// * * MIS GIFOS SECTION * * //

function displayMisGifos() {
    
};

// * * CREATE GIF SECTION * * //
function displayCreateGif() {
    $createGifConteiner.classList.remove('hide');
    $heroConteiner.classList.add('hide');
    $heroConteiner.classList.remove('hero__container');
    $favouritesSectionConteiner.classList.add('hide');
    $favouritesGifsConteiner.classList.remove('main__favourites');
    $trendingTagsConteiner.classList.add('hide');
    $trendingGifsConteiner.classList.add('hide');
};