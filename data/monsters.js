
const tailWhipImage = new Image();
tailWhipImage.src = "./img/tail whip.png";

const monsters = {
  Foxie: {
    position: {
      x: 280,
      y: 325,
    },
    image: {
      src: "./img/fox.png",
    },
    frames: {
      max: 4,
      hold: 30,
    },
    animate: true,
    name: "Foxie",
    attacks: [
      attacks["Quick Attack"],
      attacks["Tail Whip"],
      attacks.Fireball,
      attacks.Run,
    ],
    scale: 4,
    sprites: {
      tail_whip: {
        image: tailWhipImage,
        frames: { max: 3, hold: 10 },
      },
    },
  },

  Frogie: {
    position: {
      x: 800,
      y: 110,
    },
    image: {
      src: "./img/frog.png",
    },
    frames: {
      max: 4,
      hold: 30,
    },
    animate: true,
    isEnemy: true,
    name: "Frogie",
    attacks: [attacks["Quick Attack"], attacks.Lick, attacks["Body Slam"]],
    scale: 3,
  },
};
