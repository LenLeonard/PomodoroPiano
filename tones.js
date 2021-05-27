import * as Tone from "https://cdn.skypack.dev/tone";
import * as timelogic from "./timerlogic.js";

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

start.addEventListener("click", function () {
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
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

  //Stop timer
  stopInterval();
  startTimer = undefined;

  //Hide piano and pause backing track
  hidePiano();
});

stop.addEventListener("click", function () {
  stopInterval();
  startTimer = undefined;
});

//Pomodoro Text Input Counters

//Seemless Input As Timer Value
//It uses an event listener to listen for Enter and then uses that to update the times
//and then uses font stylings to swap out the clock text from the text input text

//Configure the form to send input when enter key is triggered, and check that input against a regular expression

workTimeInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const timeRegex = /^\d{0,2}:\d{0,2}$/;
    let timerValue = event.target.value;

    //Update clock text if regex test is successful
    if (timeRegex.test(timerValue) === true) {
      let strArr = timerValue.split(":");
      let userStartMin = strArr[0];
      let userStartSec = strArr[1];
      workMinutes.innerText = userStartMin;
      workSeconds.innerText = userStartSec;
      console.log(timerValue + "passed");

      //Hide Input Form and Start Clock(clock starts when startTime is defined)

      document.getElementById("workTimeInput").value = "";
      document.getElementById("workTimeInput").placeholder = "";
      document.getElementById("workTimeInput").style.caretColor = "transparent";

      startTimer = setInterval(timer, 1000);

      //Show Decrementing Clock Text (This is the text in the <p> tag that gets updated every second)

      let workMinutesText = document.getElementById("w_minutes");
      let workSecondsText = document.getElementById("w_seconds");
      let workColonText = document.getElementById("workColon");

      workMinutesText.className = "timer";
      workSecondsText.className = "timer";
      workColonText.className = "timer";

      //How to handle user input that failes regular expression test
    } else {
      console.log("did not pass");
      if (event.key === "Enter") {
        document.getElementById("workTimeInput").value = "";
      }
      alert("Please enter minutes and seconds like this: 25:00");
    }
  }
});

//If the clock is ticking, clicking on it will pause the clock, present the existing time as the input place holder text, and
//hide the decrementing clock text.

let textInput = document.getElementById("workTimeInput");
textInput.addEventListener("click", function () {
  console.log("clicky");

  stopInterval();
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
    console.log("body");

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

//Pomodoro Save Settings Functionality
//To be removed when text input is working

/* let updateButton = document.getElementById('updateButton');
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
*/

export default function hidePiano() {
  overlay.style.display = "block";
  pianoHidden = true;
  audioPlayer.pause();
}
export function showPiano() {
  overlay.style.display = "none";
  pianoHidden = false;
  audioPlayer.play();
}

//The logic that handles the countdown
//(It also makes calls to the piano module to hide or reveal the piano)
//Start Time Function

function timer() {
  //Work Timer Countdown
  if (parseInt(workSeconds.innerText) != 0) {
    //Hide the piano while the counter is decrementing
    hidePiano();

    //Decrement by one at interval
    workSeconds.innerText--;

    //Add leading 0's to the clock display
    if (parseInt(workSeconds.innerText) < 10) {
      workSeconds.innerText = `${0}${workSeconds.innerText}`;
    }
    //If there is still time left but we are out of seconds, mnove to the next minute
  } else if (
    parseInt(workMinutes.innerText) != 0 &&
    parseInt(workSeconds.innerText) == 0
  ) {
    workSeconds.innerText = 59;
    workMinutes.innerText--;
  }

  //Break Timer Countdown
  if (
    parseInt(workMinutes.innerText) == 0 &&
    parseInt(workSeconds.innerText) == 0
  ) {
    //Shows the piano at break time
    showPiano();

    if (parseInt(breakSeconds.innerText) != 0) {
      breakSeconds.innerText--;
      if (parseInt(breakSeconds.innerText) < 10) {
        breakSeconds.innerText = `${0}${breakSeconds.innerText}`;
      }
    } else if (
      parseInt(breakMinutes.innerText) != 0 &&
      parseInt(breakSeconds.innerText) == 0
    ) {
      breakSeconds.innerText = 59;
      breakMinutes.innerText--;
    }
  }
  //Increment Counter by one if one full cyle is completed
  if (
    parseInt(workMinutes.innerText) == 0 &&
    parseInt(workSeconds.innerText) == 0 &&
    parseInt(breakSeconds.innerText) == 0
  ) {
    workMinutes.innerText = 25;
    workSeconds.innerText = "00";

    breakMinutes.innerText = 5;
    breakSeconds.innerText = "00";

    document.getElementById("counter").innerText++;
  }
  console.log(workMinutes.innerText + ":" + workSeconds.innerText);
}

//Stop Time Function
function stopInterval() {
  clearInterval(startTimer);
}

//Piano JS

function playNote(note) {
  if (pianoHidden === false) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "8n");

    //Darkens the keys upon trigger

    document.getElementById(note).classList.add("active");
    setTimeout(function () {
      document.getElementById(note).classList.remove("active");
    }, 120);
  }
}

//Add onclick event listeners to each key element that play the corresponding note
//was trying a loop based solution below, yet unsuccessful
/*let noteArray = ['C4','Db4','D4','Eb','E4','F','Gb4','G4','Ab4','A4','Bb4','B4','C5','Db5','D5','Eb5','E5','F5'];
noteArray.forEach(note => {document.getElementById(note).addEventListener("click", function(){ playNote(note); });
  
}); */

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
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  }
});

revealPianoBtn.addEventListener("click", function () {
  showPiano();
  stopInterval();
  startTimer = undefined;
});

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
    console.log(keyStroke);
    const found = keyMap.find((keyStroke) => keyStroke.key === event.key);
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
