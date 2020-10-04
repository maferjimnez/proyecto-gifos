// ! TRENDING TAGS

async function getTrendingTag (){
    await fetch (`https://api.giphy.com/v1/trending/searches?${apiKey}`)
          .then(response => response.json())
          .then((response) => templateTrendingTags(response))
          .catch ((error) => console.log(error));
};
getTrendingTag();

function templateTrendingTags(response){
    window.scrollTo(0, 456);
    
    for (i = 0; i < 5; i++){
        let $trendingTag = document.createElement('span');
        $trendingTag.classList.add('trending_tags');
        $trendingTag.innerHTML = response.data[i];
        $trendingTag.setAttribute('onclick',`searchGif("${response.data[i]}")`);
        
        $trendingTagsContent.appendChild($trendingTag);
    }    
};


// ! TRENDING GIFS

async function getTrendingGif() {
    await fetch(`${trendingEndpointWithApiKey}&limit=12&rating=g`)
        .then((response) => response.json())
        .then((trendings) => {
            console.log(trendings);
             templateTrendingGifs(trendings);
        })
        .catch((err) => console.error(err));
};
getTrendingGif();


const templateTrendingGifs = (trendings) => {
	for (let i = 0; i < trendings.data.length; i++) {
		const trendingGifsContainer = document.createElement('div');
		trendingGifsContainer.classList.add('trending_gif_content');
		trendingGifsContainer.innerHTML = ` 
        <img class="trendingGif_result" src="${trendings.data[i].images.original.url}" alt="${trendings.data[i].title}">
        <section class="trendingGif_info">
        <div class="icons">
            <img class="icon_fav" src="/assets/icon-fav.svg" alt="" srcset="">
            <img class="icon_download" src="/assets/icon-download.svg" alt="">
            <img class="icon_max" src="/assets/icon-max-normal.svg" alt="">               
        </div>
        <div class="details">
            <p class="gif_user">${trendings.data[i].username}</p>
            <h4 class="gif_title">${trendings.data[i].title}</h4>                          
        </div>
        </section>
		`;
		$trendingGifsSlider.appendChild(trendingGifsContainer);
	}
};

function slideNext() {
    $trendingGifsSlider.scrollLeft += 500;
};

function slidePrevious(){
    $trendingGifsSlider.scrollLeft -= 500;
};

$btnArrowNext.addEventListener('click', slideNext);
$btnArrowPrevious.addEventListener('click',slidePrevious);