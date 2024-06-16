stat= "";
function setup(){
    canvas = createCanvas(640, 440);
    canvas.center();


    video = createCapture(VIDEO);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Model Status: Detecting Objects...";
    text_box = document.getElementById('text_box').value;
}

function modelLoaded(){
    console.log('Model Loaded!');
    stat = true;
}

function draw(){
    image(video, 0, 0, 640, 440);
}