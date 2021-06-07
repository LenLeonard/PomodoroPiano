import {Synth} from "https://cdn.skypack.dev/tone";
import {timer, stopInterval} from "./timerlogic.js";

//Pomodoro JS

//Grabbing the button elements from the HTML
let start = document.getElementById("start");
let reset = document.getElementById("reset");
let stop = document.getElementById("stop");

//Grabbing the work minutes and seconds
let workMinutes = document.getElementById("w_minutes");
let workSeconds = document.getElementById("w_seconds");

//Grabbing the break minutes and seconds
let breakMinutes = document.getElementById("b_minutes");
let breakSeconds = document.getElementById("b_seconds");

//Declaring the time as undefined; the setInterval() function is called when it startTimer is defined
let startTimer;
//Logic for Pomodoro Start, Reset, and Pause Buttons

//This boolean value is for siginalling when a time has been entered but the clock has not started
let waitingToStart = true;

start.addEventListener("click", function () {
  if (startTimer === undefined) {
    startTimer = setInterval(function(){timer(workSeconds,workMinutes,breakSeconds,breakMinutes)}, 1000);
    waitingToStart = false;
  } else {
    alert("You've already started!");
  }
});

reset.addEventListener("click", function () {
  //Update clock text
  workMinutes.innerText = 25;
  workSeconds.innerText = "00";
  breakMinutes.innerText = 5;
  breakSeconds.innerText = "00";
  document.getElementById("counter").innerText = 0;
  waitingToStart = true

  //Stop timer
  stopInterval(startTimer);
  startTimer = undefined;
  waitingToStart = true

  //Hide piano and pause backing track
  hidePiano();
});

stop.addEventListener("click", function () {
  stopInterval(startTimer);
  startTimer = undefined;
  waitingToStart = true
});

//Pomodoro Text Input Counters

//Seemless Input As Timer Value
//It uses an event listener to listen for Enter and then uses that to update the times
//and then uses font stylings to swap out the clock text from the text input text

//Configure the form to send input when enter key is triggered, and check that input against a regular expression

workTimeInput.addEventListener("keyup", function (event) {
  
    const timeRegex = /\d{0,2}:\d{2}$/;
    let timerValue = event.target.value;

    //Update clock text if regex test is successful
    if (timeRegex.test(timerValue) === true) {
      let strArr = timerValue.split(":");
      let userStartMin = strArr[0];
      let userStartSec = strArr[1];
      workMinutes.innerText = userStartMin;
      workSeconds.innerText = userStartSec;
      

      //Hide Input Form and Start Clock(clock starts when startTime is defined)

      document.getElementById("workTimeInput").value = "";
      document.getElementById("workTimeInput").placeholder = "";
      document.getElementById("workTimeInput").style.caretColor = "transparent";

      //startTimer = setInterval(function(){timer(workSeconds,workMinutes,breakSeconds,breakMinutes)}, 1000);

      //Show Decrementing Clock Text (This is the text in the <p> tag that gets updated every second)

      let workMinutesText = document.getElementById("w_minutes");
      let workSecondsText = document.getElementById("w_seconds");
      let workColonText = document.getElementById("workColon");

      workMinutesText.className = "timer";
      workSecondsText.className = "timer";
      workColonText.className = "timer";

      
    } 
  
  }
);

//If the clock is ticking, clicking on it will pause the clock, present the existing time as the input place holder text, and
//hide the decrementing clock text.

let textInput = document.getElementById("workTimeInput");
textInput.addEventListener("click", function () {
  

  stopInterval(startTimer);
  startTimer = undefined;

  let tempPlaceHolder = `${workMinutes.innerText}:${workSeconds.innerText}`;
  document.getElementById("workTimeInput").placeholder = tempPlaceHolder;
  document.getElementById("workTimeInput").style.caretColor = "black";

  let workMinutesText = document.getElementById("w_minutes");
  let workSecondsText = document.getElementById("w_seconds");
  let workColonText = document.getElementById("workColon");

  workMinutesText.className = "hidden";
  workSecondsText.className = "hidden";
  workColonText.className = "hidden";
});

//Handling User Click Away: when the user clicks to edit time and then clicks the body of the page,
//the input field is hidden and the clock text returns (clicking on other elements yet unaccounted for)

