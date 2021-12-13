let cam;
let poseNet;
let handL, handR;
let img;
let gif;
var song



//Code mostly are from Semester4 interative media week 9 video tutorial//

preload = () =>{
    
    img = loadImage('img/RB.png');
    font = loadFont('Zubilo.otf');
    


  song = loadSound('img/OWS.mp3');


}



setup = () => {
    gif = createImg('img/G.gif');
    yeah = createImg('img/fire.gif');
    a=0;
    b=0;
    a1=-10000;
    b1=-10000;
    check = false;
    ppl= false;
    
    //load sound
    song.setVolume(0.5);
    song.play();


    
    createCanvas(windowWidth, windowHeight);
    
    
    cam = createCapture(VIDEO);
    cam.hide();
    
    //create posenet
    
    poseNet = ml5.poseNet(cam, {
        flipHorizontal: true //flips interaction
    }, modelReady);
    
    poseNet.on('pose', gotPoses);

    handL = createVector(width / 2, height / 2);
    handR = createVector(width / 2, height / 2);

    noStroke();

}


let gotPoses = (poses) => {
    
    //console.log(poses);
    //only detect if there is a human face
    
    if (poses.length > 0) {
        handL.x = lerp(poses[0].pose.keypoints[9].position.x, handL.x, 0.5);
        handL.y = lerp(poses[0].pose.keypoints[9].position.y, handL.y, 0.5);
        handR.x = lerp(poses[0].pose.keypoints[10].position.x, handR.x, 0.5);
        handR.y = lerp(poses[0].pose.keypoints[10].position.y, handR.y, 0.5);
        ppl = true;
    }
    else{
    ppl = false;}
}



let modelReady = () => {
    console.log('model ready');
}



draw = () => {
    
    m = millis();
    //flip the video to match interaction
    push();
    translate(windowWidth, 0);
    scale(-1.0, 1.0);
    
    image(cam, 1000, 0,700,900);
    scale(1.0, 1.0);
    pop();
    

    
    //PoseNet hands
    fill(255);
    ellipse(handL.x, handL.y, 0);
    ellipse(handR.x, handR.y, 0);   // 0 to hide from the screen
    

    //Queen
    image(img, windowWidth/100, windowHeight/4-(530/2), 670,900);
    
    
    yeah.position(a1,b1);
    yeah.size(windowWidth, windowHeight);
  
    
    gif.position(a,b);
    gif.size(700,900);
    
    
    
 if (ppl == true) {
       a=-10000;
       b=-10000;
 }else{
     a=0;
     b=0;
 }


}













