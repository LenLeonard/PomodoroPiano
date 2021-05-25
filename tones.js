import * as Tone from "https://cdn.skypack.dev/tone";


//Pomodoro JS

let start = document.getElementById('start');
let reset = document.getElementById('reset');
let stop = document.getElementById('stop');


let workMinutes = document.getElementById('w_minutes')
let workSeconds = document.getElementById('w_seconds');

let breakMinutes = document.getElementById('b_minutes');
let breakSeconds = document.getElementById('b_seconds');

let startTimer;

//Pomodoro Start Reset Pause

start.addEventListener('click', function(){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000)
    }else {
        alert("You've already started!");
    }
})

reset.addEventListener('click', function(){
        workMinutes.innerText = 25;
        workSeconds.innerText = "00";

        breakMinutes.innerText = 5;
        breakSeconds.innerText = "00";

        document.getElementById('counter').innerText = 0;
        
        stopInterval()
        startTimer = undefined;
        
        overlay.style.display="block";
        pianoHidden = true;
        audioPlayer.pause();

})

stop.addEventListener('click', function(){
    stopInterval()
    startTimer = undefined;

})

//Pomodoro Text Input Counters

  






//Questionable Approach To Seemless Input As Timer Value
//It uses an event listener to listen for Enter and then uses that to update the times

window.addEventListener('keydown', (event) => {
   
      console.log(event.key);
      if(event.key === "Enter"){
      document.getElementById('sessionTime').placeholder="";  
      let sessionTime = document.getElementById('sessionTime').value;
      let strArr = sessionTime.split(":");
      let userStartMin = strArr[0];
      let userStartSec = strArr[1];
      workMinutes.innerText = userStartMin;
      workSeconds.innerText = userStartSec;
      let workTimer = document.getElementById('work-timer');
  workTimer.style.fontSize='30px';
  document.getElementById('sessionTime').value = "";
  document.getElementById('sessionTime').style.caretColor = "transparent";
  startTimer = setInterval(timer, 1000);
  

      console.log(sessionTime);
      console.log(strArr)
      }});

      let textInput = document.getElementById('sessionTime');
textInput.addEventListener('click', function(){
console.log('clicky')
stopInterval()
    startTimer = undefined;
  let workTimer = document.getElementById('work-timer');
  var tempPlaceHolder = workMinutes.innerText + ':' + workSeconds.innerText;
  document.getElementById('sessionTime').placeholder = tempPlaceHolder;
  document.getElementById('sessionTime').style.caretColor = "black";
  workTimer.style.fontSize='0';
});

let body = document.getElementById('body');
body.addEventListener('click', function(){
  if(startTimer === undefined ){
    let workTimer = document.getElementById('work-timer');
    if(workTimer.style.fontSize =='0px'){
    console.log('clicky2')
    
    let currentPlaceHolder = document.getElementById('sessionTime').placeholder;
    console.log(currentPlaceHolder);
    let strArr = currentPlaceHolder.split(":");
    console.log(strArr);
    workMinutes.innerText = strArr[0];
    workSeconds.innerText = strArr[1];
    console.log(workMinutes.innerText + ":" + workSeconds.innerText)
    
    /*workTimer.style.fontSize='30px';
  document.getElementById('sessionTime').value = "";
  document.getElementById('sessionTime').style.caretColor = "transparent";
  startTimer = setInterval(timer, 1000);*/
    

    
    


  }}}); 
  
  /*
  let workTimer = document.getElementById('work-timer');
  if(startTimer === undefined && workTimer.style.fontSize =='0px'){
    workTimer.style.fontSize='30px';
    startTimer = setInterval(timer, 1000);
    
  }
});*/

  
  
  
  
  /*      if(userStartMin !== ""){
    workMinutes.innerText = userStartMin;
  }
  
  let userStartSec = document.getElementById('userStartSec').value;
  if(userStartSec !== ""){
    workSeconds.innerText = userStartSec;
  }

  let userBreakMin = document.getElementById('userBreakMin').value;
  if(userBreakMin !== ""){
    breakMinutes.innerText = userBreakMin;
  }
  let userBreakSec = document.getElementById('userBreakSec').value;
  if(userBreakSec !== ""){
    breakSeconds.innerText = userBreakSec;
  }
  
  document.getElementById('userStartMin').value = ""
  document.getElementById('userStartSec').value = ""
  document.getElementById('userBreakMin').value = ""
  document.getElementById('userBreakSec').value = ""

      }
   });

*/

//Pomodoro Save Settings Functionality

let updateButton = document.getElementById('updateButton');
updateButton.addEventListener('click', function(){
  
  let userStartMin = document.getElementById('userStartMin').value;
  if(userStartMin !== ""){
    workMinutes.innerText = userStartMin;
  }
  
  let userStartSec = document.getElementById('userStartSec').value;
  if(userStartSec !== ""){
    workSeconds.innerText = userStartSec;
  }

  let userBreakMin = document.getElementById('userBreakMin').value;
  if(userBreakMin !== ""){
    breakMinutes.innerText = userBreakMin;
  }
  let userBreakSec = document.getElementById('userBreakSec').value;
  if(userBreakSec !== ""){
    breakSeconds.innerText = userBreakSec;
  }
  
  document.getElementById('userStartMin').value = ""
  document.getElementById('userStartSec').value = ""
  document.getElementById('userBreakMin').value = ""
  document.getElementById('userBreakSec').value = ""

  });