let body = document.getElementById("body");
body.addEventListener("click", function () {
  if (document.activeElement === body) {
    

    //Show Timer text
    let workMinutesText = document.getElementById("w_minutes");
    let workSecondsText = document.getElementById("w_seconds");
    let workColonText = document.getElementById("workColon");

    workMinutesText.className = "timer";
    workSecondsText.className = "timer";
    workColonText.className = "timer";

    //Hide Display Text
    document.getElementById("workTimeInput").value = "";
    document.getElementById("workTimeInput").placeholder = "";
    document.getElementById("workTimeInput").style.caretColor = "transparent";
  }
});

breakTimeInput.addEventListener("keyup", function (event) {
  
    const timeRegex = /\d{0,2}:\d{2}$/;
    let timerValue = event.target.value;

    //Update clock text if regex test is successful
    if (timeRegex.test(timerValue) === true) {
      let strArr = timerValue.split(":");
      let userStartMin = strArr[0];
      let userStartSec = strArr[1];
      breakMinutes.innerText = userStartMin;
      breakSeconds.innerText = userStartSec;
     

      //Hide Input Form and Start Clock(clock starts when startTime is defined)

      document.getElementById("breakTimeInput").value = "";
      document.getElementById("breakTimeInput").placeholder = "";
      document.getElementById("breakTimeInput").style.caretColor = "transparent";

      //startTimer = setInterval(function(){timer(workSeconds,workMinutes,breakSeconds,breakMinutes)}, 1000);

      //Show Decrementing Clock Text (This is the text in the <p> tag that gets updated every second)

      let breakMinutesText = document.getElementById("b_minutes");
      let breakSecondsText = document.getElementById("b_seconds");
      let breakColonText = document.getElementById("breakColon");

      breakMinutesText.className = "timer";
      breakSecondsText.className = "timer";
      breakColonText.className = "timer";

      
    } 
  }
);

//If the clock is ticking, clicking on it will pause the clock, present the existing time as the input place holder text, and
//hide the decrementing clock text.

let breakTextInput = document.getElementById("breakTimeInput");
breakTextInput.addEventListener("click", function () {
  

  stopInterval(startTimer);
  startTimer = undefined;

  let tempPlaceHolder = `${breakMinutes.innerText}:${breakSeconds.innerText}`;
  document.getElementById("breakTimeInput").placeholder = tempPlaceHolder;
  document.getElementById("breakTimeInput").style.caretColor = "black";

  let breakMinutesText = document.getElementById("b_minutes");
  let breakSecondsText = document.getElementById("b_seconds");
  let breakColonText = document.getElementById("breakColon");

  breakMinutesText.className = "hidden";
  breakSecondsText.className = "hidden";
  breakColonText.className = "hidden";
});

//Handling User Click Away: when the user clicks to edit time and then clicks the body of the page,
//the input field is hidden and the clock text returns (clicking on other elements yet unaccounted for)


body.addEventListener("click", function () {
  if (document.activeElement === body) {
    

    //Show Timer text
    let breakMinutesText = document.getElementById("b_minutes");
    let breakSecondsText = document.getElementById("b_seconds");
    let breakColonText = document.getElementById("breakColon");

    breakMinutesText.className = "timer";
    breakSecondsText.className = "timer";
    breakColonText.className = "timer";

    //Hide Display Text
    document.getElementById("breakTimeInput").value = "";
    document.getElementById("breakTimeInput").placeholder = "";
    document.getElementById("breakTimeInput").style.caretColor = "transparent";
  }
});

export function hidePiano() {
  overlay.style.display = "block";
  pianoHidden = true;
  
}
export function showPiano() {
  overlay.style.display = "none";
  pianoHidden = false;
  
}

//Piano JS

function playNote(note) {
  if (pianoHidden === false) {
    const synth = new Synth().toDestination();
    synth.triggerAttackRelease(note, "8n");

    //Darkens the keys upon trigger

    document.getElementById(note).classList.add("active");
    setTimeout(function () {
      document.getElementById(note).classList.remove("active");
    }, 120);
  }
}

//Add onclick event listeners to each key element that play the corresponding note


