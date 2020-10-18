let recorder;
let form = new FormData();
let arrUserGifos = [];

function recordVideo(){
    $startBtn.classList.remove('buttons_central');
    $startBtn.classList.add('hide');
    $recordBtn.classList.add('buttons_central');
    $recordBtn.style.display = "block";

    $titleVideo.innerHTML = '¿Nos das acceso </br>a tu cámara?';
    $paragraphVideo.innerHTML = 'El acceso a tu camara será válido sólo </br>por el tiempo en el que estés creando el GIFO.';
   
    $stepOne.classList.remove('step_btn_central');
    $stepOne.classList.add('step_btn_central_active');


    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
           height: { max: 240 }
        }
     })

     .then(function(stream) {
        $textScreenConteiner.classList.add('hide');
        $userVideo.classList.remove('hide');
        $videoConteiner.classList.remove('hide');
        $videoConteiner.classList.add('video_conteiner');

        $stepOne.classList.remove('step_btn_central_active');
        $stepOne.classList.add('step_btn_central');
        $stepTwo.classList.remove('step_btn_central');
        $stepTwo.classList.add('step_btn_central_active');


        $userVideo.srcObject = stream;
        $userVideo.onloadedmetadata = function (e) {
            $userVideo.play();
        };

        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 320,
            height: 240,
            onGifRecordingStarted: function() {
             console.log('started')
           },
          });
});
};        
 

function startRecordingGif() {
    $recordBtn.style.display = "none";
    $recordingTimer.classList.remove('hide');
    $recordingTimer.classList.add('recording_timer');
    $stopBtn.classList.remove('hide');
    $stopBtn.classList.add('buttons_central');

    recorder.startRecording();
    console.log();

    dateStarted = new Date().getTime();

    (function looper() {
        if (!recorder) {
            return;
        }
        $recordingTimer.innerHTML = calculateRecordingTime((new Date().getTime() - dateStarted) / 1000);
        setTimeout(looper, 1000);
    })();

};

$downloadBtn = document.querySelector('#downloadBtn');
function stopRecordingGif(){
    $userVideo.classList.add('hide');
    $userGif.classList.remove('hide');
    recorder.stopRecording(() => {
        blob = recorder.getBlob();
        $userGif.src = URL.createObjectURL(blob);
     
        $downloadBtn.onclick = () => downloadGif(URL.createObjectURL(blob), 'My_Gifo');
    
        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'));
    });

    $stopBtn.classList.add('hide');
    $stopBtn.classList.remove('buttons_central');
    // $uploadBtn.classList.remove('hide');
    $uploadBtn.classList.add('buttons_central');
    $uploadBtn.style.display = 'block';
    $recordAgainBtn.classList.remove('hide');
    $recordAgainBtn.classList.add('record_again');
    $recordingTimer.classList.add('hide');
    $recordingTimer.classList.remove('recording_timer');

    //clearTimeout(calculateRecordingTime);
    $recordingTimer.innerHTML = '00:00:00';
};

async function  uploadGif() {
    $uploadBtn.style.display = 'none';
    $uploadBtn.classList.remove('buttons_central');
    $recordAgainBtn.classList.add('hide');
    $recordAgainBtn.classList.remove('record_again');

    $stepTwo.classList.remove('step_btn_central_active');
    $stepTwo.classList.add('step_btn_central');
    $stepThree.classList.remove('step_btn_central');
    $stepThree.classList.add('step_btn_central_active');
    
    $videoOverlay.classList.remove('hide');
    $videoOverlay.classList.add('video_overlay');

    await fetch (`${uploadEndpointWithApiKey}`, {
		method: 'POST',
		body: form,
    })

        .then((response) => response.json())
        .then((userGif) => {

            console.log(userGif);

            let userGifId = userGif.data.id;
            console.log(userGif.data.id);

            $overlayIcon.src = '/assets/check.svg';
            $overlayText.innerHTML = ' GIFO subido con éxito';
            $overlayActionBtns.classList.remove('hide');
            $overlayActionBtns.classList.add('actions_overlay');

            arrUserGifos.push(userGifId);
            console.log(arrUserGifos);

            localStorage.setItem('UserGifs', JSON.stringify(arrUserGifos));
        })

        .catch((err) => {
			console.error(err);
		});
    
};

