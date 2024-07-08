stats= "";
objects = [];
speech = window.speechSynthesis;
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
    stats = true;
    objectDetector.detect(video, gotResults);
}

function draw(){
    image(video, 0, 0, 640, 440);

    if(stats != ""){
        for(i=0; i<objects.length; i++){
            confidence = floor(objects[i].confidence * 100);
            text(objects[i].label + " ", confidence + "%", objects[i].x, objects[i].y);
            fill("#FF0000");
            stroke("#FF0000");
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == text_box){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById('model_status').innerHTML = "Object Mentioned Found.";
                utterThis = new SpeechSynthesisUtterance("Object mentioned found.");
                speech.speak(utterThis);
                
            }else{
                document.getElementById('model_status').innerHTML = "Object Mentioned Not Found.";
            }
        }
    }
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
        console.log(results);
        objects = results;
}