document.getElementById("C4").addEventListener("click", function () {
  playNote("C4");
});
document.getElementById("Db4").addEventListener("click", function () {
  playNote("Db4");
});
document.getElementById("D4").addEventListener("click", function () {
  playNote("D4");
});
document.getElementById("Eb4").addEventListener("click", function () {
  playNote("Eb4");
});
document.getElementById("E4").addEventListener("click", function () {
  playNote("E4");
});
document.getElementById("F4").addEventListener("click", function () {
  playNote("F4");
});
document.getElementById("Gb4").addEventListener("click", function () {
  playNote("Gb4");
});
document.getElementById("G4").addEventListener("click", function () {
  playNote("G4");
});
document.getElementById("Ab4").addEventListener("click", function () {
  playNote("Ab4");
});
document.getElementById("A4").addEventListener("click", function () {
  playNote("A4");
});
document.getElementById("Bb4").addEventListener("click", function () {
  playNote("Bb4");
});
document.getElementById("B4").addEventListener("click", function () {
  playNote("B4");
});
document.getElementById("C5").addEventListener("click", function () {
  playNote("C5");
});
document.getElementById("Db5").addEventListener("click", function () {
  playNote("Db5");
});
document.getElementById("D5").addEventListener("click", function () {
  playNote("D5");
});
document.getElementById("Eb5").addEventListener("click", function () {
  playNote("Eb5");
});
document.getElementById("E5").addEventListener("click", function () {
  playNote("E5");
});
document.getElementById("F5").addEventListener("click", function () {
  playNote("F5");
});

//Piano Display Toggle

let pianoHidden = true;

let revealPianoBtn = document.getElementById("revealPiano");
let hidePianoBtn = document.getElementById("hidePiano");

let overlay = document.getElementById("pianoOverlay");

hidePianoBtn.addEventListener("click", function () {
  hidePiano();
  audioPlayer.pause();
});

revealPianoBtn.addEventListener("click", function () {
  if(startTimer !== undefined || waitingToStart === true){
  showPiano();
  if(startAudio === true){
    audioPlayer.play();
  }
  stopInterval(startTimer);
  startTimer = undefined;

}});

//Computer keys as musical keys functionality

window.addEventListener("keydown", (event) => {
  const pianoKeys = [
    "a",
    "w",
    "s",
    "e",
    "d",
    "f",
    "t",
    "g",
    "y",
    "h",
    "u",
    "j",
    "k",
    "o",
    "l",
    "p",
    ";",
    "'",
  ];
  const keyMap = [
    {
      key: "a",
      note: "C4",
    },
    {
      key: "w",
      note: "Db4",
    },
    {
      key: "s",
      note: "D4",
    },
    {
      key: "e",
      note: "Eb4",
    },
    {
      key: "d",
      note: "E4",
    },
    {
      key: "f",
      note: "F4",
    },
    {
      key: "f",
      note: "Gb4",
    },
    {
      key: "t",
      note: "Gb4",
    },
    {
      key: "g",
      note: "G4",
    },
    {
      key: "y",
      note: "Ab4",
    },
    {
      key: "h",
      note: "A4",
    },
    {
      key: "u",
      note: "Bb4",
    },
    {
      key: "j",
      note: "B4",
    },
    {
      key: "k",
      note: "C5",
    },
    {
      key: "o",
      note: "Db5",
    },
    {
      key: "l",
      note: "D5",
    },
    {
      key: "p",
      note: "Eb5",
    },
    {
      key: ";",
      note: "E5",
    },
    {
      key: "'",
      note: "F5",
    },
  ];

  if (pianoKeys.includes(event.key)) {
    let keyStroke = event.key;
    
    const found = keyMap.find((keyStroke) => keyStroke.key === event.key);
    
    let keyNote = found.note;
    
    playNote(keyNote);
  }
});

//Jam Track Loop JS
let audioPlayer = document.getElementById("jamTrack");
audioPlayer.loop = true;
audioPlayer.load();


//Jam Track Toggle
let startAudio = false;
let checkbox = document.getElementById("audioCheckBox");
checkbox.addEventListener('change', function() {
  if (this.checked) {
    
    startAudio = true
    
  } else {
    
    startAudio = false
    
  }
});


