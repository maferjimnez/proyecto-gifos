// ! TRENDING TAGS

$trendingTagsConteiner = document.querySelector('#trending__tags__container');
$trendingTagsContent = document.querySelector('#tags__content');

async function trendingFetch (){
    await fetch (`https://api.giphy.com/v1/trending/searches?${apiKey}`)
          .then(response => response.json())
          .then((response) => templateTrendingTags(response))
          .catch ((error) => console.log(error));
};
trendingFetch();

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

// estilox chulos
// .trending_tags {
//     &::after {
//         content: ',';
//     }
//     &:last-child::after {
//         content: ' ';
//     }
// };