//Start Time Function
function timer(){
    //Work Timer Countdown
    if (workSeconds.innerText != 0){
      
      overlay.style.display="block";
      pianoHidden = true;
      audioPlayer.pause();
        
      workSeconds.innerText--;
        if(workSeconds.innerText < 10){
          workSeconds.innerText = '0' + workSeconds.innerText;
        }
    }else if(workMinutes.innerText != 0 && workSeconds.innerText == 0){
        workSeconds.innerText = 59;
        workMinutes.innerText--;
        
        }
    
    //Break Timer Countdown
    if(workMinutes.innerText == 0 && workSeconds.innerText == 0){
      
      overlay.style.display="none";
      pianoHidden = false;
      audioPlayer.play();
      
        if(breakSeconds.innerText != 0){
            breakSeconds.innerText--;
            if(breakSeconds.innerText < 10){
              breakSeconds.innerText = '0' + breakSeconds.innerText;
            }
        } else if(breakMinutes.innerText !=0 && breakSeconds.innerText == 0){
            breakSeconds.innerText = 59;
            breakMinutes.innerText--;
        }

    }
    //Increment Counter by one if one full cyle is completed
    if(workMinutes.innerText == 0 && workSeconds.innerText == 0 && breakSeconds.innerText == 0){
        workMinutes.innerText = 25;
        workSeconds.innerText = "00";

        breakMinutes.innerText = 5;
        breakSeconds.innerText = "00";

        document.getElementById('counter').innerText++;

    }
}
//Stop Time Function
function stopInterval(){
    clearInterval(startTimer);
}




//Piano JS

function playNote(note) {
  if (pianoHidden === false){
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(note, "8n");
  
  /*Darkens the keys upon trigger.*/
  
  document.getElementById(note).classList.add("active");
    setTimeout(function(){ document.getElementById(note).classList.remove("active");}, 120);
  }
}

//so you can click on a note for its tone
document.getElementById("C4").addEventListener("click", function(){ playNote('C4'); });
document.getElementById("Db4").addEventListener("click", function(){ playNote('Db4'); });
document.getElementById("D4").addEventListener("click", function(){ playNote('D4'); });
document.getElementById("Eb4").addEventListener("click", function(){ playNote('Eb4'); });
document.getElementById("E4").addEventListener("click", function(){ playNote('E4'); });
document.getElementById("F4").addEventListener("click", function(){ playNote('F4'); });
document.getElementById("Gb4").addEventListener("click", function(){ playNote('Gb4'); });
document.getElementById("G4").addEventListener("click", function(){ playNote('G4'); });
document.getElementById("Ab4").addEventListener("click", function(){ playNote('Ab4'); });
document.getElementById("A4").addEventListener("click", function(){ playNote('A4'); });
document.getElementById("Bb4").addEventListener("click", function(){ playNote('Bb4'); });
document.getElementById("B4").addEventListener("click", function(){ playNote('B4'); });
document.getElementById("C5").addEventListener("click", function(){ playNote('C5'); });
document.getElementById("Db5").addEventListener("click", function(){ playNote('Db5'); });
document.getElementById("D5").addEventListener("click", function(){ playNote('D5'); });
document.getElementById("Eb5").addEventListener("click", function(){ playNote('Eb5'); });
document.getElementById("E5").addEventListener("click", function(){ playNote('E5'); });
document.getElementById("F5").addEventListener("click", function(){ playNote('F5'); });

//Piano Display Toggle

let pianoHidden = true;

let revealPianoBtn = document.getElementById('revealPiano');
let hidePianoBtn = document.getElementById('hidePiano');

let overlay = document.getElementById('pianoOverlay');

hidePianoBtn.addEventListener('click', function(){
  overlay.style.display="block";
  pianoHidden = true;
  audioPlayer.pause();
  if(startTimer === undefined){
    startTimer = setInterval(timer, 1000)
};
});

revealPianoBtn.addEventListener('click', function(){
  overlay.style.display="none";
  pianoHidden = false;
  audioPlayer.play();
  stopInterval()
    startTimer = undefined;
});


//Computer keys as musical keys functionality

window.addEventListener('keydown', (event) => {
  const pianoKeys = ["a","w","s","e","d","f","t","g","y","h","u","j","k","o","l","p",";","'"];
  const keyMap = [
    {
       key: 'a',
       note: 'C4'
    },
    {
       key: 'w',
       note: 'Db4'
    },
    {
       key: 's',
       note: 'D4'
    },
    {
      key: 'e',
      note: 'Eb4'
   },
   {
      key: 'd',
      note: 'E4'
   },
   {
      key: 'f',
      note: 'F4'
   },
   {
    key: 'f',
    note: 'Gb4'
},
 {
    key: 't',
    note: 'Gb4'
 },
 {
    key: 'g',
    note: 'G4'
 },
 {
  key: 'y',
  note: 'Ab4'
},
{
  key: 'h',
  note: 'A4'
},
{
  key: 'u',
  note: 'Bb4'
},
{
  key: 'j',
  note: 'B4'
},
{
  key: 'k',
  note: 'C5'
},
{
  key: 'o',
  note: 'Db5'
},
{
  key: 'l',
  note: 'D5'
},
{
  key: 'p',
  note: 'Eb5'
},
{
  key: ';',
  note: 'E5'
},
{
  key: "'",
  note: 'F5'
},
    
  ];

  if(pianoKeys.includes(event.key)){
    let keyStroke = event.key;
    console.log(keyStroke);
    const found = keyMap.find(keyStroke => keyStroke.key === event.key);
    console.log(found);
    let keyNote = found.note;
    console.log(keyNote);
    playNote(keyNote);
    
    
  }
    
});

//Jam Track Loop JS
let audioPlayer = document.getElementById("jamTrack");
audioPlayer.loop = true;
audioPlayer.load();





