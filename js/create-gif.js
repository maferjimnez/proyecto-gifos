let recorder;

function recordVideo (){
    $startBtn.classList.remove('buttons_central');
    $startBtn.classList.add('hide');

    $titleVideo.innerHTML = '¿Nos das acceso </br>a tu cámara?';
    $paragraphVideo.innerHTML = 'El acceso a tu camara será válido sólo </br>por el tiempo en el que estés creando el GIFO.';
    $stepOne.style.backgroundColor = "#572EE5";  // ! hacer una class con estos estilos así es más isi
    $stepOne.style.color = "white";


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
        $stepOne.style.backgroundColor = "white";
        $stepOne.style.color = "#572EE5";
        $stepTwo.style.backgroundColor = "#572EE5";
        $stepTwo.style.color = "white";


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
 
$startBtn.addEventListener('click', recordVideo);

function startRecordingGif() {
    $recordBtn.style.display = "none";
    $recordingTimer.classList.remove('hide');
    $recordingTimer.classList.add('recording_timer');

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
$recordBtn.addEventListener('click', startRecordingGif);

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

