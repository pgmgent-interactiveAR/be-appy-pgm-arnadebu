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
    this.showLoadingScreen();
  },
  cacheElements() {
    this.$enterScreen = document.querySelector('.enter-screen');
    this.$loadingScreen = document.querySelector('.loading-screen');
    this.$enterScreenBg = document.querySelector('#enter-screen-bg');
    this.$splash = document.querySelector('.splash');
    this.$launchVirtualPet = document.querySelector('.launch-virtual-pet');
    this.$virtualPetUI = document.querySelector('.virtual-pet-app');
    this.$launchDancingLector = document.querySelector('.launch-dancing-lector');
    this.$dancingLectorUI = document.querySelector('.dancing-lector-app');
    this.$reticle = document.querySelector("[ar-hit-test]");
    this.$sambaBtn = document.querySelector('.samba');
    this.$hipHopBtn = document.querySelector('.hiphop');
    this.$bellyBtn = document.querySelector('.belly');
    this.$swingBtn = document.querySelector('.swing');
    this.$flairBtn = document.querySelector('.flair');
    this.$sillyBtn = document.querySelector('.silly');
    this.$twerkBtn = document.querySelector('.twerk');
    this.$idleBtn = document.querySelector('.idle');
    this.addEventListeners();
  },
  showLoadingScreen() {
    setTimeout(() => {
      this.$loadingScreen.classList.add('is-hidden');
    }, 7000);
  },
  addEventListeners() {
    const exit = document.querySelector('.exit-button');
    const scene = document.querySelector('a-scene');
    const reticle = document.querySelector("[ar-hit-test]");
    const object = document.getElementById('eagle');

    // ! Exit AR button
    exit.addEventListener('click', function () {
      scene.xrSession.end();
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

    // Add animation when button is clicked
    app.$flairBtn.addEventListener('click', () => app.addAnimation(object, 'flair'));
    app.$sillyBtn.addEventListener('click', () => app.addAnimation(object, 'sillydance1'));
    app.$twerkBtn.addEventListener('click', () => app.addAnimation(object, 'twerk'));
    app.$idleBtn.addEventListener('click', () => app.addAnimation(object, 'idle'));
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

}

app.init();