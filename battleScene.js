const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./img/battleBackground.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

let frogie;
let foxie;
let renderedSprites;
let battleAnimationId;
let queue;

function initBattle() {
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#enemyHealthBar").style.width = "100%";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();

  foxie = new Monster({ ...monsters.Foxie, position: { x: 280, y: 325 } });
  frogie = new Monster({ ...monsters.Frogie, position: { x: 800, y: 110 } });

  renderedSprites = [frogie, foxie];
  queue = [];

  foxie.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector("#attacksBox").append(button);
    button.id = "attackButton";
  });

  // our event listeners for our buttons (attack)
  document.querySelectorAll("#attackButton").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      foxie.attack({
        attack: selectedAttack,
        recipient: frogie,
        renderedSprites,
      });

      if (frogie.health <= 0) {
        queue.push(() => {
          frogie.faint();
        });

        queue.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              document.querySelector("#userInterface").style.display = "none";

              gsap.to("#overlappingDiv", {
                opacity: 0,
              });
              battling.initiated = false;
              if (!muted) {
                audio.Map.play();
              } else {
                audio.Map.stop();
              }
            },
          });
        });
      }

      // frogie or enemy attacks right here
      const randomAttack =
        frogie.attacks[Math.floor(Math.random() * frogie.attacks.length)];

      queue.push(() => {
        frogie.attack({
          attack: randomAttack,
          recipient: foxie,
          renderedSprites,
        });

        if (foxie.health <= 0) {
          queue.push(() => {
            foxie.faint();
          });

          queue.push(() => {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId);
                animate();
                document.querySelector("#userInterface").style.display = "none";

                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });
                battling.initiated = false;
                if (!muted) {
                  audio.Map.play();
                } else {
                  audio.Map.stop();
                }
              },
            });
          });
        }
      });
    });
    button.addEventListener("mouseenter", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = selectedAttack.type;
      document.querySelector("#attackType").style.color = selectedAttack.color;
    });
  });
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

animate();
// initBattle();
// animateBattle();

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});

let muted2 = true;
const muteButton2 = document.getElementById("muteButton");
muteButton2.addEventListener("click", () => {
  muted2 = !muted2;
  if (muteButton2.textContent === "Mute" && battling.initiated) {
    audio.battle.play();
  } else {
    audio.battle.stop();
  }
});
