import * as Tone from "https://cdn.skypack.dev/tone";



export function playNote(note) {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(note, "8n");
  
  /*Darkens the keys upon trigger.*/
  
  document.getElementById(note).classList.add("active");
    setTimeout(function(){ document.getElementById(note).classList.remove("active");}, 120);
  }


    
    
    




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
  const pianoKeys = ["a","w","s","e","d","f","t","g","y","h","u","j","k"];
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