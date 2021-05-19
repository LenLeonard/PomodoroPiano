import * as Tone from "https://cdn.skypack.dev/tone";

export function playNote(note) {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(note, "8n");
} 

document.getElementById("C").addEventListener("click", function(){ playNote('C4'); });
document.getElementById("Db").addEventListener("click", function(){ playNote('Db4'); });
document.getElementById("D").addEventListener("click", function(){ playNote('D4'); });
document.getElementById("Eb").addEventListener("click", function(){ playNote('Eb4'); });
document.getElementById("E").addEventListener("click", function(){ playNote('E4'); });
document.getElementById("F").addEventListener("click", function(){ playNote('F4'); });
document.getElementById("Gb").addEventListener("click", function(){ playNote('Gb4'); });
document.getElementById("G").addEventListener("click", function(){ playNote('G4'); });
document.getElementById("Ab").addEventListener("click", function(){ playNote('Ab4'); });
document.getElementById("A").addEventListener("click", function(){ playNote('A4'); });
document.getElementById("Bb").addEventListener("click", function(){ playNote('Bb4'); });
document.getElementById("B").addEventListener("click", function(){ playNote('B4'); });

const pianoKeys = ["a","w","s","e","d","f","t","g","y","h"]

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
    playNote(keyNote)
  }
    
});