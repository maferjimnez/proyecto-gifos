// ! FAVOURITES

let arrayFavourites;
if (localStorage.getItem('FavouriteGifs') === null) {
    arrayFavourites = [];
} else {
    arrayFavourites = JSON.parse(localStorage.getItem('FavouriteGifs'));
};

function addGifToFavourites(gif, username, title) {
   
    let objFavGifs = {
        gif : gif,
        username : username,
        title : title
    };

    arrayFavourites.push(objFavGifs);
    console.log(arrayFavourites);

    localStorage.setItem('FavouriteGifs', JSON.stringify(arrayFavourites));
    //templateFavouriteGifs();
};


function templateFavouriteGifs(){
    $favouritesGifsConteiner.innerHTML = '';

    if (localStorage.getItem('FavouriteGifs') === null) {
        const favouritesWithoutContent = document.createElement('section');
        favouritesWithoutContent.classList.add('favourites_noContent_conteiner');
        favouritesWithoutContent.innerHTML= `<img class="noContent_heart" src="/assets/icon-fav-sin-contenido.svg" alt="Icono corazón sin contenido">
                                            <h3 class="noContent_paragraph">¡Guarda tu primer GIFO en Favoritos 
                                            <br> que se muestre aquí!</h3>
                                            `;
       $favouritesSectionConteiner.appendChild(favouritesWithoutContent);

 
    } else {
        const arrayFavouritesStoraged = JSON.parse(localStorage.getItem('FavouriteGifs'));
        console.log(arrayFavouritesStoraged);      
        

        for (let i = 0; i < arrayFavouritesStoraged.length; i++) {
            
            const gifResultContainer = document.createElement('div');
            gifResultContainer.classList.add('gif_result_container');
            gifResultContainer.innerHTML = ` 

            <img class="gif_result" src="${arrayFavouritesStoraged[i].gif}" alt="${arrayFavouritesStoraged[i].title}">
            <section class="gif_content">
            <div class="icons">
                <img class="icon_fav" onclick="addGifToFavourites('${arrayFavouritesStoraged[i].gif}','${arrayFavouritesStoraged[i].username}','${arrayFavouritesStoraged[i].title}')" src="/assets/icon-fav.svg" alt="" srcset="">
                <img class="icon_download" onclick="downloadGif('${arrayFavouritesStoraged[i].url}','${arrayFavouritesStoraged[i].title}')" src="/assets/icon-download.svg" alt="">
                <img class="icon_max" src="/assets/icon-max-normal.svg" alt="">               
            </div>
            <div class="details">
                <p class="gif_user">${arrayFavouritesStoraged[i].username}</p>
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