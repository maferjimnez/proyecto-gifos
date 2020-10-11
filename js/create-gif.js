let recorder;
let form = new FormData();
let arrUserGifos = [];

function recordVideo(){
    $startBtn.classList.remove('buttons_central');
    $startBtn.classList.add('hide');

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
        $recordBtn.classList.add('buttons_central');
        $recordBtn.classList.remove('hide');
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

function stopRecordingGif(){
    $userVideo.classList.add('hide');

    recorder.stopRecording(() => {
        blob = recorder.getBlob();
        $userGif.src = URL.createObjectURL(blob);
    
        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'));
    });

    $stopBtn.classList.add('hide');
    $stopBtn.classList.remove('buttons_central');
    $uploadBtn.classList.remove('hide');
    $uploadBtn.classList.add('buttons_central');
    $recordAgainBtn.classList.remove('hide');
    $recordAgainBtn.classList.add('record_again');
    $recordingTimer.classList.add('hide');
    $recordingTimer.classList.remove('recording_timer');

    //clearTimeout(calculateRecordingTime);
    $recordingTimer.innerHTML = '00:00:00';
};

async function  uploadGif() {
    $uploadBtn.classList.add('hide');
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
            let userGifId = userGif.data.id;
            console.log(userGif.data.id);

            $overlayIcon.src = '/assets/check.svg';
            $overlayText.innerHTML = ' GIFO subido con éxito';
            $overlayActionBtns.classList.remove('hide');
            $overlayActionBtns.classList.add('actions_overlay');

            arrUserGifos.push(userGifId);
            console.log(arrUserGifos);

            userGifos =localStorage.setItem('UserGifs', JSON.stringify(arrUserGifos));
        })

        .catch((err) => {
			console.error(err);
		});
    
};
$uploadBtn.addEventListener('click', uploadGif);


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
}


// * * EVENTS * * //
$startBtn.addEventListener('click', recordVideo);
$recordBtn.addEventListener('click', startRecordingGif);
$stopBtn.addEventListener('click', stopRecordingGif);
$recordAgainBtn.addEventListener('click', recordVideo); // ! ver cómo arreglar esto para no hacer otra función