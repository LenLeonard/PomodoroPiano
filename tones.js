import * as Tone from "https://cdn.skypack.dev/tone";

//Pomodoro JS

let start = document.getElementById('start');
let reset = document.getElementById('reset');
let stop = document.getElementById('stop');

let workMinutes = document.getElementById('w_minutes');
let workSeconds = document.getElementById('w_seconds');

let breakMinutes = document.getElementById('b_minutes');
let breakSeconds = document.getElementById('b_seconds');

let startTimer;

start.addEventListener('click', function(){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000)
    }else {
        alert("Timer is already running");
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

})

stop.addEventListener('click', function(){
    stopInterval()
    startTimer = undefined;

})

//Start Time Function
function timer(){
    //Work Timer Countdown
    if (workSeconds.innerText != 0){
        workSeconds.innerText--;
    }else if(workMinutes.innerText != 0 && workSeconds.innerText == 0){
        workSeconds.innerText = 59;
        workMinutes.innerText--;
    }
    //Break Timer Countdown
    if(workMinutes.innerText == 0 && workSeconds.innerText == 0){
        if(breakSeconds.innerText != 0){
            breakSeconds.innerText--;
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


export function playNote(note) {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(note, "8n");
  
  /*Darkens the keys upon trigger.*/
  
  document.getElementById(note).classList.add("active");
    setTimeout(function(){ document.getElementById(note).classList.remove("active");}, 120);
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