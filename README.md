# Pomodoro + Piano v1.0

Pomodoro + Piano is a variation on the the classic pomodoro timer, a popular productivity tool. Pomodoro is is Italian for tomato; Francesco Cirillo developed the pomodoro technqiue as a time management method in the late 1980's, naming the technique after the Pomodoro (tomato-shaped) kitchen timers he used to manage his time as a university student.

A pomodoro timer is used to break work up into discrete chunks (typically 25 minutes each) so as to make focusing on such work easier to accomplish. A pomodoro (one chunk of working time) is considered undivisble, and so the idea is to set the timer for the desired session length, and do nothing else but work for that amount of time, take a short break, set a another pomodoro and start again.

Pomodoro + Piano is such a timer, but also provides a musical playground in which to spend one's break. When the working session is complete, the piano will be enabled, and if the user chooses the option, a backing track in the key of A Minor will begin to sound. The user can then spend their break noodling mostly on the white keys using their own keyboard.

<h2>How to play the keyboard</h2>

The keys are mapped to the Q and A rows of a standard QWERTY keyboard. The white keys span the entire A row; A is C4, S is D4, D is E4, F is F4, and so on. The black keys are represented by the Q row, and correspond to the white keys. For example, W is C#4, E is Eb4, R does nothing because there is no black key between E4 and F4, and T is F#4, which falls between the F4 and G4 on the corresponding white key row (which happen to be F and G, respectively.) The keyboard can also be played with a mouse.

<h2>Configuring the timer</h2>

The timers can be customized by clicking on the timer display; times must be enetered in a minute:second format, including the colon. 25:00, 43:50, and 59:59 are all valid time inputs.

Session count refers to the number of pomodoros that have been completed in this focus session. The count increments when both work and break timers have gone to 0.

<h2>Notes</h2>

The app is not yet optimized for mobile devices and works best on desktop browsers.
The piano makes use of the [tone.js](https://tonejs.github.io/) Javascript library.
There are still some issues being worked out. Pull requests welcome.

