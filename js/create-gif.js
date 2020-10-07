$userVideo = document.querySelector('#user_video');
$titleVideo = document.querySelector('#title_texts');
$paragraphVideo = document.querySelector('#paragraph_central');
$startBtn = document.querySelector('#start_btn');
$recordBtn = document.querySelector('#record_btn');
$stepOne = document.querySelector('#step_1');

let recorder;

function recordVideo (){
    $startBtn.style.display = "none";
    $titleVideo.innerHTML = '¿Nos das acceso </br>a tu cámara?';
    $paragraphVideo.innerHTML = 'El acceso a tu camara será válido sólo </br>por el tiempo en el que estés creando el GIFO.';
    $stepOne.style.backgroundcolor = "#572EE5";
    $stepOne.style.color = "white";


    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
           height: { max: 480 }
        }
     })
     .then(function(stream) {
        $userVideo.classList.remove('hide');
        $userVideo.srcObject = stream;
        $userVideo.onloadedmetadata = function (e) {
            $userVideo.play();
        };

        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
             console.log('started')
           },
          });
});
};        
 
$startBtn.addEventListener('click', recordVideo);

function startRecordingGif() {
    recorder.startRecording();
    console.log();
};

$recordBtn.addEventListener('click', startRecordingGif);

