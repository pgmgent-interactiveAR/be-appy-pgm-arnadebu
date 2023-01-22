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

  },
  cacheElements() {
    this.$splash = document.querySelector('.splash');
    this.$launchVirtualPet = document.querySelector('.launch-virtual-pet');
    this.$virtualPetUI = document.querySelector('.virtual-pet-app');
    this.$launchDancingLector = document.querySelector('.launch-lector-app');
    this.$dancingLectorUI = document.querySelector('.dancing-lector-app');
    this.$reticle = document.querySelector("[ar-hit-test]");
    this.$animationBtn = document.querySelector('.animate');
    this.addEventListeners();
  },
  addEventListeners() {
    const exit = document.querySelector('.exit-button');
    const scene = document.querySelector('a-scene');
    const reticle = document.querySelector("[ar-hit-test]");
    const object = document.getElementById('eagle');

    function positionObject() {
      object.setAttribute("position", reticle.getAttribute("position"));
      object.setAttribute("visible", true);
    };

    // Exit AR mode
    exit.addEventListener('click', function () {
      scene.xrSession.end();
    });

    // When entering AR mode...
    scene.addEventListener("enter-vr", () => {
      // Show splash screen
      this.$splash.classList.remove('is-hidden');

      // Add events for generating UI
      this.$launchVirtualPet.addEventListener('click', this.generateVirtualPetApp);
      this.$launchDancingLector.addEventListener('click', this.generateDancingLectorApp);

      // Activate hit-test
      reticle.setAttribute('ar-hit-test', 'doHitTest:true');
      reticle.setAttribute('visible', 'true');
    });

    // When leaving AR mode...
    scene.addEventListener("exit-vr", () => {
      // Remove splash screen
      this.$splash.classList.add('is-hidden');

      // Deactivate hit-test
      reticle.setAttribute('ar-hit-test', 'doHitTest:false');
      reticle.setAttribute('visible', 'false');
    });

    reticle.addEventListener('select', function () {
      if (this.components["ar-hit-test"].hasFoundAPose) {
        positionObject();
      }
    });
  },
  generateVirtualPetApp() {
    // Remove splash screen and add UI for virtual pet application
    document.querySelector('.splash').classList.add('is-hidden');
    document.querySelector('.virtual-pet-app').classList.remove('is-hidden');

    // Get model and show object when screen is selected
    const object = document.getElementById('eagle');
    app.generatePositionObject(object);

    // Add animation when button is clicked
    app.$animationBtn.addEventListener('click', () => {
      object.setAttribute('animation-mixer', 'clip:fly; loop:infinite; timeScale: .3; crossFadeDuration: 2;')
    })
  },
  generatePositionObject(object) {
    const $reticle = this.$reticle;

    $reticle.addEventListener('select', function () {
      if (this.components["ar-hit-test"].hasFoundAPose) {
        object.setAttribute("position", $reticle.getAttribute("position"));
        object.setAttribute("visible", true);
      }
    });
  },
  generateDancingLectorApp() { },

}

app.init();