function templateMisGifos()  {
    $misGifosContent.innerHTML = '';

    arrUserGifos = JSON.parse(localStorage.getItem('UserGifs'));
    console.log(arrUserGifos);

    if (arrUserGifos == 0) {
        arrUserGifos = [];
        
        $misGifosContent.style.justifyContent = "center";
        const misGifosWithoutContent = document.createElement('section');
        misGifosWithoutContent.classList.add('mis_gifos_noContent_conteiner');
        misGifosWithoutContent.innerHTML= `<img class="noContent_face" src="/assets/icon-mis-gifos-sin-contenido.svg" alt="Icono carita">
                                            <h3 class="noContent_paragraph">¡Anímate a crear tu primer GIFO!</h3>
                                            `;
        $misGifosContent.appendChild(misGifosWithoutContent);


    } else {
        for (let i = 0; i < arrUserGifos.length; i++) {
            fetch(
                `${getGifByIdEndpoint}?ids=${arrUserGifos[i]}&${apiKey}`
            )
                .then((response) => response.json())
                .then((misGifosGiphy) => {
                    console.log(misGifosGiphy);
                    console.log(typeof misGifosGiphy.data[0].id);

                    $misGifosContent.style.justifyContent = "space-between";

                    const gifContainer = document.createElement('div');
                    gifContainer.classList.add('gif_result_container');
                    gifContainer.innerHTML = `

                    <img class="gif_result" onclick="maximizeGifFromFavourites('${misGifosGiphy.data[0].images.original.url}','User', 'Home-made GIFO')" src="${misGifosGiphy.data[0].images.original.url}" alt="GIFO creado por usuario">
                    <section class="gif_content">
                    <div class="icons">
                        <div class="icon icon_delete" onclick="removeFromMisGifos('${misGifosGiphy.data[0].id}')" src="/assets/icon-trash-normal.svg"></div>
                        <div class="icon icon_download" onclick="downloadGif('${misGifosGiphy.data[0].images.original.url}', gif)" src="/assets/icon-download.svg" alt=""></div>
                        <div class="icon icon_max" onclick="maximizeGifFromFavourites('${misGifosGiphy.data[0].images.original.url}','User', 'Home-made GIFO')" src="/assets/icon-max-normal.svg" alt=""></div>               
                    </div>
                    <div class="details">
                        <p class="gif_user">User</p>
                        <h4 class="gif_title">Home-made GIFO</h4>                          
                    </div>
                    </section>`;
                    $misGifosContent.appendChild(gifContainer);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
};

function removeFromMisGifos(userGif) {
    arrUserGifos = JSON.parse(localStorage.getItem('UserGifs'));
    for (let i = 0; i < arrUserGifos.length; i++) {
        if (arrUserGifos[i] == userGif) {
            arrUserGifos.splice(i, 1);
            localStorage.setItem('UserGifs', JSON.stringify(arrUserGifos));
        }
        
    }
    displayMisGifos();
};




function calculateRecordingTime(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    return hr + ':' + min + ':' + sec;
};


// * * EVENTS * * //
$startBtn.addEventListener('click', recordVideo);
$recordBtn.addEventListener('click', startRecordingGif);
$stopBtn.addEventListener('click', stopRecordingGif);
$recordAgainBtn.addEventListener('click', () => {
    $uploadBtn.style.display = 'none';
    $userGif.classList.add('hide');
    recorder.clearRecordedData();
    recordVideo();

} );
$uploadBtn.addEventListener('click', uploadGif);