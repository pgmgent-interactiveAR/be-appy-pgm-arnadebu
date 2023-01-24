function hasDomOverlay(session) {
  if (!session.domOverlayState) {
    return false;
  }
  if (!session.domOverlayState.type) {
    return false;
  }
  return true;
}

const app = {
  init() {
    this.cacheElements();
    this.getAttributeArray();
    this.showLoadingScreen();
  },
  cacheElements() {
    this.$goose = document.querySelector('#goose');
    this.$helena = document.querySelector('#helena');
    this.$enterScreen = document.querySelector('.enter__content');
    this.$loadingScreen = document.querySelector('.enter__loading');
    this.$enterScreenBg = document.querySelector('#enter-screen-bg');
    this.$splash = document.querySelector('.splash');
    this.$launchVirtualPet = document.querySelector('.launch-virtual-pet');
    this.$virtualPetUI = document.querySelector('.virtual-pet-app');
    this.$launchDancingLector = document.querySelector('.launch-dancing-lector');
    this.$dancingLectorUI = document.querySelector('.dancing-lector-app');
    this.$transcript = document.querySelector(".transcription__content");
    this.$recordBtn = document.querySelector(".start-record");
    this.$reticle = document.querySelector("[ar-hit-test]");
    this.$sambaBtn = document.querySelector('.samba');
    this.$hipHopBtn = document.querySelector('.hiphop');
    this.$bellyBtn = document.querySelector('.belly');
    this.$swingBtn = document.querySelector('.swing');
    // this.$flairBtn = document.querySelector('.flair');
    // this.$sillyBtn = document.querySelector('.silly');
    // this.$twerkBtn = document.querySelector('.twerk');
    // this.$idleBtn = document.querySelector('.idle');
    this.$ExitApp = document.querySelectorAll('.exit-app')
    this.addEventListeners();
  },
  showLoadingScreen() {
    setTimeout(() => {
      this.$loadingScreen.classList.add('is-hidden');
      this.$enterScreen.classList.remove('is-hidden');

      this.$enterARBtn = document.querySelector('.a-enter-ar');
      this.$enterARBtn.classList.add('is-visible');
    }, 4000);
  },
  enableSpeechRecognition(object) {

    // If browser doesn't support the speech recognition API, send an error message
    if (!window.webkitSpeechRecognition) {
      alert("Sorry, your browser does not support the webkitSpeechRecognition API");
    } else {
      // Set speech recognition API 
      const recognition = new webkitSpeechRecognition();
      recognition.interimResults = true;

      // Set variables    
      const $transcript = this.$transcript;
      const $recordBtn = this.$recordBtn;
      
      // Start speech recognition when record button is pressed
      $recordBtn.addEventListener("click", function () {
        recognition.start();
        $recordBtn.disabled = true;
      });

      // Stop the speech recognition when there is no sound to record
      recognition.onspeechend = function () {
        recognition.stop();
        $recordBtn.disabled = false;
      }

      let transcriptionArray = [];
      const attributesArray = ['twerk', 'break dance', 'idle', 'silly'];
      
      // Show transcription result in the DOM
      recognition.addEventListener("result", function (event) {
        let transcription = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcription += event.results[i][0].transcript;
          } else {
            transcription += event.results[i][0].transcript;
          }
        }
        
        // Show only the first pronounced word
        $transcript.innerHTML = transcription;
        // Add the different transcription objects to an array
        transcriptionArray = [];
        transcriptionArray.push(transcription);
        console.log(transcriptionArray);

        attributesArray.forEach((animation) => {
          if (transcriptionArray.includes(animation)) {
            app.addAnimation(object, animation)
          }
        })
      });


    }
  },
  addEventListeners() {
    const exit = document.querySelector('.exit-button');
    const scene = document.querySelector('a-scene');
    const reticle = document.querySelector("[ar-hit-test]");
    const object = document.getElementById('eagle');

    // ! Exit AR button
    exit.addEventListener('click', function () {
      window.location.reload();
      // scene.xrSession.end();
    });

    // ! When entering AR mode...
    scene.addEventListener("enter-vr", () => {

      // Show splash screen
      this.$enterScreenBg.setAttribute('visible', 'false');
      this.$enterScreen.classList.add('is-hidden');
      this.$splash.classList.remove('is-hidden');

      // Add events for generating UI
      this.$launchVirtualPet.addEventListener('click', this.generateVirtualPetApp);
      this.$launchDancingLector.addEventListener('click', this.generateDancingLectorApp);

      // Close when exit button is pressed
      this.$ExitApp.forEach((btn) => app.closeApp(btn));

      // Activate hit-test
      reticle.setAttribute('ar-hit-test', 'doHitTest:true');
      reticle.setAttribute('visible', 'true');
    });

    // ! When leaving AR mode...
    scene.addEventListener("exit-vr", () => {
      // Remove splash screen
      this.$splash.classList.add('is-hidden');

      // Deactivate hit-test
      reticle.setAttribute('ar-hit-test', 'doHitTest:false');
      reticle.setAttribute('visible', 'false');
    });
  },
  generateDancingLectorApp() {
    // Remove splash screen and add UI for virtual pet application
    document.querySelector('.splash').classList.add('is-hidden');
    document.querySelector('.dancing-lector-app').classList.remove('is-hidden');
    document.querySelector('#goose').classList.add('is-hidden');

    // Get model and show object when screen is selected
    const object = document.getElementById('helena');

    app.generatePositionObject(object);

    app.enableSpeechRecognition(object);

    // Add animation when button is clicked
    // app.$flairBtn.addEventListener('click', () => app.addAnimation(object, 'flair'));
    // app.$sillyBtn.addEventListener('click', () => app.addAnimation(object, 'sillydance1'));
    // app.$twerkBtn.addEventListener('click', () => app.addAnimation(object, 'twerk'));
    // app.$idleBtn.addEventListener('click', () => app.addAnimation(object, 'idle'));
  },
  generateVirtualPetApp() {
    // Remove splash screen and add UI for virtual pet application
    document.querySelector('.splash').classList.add('is-hidden');
    document.querySelector('.virtual-pet-app').classList.remove('is-hidden');
    document.querySelector('#helena').classList.add('is-hidden');

    // Get model and show object when screen is selected
    const object = document.getElementById('goose');
    app.generatePositionObject(object);

    // Add animation when button is clicked
    app.$sambaBtn.addEventListener('click', () => app.addAnimation(object, 'samba'));
    app.$hipHopBtn.addEventListener('click', () => app.addAnimation(object, 'hiphop'));
    app.$bellyBtn.addEventListener('click', () => app.addAnimation(object, 'belly'));
    app.$swingBtn.addEventListener('click', () => app.addAnimation(object, 'swing'));
  },
  addAnimation(object, animation) {
    object.setAttribute('animation-mixer', `clip:${animation}; loop:infinite; crossFadeDuration: 2;`);
  },
  generatePositionObject(object) {
    const $reticle = this.$reticle;

    $reticle.addEventListener('select', function () {
      if (this.components["ar-hit-test"].hasFoundAPose) {
        if (object.id == "helena") {
          document.querySelector('.app__title-lector').innerHTML = "Let's go Helena!";
          document.querySelector('.app__title-lector').classList.add('neon');
        } else {
          document.querySelector('.app__title-pet').innerHTML = "Goose Party!";
          document.querySelector('.app__title-pet').classList.add('neon');
        }
        object.setAttribute("position", $reticle.getAttribute("position"));
        object.setAttribute("visible", true);
      }
    });
  },
  closeApp(btn) {
    btn.addEventListener('click', (ev) => {
      window.location.reload();
    })
  },
  getAttributeArray() {
    this.attributesArray =
      ['twerk', 'idle', 'silly', 'flair'];
  }

}

app.init();