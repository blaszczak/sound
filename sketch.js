/*
 * @name Playback Rate
 * @description <p>Load a SoundFile and map its playback rate to
 * mouseY, volume to mouseX. Playback rate is the speed with
 * which the web audio context processings the sound file information.
 * Slower rates not only increase the duration of the sound, but also
 * decrease the pitch because it is being played back at a slower frequency.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * a sound file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */


  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL =  'https://teachablemachine.withgoogle.com/models/8HhwqVSd/';  //'./my_model/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";




// A sound file object
var song;

function preload() {
  // Load the model first
      classifier = ml5.imageClassifier(imageModelURL + 'model.json');

  // Load a sound file
  // song = loadSound('assets/Damscray_DancingTiger.mp3');
  song = loadSound('assets/s0.mp3');
}

function setup() {
  createCanvas(710, 400);

     // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();

  
  // Loop the sound forever
  // (well, at least until stop() is called)
  song.loop();
}

function draw() {
  background(200,180,200);
 
   let emoji = "👱‍";
  let n = 1;
  
  if (label == "DB") {
    emoji = "👱‍";
    n = 1;
  } else if (label == "Kubek") {
    emoji = "🥃";
    n = 0.5;
  } else if (label == "rekaw") {
    emoji = "💪";
    n = 2;
  }

  // Set the volume to a range between 0 and 1.0
  var volume = map(mouseX, 0, width, 0, 1);
  volume = constrain(volume, 0, 1);
  song.amp(volume);

  // Set the rate to a range between 0.1 and 4
  // Changing the rate alters the pitch
  var speed = map(mouseY, 0.1, height, 0, 2)*n;
  speed = constrain(speed, 0.01, 8);
  song.rate(speed);

 
  // Draw some circles to show what is going on
  stroke(10);
  fill(120, 40, 35, 100);
  ellipse(mouseX, 100, 50, 20);
  textSize(20);
  text(emoji, mouseX, 100);

  stroke(230);
  fill(60,50,120, 100);
  ellipse(100, mouseY, 20, 50);
  text(emoji, 100, mouseY);

}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}


  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
     console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }

function touchStarted(){
  if (getAudioContext().state !== 'running'){
   getAudioContext().resume(); 
  }
}