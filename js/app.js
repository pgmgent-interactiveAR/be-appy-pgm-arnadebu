const reticle = document.querySelector("[ar-hit-test]");
const hoop = document.getElementById('eagle');
const instructions = document.getElementById('instructions');
const ball = document.getElementById('ball');
const button = document.getElementById('go-button');
const startAnimation = document.getElementById('start-animation');
const exit = document.getElementById('exit-button');
const upVector = new THREE.Vector3(0, 1, 0);
const tempVector = new THREE.Vector3();
const tempQuaternion = new THREE.Quaternion();
const scene = document.querySelector('a-scene');

function hasDomOverlay(session) {
  if (!session.domOverlayState) {
    // DOM Overlay is not supported
    return false;
  }

  if (!session.domOverlayState.type) {
    // DOM Overlay is not in use
    return false;
  }

  // return true;
}


function positionHoop() {
  hoop.setAttribute("position", reticle.getAttribute("position"));
  hoop.setAttribute("visible", true);
  // tempVector.set(0, 0, 0);
  // tempVector.applyQuaternion(reticle.object3D.quaternion);
  // tempQuaternion.setFromUnitVectors(tempVector, upVector);
  // hoop.object3D.quaternion.multiplyQuaternions(tempQuaternion, reticle.object3D.quaternion);
};

exit.addEventListener('click', function () {
  scene.xrSession.end();
});

scene.addEventListener("enter-vr", () => {
  const domOverlay = hasDomOverlay(scene.xrSession);
  document.getElementById('text').setAttribute('text', 'value', 'Overlay: ' + domOverlay);
  document.body.classList.remove("inline");
  if (scene.is("ar-mode")) {
    document.body.classList.add("ar-preparing");
    reticle.setAttribute('ar-hit-test', 'doHitTest:true');
    reticle.setAttribute('visible', 'true');
  } else {
    document.body.classList.add("playing");
    reticle.setAttribute('ar-hit-test', 'doHitTest:false');
    reticle.setAttribute('visible', 'false');
  }
});

scene.addEventListener("exit-vr", () => {
  document.body.classList.add("inline");
  document.body.classList.remove("playing");
  document.body.classList.remove("ar-preparing");
  reticle.setAttribute('ar-hit-test', 'doHitTest:false');
  reticle.setAttribute('visible', 'false');
});

reticle.addEventListener('select', function (e) {
  const domOverlay = hasDomOverlay(scene.xrSession);
  if (document.body.classList.contains("playing")) {
    const pose = e.detail.pose;
    ball.body.position.copy(pose.transform.position);
    // ball.body.position.y += 0.2;
    tempVector.set(0, 0, -5);
    tempVector.applyQuaternion(pose.transform.orientation);
    ball.body.velocity.copy(tempVector);
    return;
  }

  if (domOverlay) {
    setTimeout(() => {
      if (document.body.classList.contains("playing")) {
        return;
      } else {
        positionHoop();
      }
    }, 50);
  } else {
    if (document.body.classList.contains("playing")) {
      return;
    } else {
      if (this.components["ar-hit-test"].hasFoundAPose) {
        positionHoop();
        readyToStartPlay(e);
      }
    }
  }
});

// function readyToStartPlay(e) {
//   e.preventDefault();
//   if (hoop.getAttribute("visible") === false) {
//     positionHoop();
//   }
//   if (document.body.classList.contains("ar-preparing")) {
//     document.body.classList.remove("ar-preparing");
//     document.body.classList.add("playing");
//     reticle.setAttribute('ar-hit-test', 'doHitTest:false');
//     reticle.setAttribute('visible', 'false');
//     return;
//   }
// }

button.addEventListener('mousedown', readyToStartPlay);
button.addEventListener('touchstart', readyToStartPlay);