import {showPiano, hidePiano} from './tones.js'

//The logic that handles the countdown
//(It also makes calls to the piano module to hide or reveal the piano)
//Start Time Function





export  function timer(workSeconds,workMinutes,breakSeconds,breakMinutes) {
    //Work Timer Countdown
    if (parseInt(workSeconds.innerText) != 0) {
      
      //Hide the piano while the counter is decrementing
      // I removed the hidePiano(); function for fear it may lead to circular dependencies
      hidePiano();
      //Decrement by one at interval
      workSeconds.innerText--;
      
      //Add leading 0's to the clock display
      if (parseInt(workSeconds.innerText) < 10) {
        workSeconds.innerText = "0" + workSeconds.innerText;
      }
      //If there is still time left but we are out of seconds, mnove to the next minute 
    } else if (parseInt(workMinutes.innerText) != 0 && parseInt(workSeconds.innerText) == 0) {
      workSeconds.innerText = 59;
      workMinutes.innerText--;
    }
  
    //Break Timer Countdown
    if (parseInt(workMinutes.innerText) == 0 && parseInt(workSeconds.innerText) == 0) {
      
      //Shows the piano at break time
      showPiano();
      // I removed the showPiano(); function for fear it may lead to circular dependencies
  
  
      if (parseInt(breakSeconds.innerText) != 0) {
        breakSeconds.innerText--;
        if (parseInt(breakSeconds.innerText) < 10) {
          breakSeconds.innerText = "0" + breakSeconds.innerText;
        }
      } else if (parseInt(breakMinutes.innerText) != 0 && parseInt(breakSeconds.innerText) == 0) {
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
  export function stopInterval(startTimer) {
    clearInterval(startTimer);
  }
  