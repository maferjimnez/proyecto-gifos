let recorder;
let form = new FormData();

function recordVideo (){
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

    $
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
}


// * * EVENTS * * //
$startBtn.addEventListener('click', recordVideo);
$recordBtn.addEventListener('click', startRecordingGif);
$stopBtn.addEventListener('click', stopRecordingGif);
