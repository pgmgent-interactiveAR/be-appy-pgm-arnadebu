const app = {
  init() {
    this.cacheElements();
    this.showLoadingScreen();
    this.generateUI();
  },
  cacheElements() {
    this.$goose = document.querySelector('#goose');
    this.$helena = document.querySelector('#helena');
    this.$enterScreen = document.querySelector('.enter__content');
    this.$loadingScreen = document.querySelector('.enter__loading');
    this.$enterScreenBg = document.querySelector('#enter-screen-bg');
    this.$splash = document.querySelector('.splash');
    this.$petTitle = document.querySelector('.app__title-pet');
    this.$lectorTitle = document.querySelector('.app__title-lector')
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
    this.$ExitApp = document.querySelectorAll('.exit-app')
    this.$exitBtn = document.querySelector('.exit-button');
    this.$scene = document.querySelector('a-scene');
  },
  showLoadingScreen() {
    // Remove loading screen after 6 seconds and show Enter AR user interface
    setTimeout(() => {
      this.$loadingScreen.classList.add('is-hidden');
      this.$enterScreen.classList.remove('is-hidden');
      document.querySelector('.a-enter-ar').classList.add('is-visible');
    }, 6000);
  },
  generateUI() {
    // Exit AR button
    this.$exitBtn.addEventListener('click', function () {
      window.location.reload();
      // scene.xrSession.end();
    });

    /* When entering AR mode... */
    this.$scene.addEventListener("enter-vr", () => {

      // Show splash screen
      this.$enterScreenBg.setAttribute('visible', 'false');
      this.$enterScreen.classList.add('is-hidden');
      this.$splash.classList.remove('is-hidden');

      // Add events for generating UI
      this.$launchVirtualPet.addEventListener('click', this.generateVirtualPetApp);
      this.$launchDancingLector.addEventListener('click', this.generateDancingLectorApp);

      // Close when exit button is selected
      this.$ExitApp.forEach((btn) => app.closeApp(btn));

      // Activate hit-test
      this.$reticle.setAttribute('ar-hit-test', 'doHitTest:true');
      this.$reticle.setAttribute('visible', 'true');
    });

    /* When leaving AR mode... */
    this.$scene.addEventListener("exit-vr", () => {
      // Remove splash screen
      this.$splash.classList.add('is-hidden');

      // Deactivate hit-test
      this.$reticle.setAttribute('ar-hit-test', 'doHitTest:false');
      this.$reticle.setAttribute('visible', 'false');
    });
  },
  generateDancingLectorApp() {
    // Remove splash screen and add UI for virtual pet application
    document.querySelector('.splash').classList.add('is-hidden');
    document.querySelector('.dancing-lector-app').classList.remove('is-hidden');

    // Set object    
    const object = document.getElementById('helena');

    // Set position when screen is selected
    app.generatePositionObject(object);

    // Enable speech recognition when an animation is pronounced
    app.enableSpeechRecognition(object);
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
      const animationArray = ['twerk', 'break', 'still', 'silly'];

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

        // Loop over the animation array
        animationArray.forEach((animation) => {
          // Check if the animation is available, if so start the animation
          const animationExist = transcriptionArray.some((element) => element.includes(animation));

          if (animationExist) {
            app.addAnimation(object, animation)
          }
        })
      });
    }
  },
  addAnimation(object, animation) {
    switch (animation) {
      case "break":
        object.setAttribute('animation-mixer', `clip:flair; loop:infinite; crossFadeDuration: 2;`);
        break;
      case "silly":
        object.setAttribute('animation-mixer', `clip:sillydance1; loop:infinite; crossFadeDuration: 2;`);
        break;
      case "still":
        object.setAttribute('animation-mixer', `clip:idle; loop:infinite; crossFadeDuration: 2;`);
        break;
      default:
        object.setAttribute('animation-mixer', `clip:${animation}; loop:infinite; crossFadeDuration: 2;`);
        break;
    }
  },
  generatePositionObject(object) {
    // Place model when screen is selected
    app.$reticle.addEventListener('select', function () {
      if (this.components["ar-hit-test"].hasFoundAPose) {
        if (object.id == "helena") {
          // Add title block
          app.$lectorTitle.innerHTML = "Let's go<br>Helena!";
          // Add a neon effect to the title block
          app.$lectorTitle.classList.add('neon');
        } else {
          app.$petTitle.innerHTML = "Goose Party!";
          app.$petTitle.classList.add('neon');
        }
        object.setAttribute("position", app.$reticle.getAttribute("position"));
        object.setAttribute("visible", true);
      }
    });
  },
  closeApp(btn) {
    btn.addEventListener('click', (ev) => {
      window.location.reload();
    })
  },
}

app.init();