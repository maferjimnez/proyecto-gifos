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
};

const arrayFavouritesStoraged = JSON.parse(localStorage.getItem('FavouriteGifs'));

function templateFavouriteGifs(){
  $favouritesGifContent.innerHTML = '';
//   let arrayFavouritesStoraged = JSON.parse(localStorage.getItem('FavouriteGifs'));
  console.log(arrayFavouritesStoraged);

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
        // let arrayFavouritesStoraged = JSON.parse(localStorage.getItem('FavouriteGifs'));
        // console.log(arrayFavouritesStoraged);      
        

        for (let i = 0; i < arrayFavouritesStoraged.length; i++) {
            $favouritesGifContent.style.justifyContent = "space-between";

            const gifResultContainer = document.createElement('div');
            gifResultContainer.classList.add('gif_result_container');
            gifResultContainer.innerHTML = ` 

            <img class="gif_result" src="${arrayFavouritesStoraged[i].gif}" alt="${arrayFavouritesStoraged[i].title}">
            <section class="gif_content">
            <div class="icons">
                <img class="icon_delete" onclick="removeFromFavourites('${arrayFavouritesStoraged[i].gif}')" src="/assets/icon-trash-normal.svg">
                <img class="icon_download" onclick="downloadGif('${arrayFavouritesStoraged[i].url}','${arrayFavouritesStoraged[i].title}')" src="/assets/icon-download.svg">
                <img class="icon_max" onclick="maximizeGifFromFavourites('${arrayFavouritesStoraged[i].gif}', '${arrayFavouritesStoraged[i].username}', '${arrayFavouritesStoraged[i].title}')" src="/assets/icon-max-normal.svg">               
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
    //let arrayFavouritesStoraged = JSON.parse(localStorage.getItem('FavouriteGifs'));
    for (let i = 0; i < arrayFavouritesStoraged.length; i++)
        if(arrayFavouritesStoraged[i].gif === gif){
            arrayFavouritesStoraged.splice(i, 1);
            localStorage.setItem('FavouriteGifs', JSON.stringify(arrayFavouritesStoraged));
        }
};


// * *   DOWNLOAD  * * //

async function downloadGif(url, title) {
    let blob = await fetch(url).then(img => img.blob());
    invokeSaveAsDialog(blob, title + ".gif");
  };

  // * *   MAX GIF  * * //
  function maximizeGifFromFavourites(gif, username, title) {
    $maxGifConteiner.innerHTML = '';
    $maxGifConteiner.classList.remove('hide');
    $maxGifConteiner.classList.add('max_gif_conteiner');

    const maxGifcontent = document.createElement('div');
    maxGifcontent.classList.add('max_gif_content');
    maxGifcontent.innerHTML = `
                <img class="close_icon" onclick="closeMaxGif()" src="/assets/close.svg" alt="Close icon">
                <img class="main_gif" src="${gif}" alt="">
                <div class="gif_max_details">
                    <div class="gif_max_info">
                        <p class="gifmax_user">${username}</p>
                        <h4 class="gifmax_title">${title}</h4>
                    </div>
                    <div class="gifmax_btns">
                        <img src="/assets/icon-trash-normal.svg" onclick="removeFromFavourites('${gif}')">
                        <img src="/assets/icon-download-hover.svg" onclick=" downloadGif('${gif}', '${title}')">
                    </div>
                </div>`;

    $maxGifConteiner.appendChild(maxGifcontent);
  };

  function closeMaxGif() {
    $maxGifConteiner.classList.add('hide');
    $maxGifConteiner.classList.remove('max_gif_conteiner');
  };