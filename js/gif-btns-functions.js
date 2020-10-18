// * *   FAVOURITES  * * //

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
    templateFavouriteGifs();
};


function templateFavouriteGifs(){
    const arrayFavouritesStoraged = JSON.parse(localStorage.getItem('FavouriteGifs'));
    console.log(arrayFavouritesStoraged);      
    $favouritesGifContent.innerHTML = '';

    if (arrayFavouritesStoraged == 0 || arrayFavouritesStoraged == null) {
        $favouritesGifContent.style.justifyContent = "center";
        const favouritesWithoutContent = document.createElement('section');
        favouritesWithoutContent.classList.add('favourites_noContent_conteiner');
        favouritesWithoutContent.innerHTML= `<img class="noContent_heart" src="/assets/icon-fav-sin-contenido.svg" alt="Icono corazón sin contenido">
                                            <h3 class="noContent_paragraph">¡Guarda tu primer GIFO en Favoritos 
                                            <br> que se muestre aquí!</h3>
                                            `;
        $favouritesGifContent.appendChild(favouritesWithoutContent);

 
    } else {
        

        for (let i = 0; i < arrayFavouritesStoraged.length; i++) {
            $favouritesGifContent.style.justifyContent = "space-between";

            const gifResultContainer = document.createElement('div');
            gifResultContainer.classList.add('gif_result_container');
            gifResultContainer.innerHTML = ` 

            <img class="gif_result" onclick="maximizeGif('${arrayFavouritesStoraged[i].gif}', '${arrayFavouritesStoraged[i].username}', '${arrayFavouritesStoraged[i].title}')" src="${arrayFavouritesStoraged[i].gif}" alt="${arrayFavouritesStoraged[i].title}">
            <section class="gif_content">
            <div class="icons">
                <div class="icon icon_delete" onclick="removeFromFavourites('${arrayFavouritesStoraged[i].gif}')" src="/assets/icon-trash-normal.svg"></div>
                <div class="icon icon_download" onclick="downloadGif('${arrayFavouritesStoraged[i].url}','${arrayFavouritesStoraged[i].title}')" src="/assets/icon-download.svg"></div>
                <div class="icon icon_max" onclick="maximizeGif('${arrayFavouritesStoraged[i].gif}', '${arrayFavouritesStoraged[i].username}', '${arrayFavouritesStoraged[i].title}')" src="/assets/icon-max-normal.svg"></div>               
            </div>
            <div class="details">
                <p class="gif_user">${arrayFavouritesStoraged[i].username}</p>
                <h4 class="gif_title">${arrayFavouritesStoraged[i].title}</h4>                          
            </div>
            </section>`;
            $favouritesGifContent.appendChild(gifResultContainer);
        }
    }
};

function removeFromFavourites(gif) {
    for (let i = 0; i < arrayFavourites.length; i++)
        if(arrayFavourites[i].gif === gif){
            arrayFavourites.splice(i, 1);
            localStorage.setItem('FavouriteGifs', JSON.stringify(arrayFavourites));
        }
        templateFavouriteGifs();
};


// * *   DOWNLOAD  * * //

async function downloadGif(url, title) {
    let blob = await fetch(url).then(img => img.blob());
    invokeSaveAsDialog(blob, title + ".gif");
  };

  // * *   MAX GIF  * * //
  function maximizeGif(gif, username, title) {
    $maxGifConteiner.classList.remove('hide');
    $maxGifConteiner.classList.add('max_gif_conteiner');
    $maxGif.src = gif;
    $maxGifUser.innerHTML = username;
    $maxGifTitle.innerHTML = title;

    if (arrayFavourites.find((element) => element.gif === gif) == undefined) {
        $maxFavIcon.src = "/assets/icon-fav-hover.svg";
        $maxFavIcon.addEventListener("click", () => {
            
            addGifToFavourites(gif, username, title);
            maximizeGif(gif, username, title);
        });

    } else {
        $maxFavIcon.src = "/assets/icon-trash-normal.svg";
        $maxFavIcon.addEventListener("click", () => {
            removeFromFavourites(gif);
            maximizeGif(gif, username, title);
        });
    }
  };

  function closeMaxGif() {
    $maxGifConteiner.classList.add('hide');
    $maxGifConteiner.classList.remove('max_gif_conteiner');
  };