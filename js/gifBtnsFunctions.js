// ! FAVOURITES

$favouritesGifsConteiner = document.querySelector('.favourites_gifs_gallery');

let arrayFavourites = [];

function addGifToFavourites(gif, username, title) {

    let objectFavGifs = {
        gif : gif,
        username : username,
        title : title
    };

    arrayFavourites.push(objectFavGifs);
    console.log(objectFavGifs);

    localStorage.setItem('FavouriteGifs', JSON.stringify(arrayFavourites));
};


function templateFavouriteGifs(){
    //$favouritesGifsConteiner.innerHTML = '';

    if (localStorage.getItem('FavouriteGifs', arrayFavourites) === null) {
        // acá va el "error"
    } else {
        const arrayFavouritesStoraged = JSON.parse('FavouriteGifs', arrayFavourites);
        console.log(arrayFavouritesStoraged);      


        for (let i = 0; i < arrayFavouritesStoraged.length; i++) {
            const gifResultContainer = document.createElement('div');
            gifResultContainer.classList.add('gif__container');
            gifResultContainer.innerHTML = ` 

            <img class="gif_result" src="${arrayFavouritesStoraged[i].gif}" alt="${arrayFavouritesStoraged[i].title}">
            <section class="gif_content">
            <div class="icons">
                <img class="icon_fav" onclick="addGifToFavourites('${arrayFavouritesStoraged[i].gif}','${arrayFavouritesStoraged[i].username}','${arrayFavouritesStoraged[i].title}')" src="/assets/icon-fav.svg" alt="" srcset="">
                <img class="icon_download" onclick="downloadGif('${result.data[i].images.original.url}','${arrayFavouritesStoraged[i].title}')" src="/assets/icon-download.svg" alt="">
                <img class="icon_max" src="/assets/icon-max-normal.svg" alt="">               
            </div>
            <div class="details">
                <p class="gif_user">${result.data[i].username}</p>
                <h4 class="gif_title">${arrayFavouritesStoraged[i].title}</h4>                          
            </div>
            </section>`;
            $favouritesGifsConteiner.appendChild(gifResultContainer);
        }
    }
};


// !  DOWNLOAD

async function downloadGif(url, title) {
    let blob = await fetch(url).then(img => img.blob());
    invokeSaveAsDialog(blob, title + ".gif");
  };