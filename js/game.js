////////////////////////////////////////////////////////////
// GAME v1.2
////////////////////////////////////////////////////////////

/*!
 *
 * GAME SETTING CUSTOMIZATION START
 *
 */

//cards array
var cards_arr = [
  {
    srcA: "assets/card_01.png",
    srcB: "assets/card_01.png",
    particles: "assets/item_particles_01.png",
  },
  {
    srcA: "assets/card_02.png",
    srcB: "assets/card_02.png",
    particles: "assets/item_particles_02.png",
  },
  {
    srcA: "assets/card_03.png",
    srcB: "assets/card_03.png",
    particles: "assets/item_particles_03.png",
  },
  {
    srcA: "assets/card_04.png",
    srcB: "assets/card_04.png",
    particles: "assets/item_particles_04.png",
  },
  {
    srcA: "assets/card_05.png",
    srcB: "assets/card_05.png",
    particles: "assets/item_particles_05.png",
  },
  {
    srcA: "assets/card_06.png",
    srcB: "assets/card_06.png",
    particles: "assets/item_particles_06.png",
  },
  {
    srcA: "assets/card_07.png",
    srcB: "assets/card_07.png",
    particles: "assets/item_particles_07.png",
  },
  {
    srcA: "assets/card_08.png",
    srcB: "assets/card_08.png",
    particles: "assets/item_particles_08.png",
  },
  {
    srcA: "assets/card_09.png",
    srcB: "assets/card_09.png",
    particles: "assets/item_particles_09.png",
  },
  {
    srcA: "assets/card_10.png",
    srcB: "assets/card_10.png",
    particles: "assets/item_particles_10.png",
  },
  {
    srcA: "assets/card_11.png",
    srcB: "assets/card_11.png",
    particles: "assets/item_particles_11.png",
  },
  {
    srcA: "assets/card_12.png",
    srcB: "assets/card_12.png",
    particles: "assets/item_particles_12.png",
  },
];

//stage settings
var stageSettings = [
  {
    match: 2,
    column: 4,
    scale: 1,
    margin: 10,
    portrait: {
      column: 2,
      scale: 1,
      margin: 10,
    },
  },
  {
    match: 4,
    column: 4,
    scale: 0.9,
    margin: 10,
    portrait: {
      column: 4,
      scale: 0.6,
      margin: 10,
    },
  },
  {
    match: 8,
    column: 8,
    scale: 0.55,
    margin: 10,
    portrait: {
      column: 4,
      scale: 0.6,
      margin: 10,
    },
  },
  {
    match: 12,
    column: 8,
    scale: 0.5,
    margin: 10,
    portrait: {
      column: 6,
      scale: 0.42,
      margin: 10,
    },
  },
];

//game settings
var gameSettings = {
  timer: 180000,
  score: 30,
  flipSpeed: 0.3,
  matchSpeed: 0.3,
  matchAlphaSpeed: 0.3,
};

//game test display
var textDisplay = {
  timeUp: "Time's Up",
  score: "[NUMBER]pts",
  exitTitle: "Exit Game",
  exitMessage: "Are you sure you want\nto quit game?",
  share: "Share your score:",
  resultTitle: "Game Over",
  resultDesc: "Result: [NUMBER]pts [MULTIPLY]X",
};

//Social share, [SCORE] will replace with game score
var shareEnable = false; //toggle share
var shareTitle = "Highscore on Memory Game is [SCORE]pts"; //social share score title
var shareMessage =
  "[SCORE]pts is mine new highscore on Memory Game game! Try it now!"; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = {
  enable: false,
};
var playerData = {
  score: 0,
};
var gameData = {
  paused: true,
  stageNum: 0,
  cardsArr: [],
  cardIndex: 0,
  gameCardsArr: [],
  scale: 1,
  margin: 0,
  cardA: -1,
  cardB: -1,
  flipping: false,
  match: 0,
  combo: 0,
};
var timeData = {
  enable: false,
  startDate: null,
  nowDate: null,
  timer: 0,
  oldTimer: 0,
};
var tweenData = {
  score: 0,
  tweenScore: 0,
};
var gravityData = {
  animate: false,
  total: 10,
  gravity: 1.5,
  drag: 0.99,
  range: 100,
};

let bet;
/*!
 *
 * GAME BUTTONS - This is the function that runs to setup button event
 *
 */

function Notify(text) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(text);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(text);
      }
    });
  }
}

async function buildGameButton() {
  buttonStart.cursor = "pointer";
  buttonStart.addEventListener("click", async function (evt) {
    const phantomWallet = cryptoUtils.phantomWallet;

    try {
      if (!phantomWallet.isConnected) {
        console.log("phantomWallet is not connected");
        await phantomWallet.connectWallet();
      }
      if (phantomWallet.isConnected) {
        Swal.fire({
          title: "Enter Your Bet (MAX 1 SOL)",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: false,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          preConfirm: (input) => {
            console.log("preConfirm");
            if (!input || input > 1) {
              return Swal.showValidationMessage(
                `Bet amount is greater than 1 SOl`
              );
            }
          },
          allowOutsideClick: false,
        }).then(({ value: betAmount }) => {
          phantomWallet
            .requestTransaction(
              Number(betAmount),
              "AV1h6WN1mAS2zv5m1JxwFL5D7ne4sxKoj8unZsrC7zLv"
            )
            .then((result) => {
              if (result) {
                bet = {
                  betAmount: Number(betAmount),
                  gameName: "Memory Master",
                  userTransactionID: result,
                  typeOfPlay: "SOL",
                };
                Notify("Transaction Successful");
                playSound("soundButton");
                goPage("game");
                stopSoundLoop("musicMain");
                playSoundLoop("musicGame");
                setSoundVolume("musicGame", 0.5);
                initAnimateBubble(itemTimerBubble, 10);
                initAnimateBubble(itemComboBubble, 10);
                startGame();
              }
            })
            .catch((err) => {
              Notify("Please Approve Transaction");
              console.log(err);
            });
        });
      } else {
        alert("Please connect to wallet");
      }
    } catch (error) {
      console.log(error);
    }
  });

  instructions.cursor = "pointer";
  instructions.addEventListener("click", function (evt) {
    toggleInstructions();
  });

  instructionsExit.cursor = "pointer";
  instructionsExit.addEventListener("click", function (evt) {
    toggleInstructions();
  });

  itemExit.addEventListener("click", function (evt) {});

  buttonContinue.cursor = "pointer";
  buttonContinue.addEventListener("click", function (evt) {
    playSound("soundButton");
    goPage("main");
  });

  buttonSoundOff.cursor = "pointer";
  buttonSoundOff.addEventListener("click", function (evt) {
    toggleGameMute(true);
  });

  buttonSoundOn.cursor = "pointer";
  buttonSoundOn.addEventListener("click", function (evt) {
    toggleGameMute(false);
  });

  buttonFullscreen.cursor = "pointer";
  buttonFullscreen.addEventListener("click", function (evt) {
    toggleFullScreen();
  });

  buttonExit.cursor = "pointer";
  buttonExit.addEventListener("click", function (evt) {
    togglePop(true);
    toggleOption();
  });

  buttonSettings.cursor = "pointer";
  buttonSettings.addEventListener("click", function (evt) {
    toggleOption();
  });

  buttonConfirm.cursor = "pointer";
  buttonConfirm.addEventListener("click", function (evt) {
    playSound("soundButton");
    togglePop(false);

    stopAudio();
    stopGame();
    goPage("main");
  });

  buttonCancel.cursor = "pointer";
  buttonCancel.addEventListener("click", function (evt) {
    playSound("soundButton");
    togglePop(false);
  });

  for (var n = 0; n < cards_arr.length; n++) {
    gameData.cardsArr.push(n);
  }
}

/*!
 *
 * ANIMATE BUBBLES - This is the function that runs to animate bubbles
 *
 */
function initAnimateBubble(bubble, range) {
  bubble.oriX = bubble.x;
  bubble.oriY = bubble.y;
  bubble.range = range;

  animateBubble(bubble);
}

function animateBubble(bubble) {
  var range = bubble.range;
  var tweenSpeed = randomIntFromInterval(1, 2);
  var randomX = randomIntFromInterval(-range, range);
  var randomY = randomIntFromInterval(-range, range);

  TweenMax.to(bubble, tweenSpeed, {
    x: bubble.oriX + randomX,
    y: bubble.oriY + randomY,
    overwrite: true,
    onComplete: animateBubble,
    onCompleteParams: [bubble],
  });
}

/*!
 *
 * TOGGLE POP - This is the function that runs to toggle popup overlay
 *
 */
function togglePop(con) {
  confirmContainer.visible = con;
}

/*!
 *
 * DISPLAY PAGES - This is the function that runs to display pages
 *
 */
var curPage = "";

function goPage(page) {
  curPage = page;

  mainContainer.visible = false;
  gameContainer.visible = false;
  resultContainer.visible = false;

  var targetContainer = null;
  switch (page) {
    case "main":
      targetContainer = mainContainer;

      initAnimateBubble(itemMainBubble1, 20);
      initAnimateBubble(itemMainBubble2, 20);
      initAnimateBubble(itemMainBubble3, 20);
      initAnimateBubble(itemMainBubble4, 20);

      stopSoundLoop("musicGame");
      playSoundLoop("musicMain");
      setSoundVolume("musicMain", 0.8);
      break;

    case "game":
      targetContainer = gameContainer;
      stopSoundLoop("musicMain");
      playSoundLoop("musicGame");
      setSoundVolume("musicGame", 0.5);
      initAnimateBubble(itemTimerBubble, 10);
      initAnimateBubble(itemComboBubble, 10);
      startGame();
      break;

    case "result":
      targetContainer = resultContainer;
      stopGame();
      togglePop(false);

      stopSoundLoop("musicGame");
      playSound("soundResult");
      let multipler,
        amountWon,
        amountLost,
        amountPaid,
        gameResult = "WON";
      const score = playerData.score;
      if (score > 2500) {
        multipler = 50;
        amountWon = 50 * bet.betAmount;
        amountLost = 0;
        amountPaid = amountWon - amountWon * 0.015;
      } else if (score < 2500 && score > 2000) {
        multipler = 20;
        amountWon = 20 * bet.betAmount;
        amountLost = 0;
        amountPaid = amountWon - amountWon * 0.015;
      } else if (score < 2000 && score > 1750) {
        multipler = 10;
        amountWon = 10 * bet.betAmount;
        amountLost = 0;
        amountPaid = amountWon - amountWon * 0.015;
      } else if (score < 1750 && score > 1500) {
        multipler = 4;
        amountWon = 4 * bet.betAmount;
        amountLost = 0;
        amountPaid = amountWon - amountWon * 0.015;
      } else if (score < 1250 && score > 1000) {
        multipler = 2;
        amountWon = 2 * bet.betAmount;
        amountLost = 0;
        amountPaid = amountWon - amountWon * 0.015;
      } else if (score < 1000 && score > 900) {
        multipler = 1.5;
        amountWon = 1.5 * bet.betAmount;
        amountLost = 0;
        amountPaid = amountWon - amountWon * 0.015;
      } else if (score < 900 && score > 800) {
        multipler = 1.2;
        amountWon = 1.2 * bet.betAmount;
        amountLost = 0;
        amountPaid = amountWon - amountWon * 0.015;
      } else if (score < 800 && score > 700) {
        multipler = 1.1;
        amountWon = 1.1 * bet.betAmount;
        amountLost = 0;
        amountPaid = amountWon - amountWon * 0.015;
      } else if (score < 700 && score > 600) {
        multipler = 0.8;
        amountWon = 0.8 * bet.betAmount;
        amountLost = bet.betAmount - amountWon;
        amountPaid = amountWon - amountWon * 0.015;
        gameResult = "LOSS";
      } else {
        multipler = 0;
        amountWon = 0;
        amountLost = bet.betAmount;
        amountPaid = 0;
        gameResult = "LOSS";
      }
      bet = {
        ...bet,
        multipler,
        amountWon,
        amountLost,
        amountPaid,
        gameResult,
      };
      tweenData.tweenScore = 0;
      TweenMax.to(tweenData, 0.5, {
        tweenScore: playerData.score,
        overwrite: true,
        onUpdate: function () {
          resultDescTxt.text = textDisplay.resultDesc
            .replace("[NUMBER]", Math.floor(tweenData.tweenScore))
            .replace("[MULTIPLY]", multipler);
        },
      });

      saveGame(playerData.score);
      break;
  }

  if (targetContainer != null) {
    targetContainer.visible = true;
    targetContainer.alpha = 0;
    TweenMax.to(targetContainer, 0.5, {
      alpha: 1,
      overwrite: true,
    });
  }

  resizeCanvas();
}

/*!
 *
 * START GAME - This is the function that runs to start game
 *
 */
function startGame() {
  gameData.paused = false;
  gameData.stageNum = 1;
  gameData.particles = [];
  playerData.score = 0;

  tweenData.tweenScore = 0;
  statusTxt.text = "";

  timeData.oldTimer = -1;
  timeData.countdown = gameSettings.timer;
  timerTxt.text = timerRedTxt.text = millisecondsToTimeGame(timeData.countdown);
  timerRedTxt.alpha = 0;

  toggleGameTimer(true);

  comboContainer.alpha = 0;
  statusContainer.alpha = 0;
  buildCards();
}

/*!
 *
 * STOP GAME - This is the function that runs to stop play game
 *
 */
function stopGame() {
  particlesContainer.removeAllChildren();

  gameData.paused = true;
  TweenMax.killAll(false, true, false);
}

function saveGame(score) {
  if (typeof toggleScoreboardSave == "function") {
    $.scoreData.score = score;
    if (typeof type != "undefined") {
      $.scoreData.type = type;
    }
    toggleScoreboardSave(true);
  }
  axios.post(`${DB_URL}/api/memoryMaster`, {
    walletID: window.cryptoUtils.phantomWallet.wallet_pubkey,
    ...bet,
    scorePoints: score,
  });
}

/*!
 *
 * BUILD CARDS - This is the function that runs to build cards
 *
 */
function buildCards() {
  gameData.combo = 0;
  animateCombo(false);
  gameData.cardA = gameData.cardB = -1;
  gameData.flipping = false;
  gameData.match = 0;

  gameData.gameCardsArr = [];
  gameData.cardIndex = 0;
  shuffle(gameData.cardsArr);

  for (var n = 0; n < stageSettings[gameData.stageNum].match; n++) {
    gameData.gameCardsArr.push("A" + gameData.cardsArr[gameData.cardIndex]);
    gameData.gameCardsArr.push("B" + gameData.cardsArr[gameData.cardIndex]);

    gameData.cardIndex++;
    if (gameData.cardIndex > gameData.cardsArr.length - 1) {
      gameData.cardIndex = 0;
      shuffle(gameData.cardsArr);
    }
  }

  shuffle(gameData.gameCardsArr);
  cardsContainer.removeAllChildren();
  for (var n = 0; n < gameData.gameCardsArr.length; n++) {
    var currentArr = gameData.gameCardsArr[n];
    var currentCardSide = currentArr.substring(0, 1);
    var currentCardIndex = Number(currentArr.substring(1, currentArr.length));

    $.cards["card" + n] = new createjs.Bitmap(loader.getResult("itemCard"));
    $.cards["card_reveal" + n] = new createjs.Bitmap(
      loader.getResult("card" + currentCardSide + currentCardIndex)
    );
    $.cards["card_reveal" + n].scaleX = 0;

    $.cards["card" + n].id = n;
    $.cards["card" + n].cardIndex = currentCardIndex;
    $.cards["card_reveal" + n].cardIndex = currentCardIndex;
    $.cards["card" + n].isComplete = false;

    centerReg($.cards["card" + n]);
    centerReg($.cards["card_reveal" + n]);
    buildCardEvent($.cards["card" + n]);
    cardsContainer.addChild($.cards["card_reveal" + n], $.cards["card" + n]);
  }

  positionCards();

  for (var n = 0; n < gameData.gameCardsArr.length; n++) {
    $.cards["card" + n].scaleX = 0;
    $.cards["card_reveal" + n].scaleX = 0;
    TweenMax.to($.cards["card" + n], gameSettings.flipSpeed, {
      scaleX: gameData.scale,
      ease: Expo.easeOut,
      overwrite: true,
    });
  }

  playSound("soundShuffle");
}

function positionCards() {
  var positionData = {
    x: 0,
    y: 0,
    sX: 0,
    sY: 0,
    col: 0,
    width: 0,
    height: 0,
    totalCards: 0,
    totalCol: 0,
    totalRow: 0,
    totalWidth: 0,
    totalHeight: 0,
  };

  positionData.totalCards = gameData.gameCardsArr.length;
  if (viewport.isLandscape) {
    gameData.scale = stageSettings[gameData.stageNum].scale;
    gameData.margin = stageSettings[gameData.stageNum].margin;
    positionData.totalCol = stageSettings[gameData.stageNum].column;
  } else {
    gameData.scale = stageSettings[gameData.stageNum].portrait.scale;
    gameData.margin = stageSettings[gameData.stageNum].portrait.margin;
    positionData.totalCol = stageSettings[gameData.stageNum].portrait.column;
  }

  positionData.width = $.cards["card" + 0].image.naturalWidth * gameData.scale;
  positionData.height =
    $.cards["card" + 0].image.naturalHeight * gameData.scale;

  positionData.totalRow = positionData.totalCards / positionData.totalCol;
  positionData.totalWidth =
    (positionData.totalCol - 1) * (positionData.width + gameData.margin);
  positionData.totalHeight =
    (positionData.totalRow - 1) * (positionData.height + gameData.margin);
  positionData.sX = -(positionData.totalWidth / 2);
  positionData.sY = -(positionData.totalHeight / 2);

  positionData.x = positionData.sX;
  positionData.y = positionData.sY;

  for (var n = 0; n < gameData.gameCardsArr.length; n++) {
    $.cards["card" + n].x = positionData.x;
    $.cards["card" + n].y = positionData.y;

    if (!$.cards["card" + n].isComplete) {
      $.cards["card" + n].scaleX = $.cards["card" + n].scaleY = gameData.scale;
      $.cards["card_reveal" + n].scaleX = $.cards["card_reveal" + n].scaleY =
        gameData.scale;

      $.cards["card_reveal" + n].x = positionData.x;
      $.cards["card_reveal" + n].y = positionData.y;
    }

    positionData.x += positionData.width + gameData.margin;

    positionData.col++;
    if (positionData.col > positionData.totalCol - 1) {
      positionData.col = 0;
      positionData.x = positionData.sX;
      positionData.y += positionData.height + gameData.margin;
    }
  }
}

function buildCardEvent(card) {
  card.cursor = "pointer";
  card.addEventListener("click", function (evt) {
    if (gameData.paused) {
      return;
    }

    if (gameData.flipping) {
      return;
    }

    if (gameData.cardA == -1) {
      gameData.cardA = Number(evt.target.id);
    } else if (gameData.cardB == -1) {
      gameData.cardB = Number(evt.target.id);
    }
    flipCard(evt.target, $.cards["card_reveal" + evt.target.id], true);
  });
}

/*!
 *
 * FLIP CARDS - This is the function that runs to flip cards
 *
 */
function flipCard(cardA, cardB, toCheck) {
  playSound("soundFlipIn");

  gameData.flipping = true;
  cardB.scaleY = gameData.scale;
  cardB.scaleX = 0;
  TweenMax.to(cardA, gameSettings.flipSpeed, {
    scaleX: 0,
    ease: Expo.easeIn,
    overwrite: true,
  });
  TweenMax.to(cardB, gameSettings.flipSpeed, {
    delay: gameSettings.flipSpeed,
    scaleX: gameData.scale,
    ease: Expo.easeOut,
    overwrite: true,
    onComplete: function () {
      gameData.flipping = false;

      if (toCheck) {
        checkCards();
      }
    },
  });
}

/*!
 *
 * CHECK CARDS - This is the function that runs to check cards
 *
 */
function checkCards() {
  if (gameData.cardA != -1 && gameData.cardB != -1) {
    if (
      $.cards["card" + gameData.cardA].cardIndex ==
      $.cards["card" + gameData.cardB].cardIndex
    ) {
      $.cards["card" + gameData.cardA].isComplete = true;
      $.cards["card" + gameData.cardB].isComplete = true;

      gameData.match++;
      gameData.combo++;
      addScore();
      animateCombo(true);
      matchCard(
        $.cards["card_reveal" + gameData.cardA],
        $.cards["card_reveal" + gameData.cardB]
      );
    } else {
      playSound("soundFlipOut");
      checkComboScore();
      gameData.combo = 0;
      animateCombo(false);

      flipCard(
        $.cards["card_reveal" + gameData.cardA],
        $.cards["card" + gameData.cardA],
        false
      );
      flipCard(
        $.cards["card_reveal" + gameData.cardB],
        $.cards["card" + gameData.cardB],
        false
      );
    }

    gameData.cardA = -1;
    gameData.cardB = -1;
  }
}

/*!
 *
 * MATCH CARDS - This is the function that runs to match cards
 *
 */
function matchCard(cardA, cardB) {
  playSound("soundComplete");
  cardsContainer.setChildIndex(cardA, cardsContainer.numChildren - 1);
  cardsContainer.setChildIndex(cardB, cardsContainer.numChildren - 1);

  var centerPos = getCenterPosition(cardA.x, cardA.y, cardB.x, cardB.y);
  TweenMax.to(cardA, gameSettings.matchSpeed, {
    x: centerPos.x,
    y: centerPos.y,
    alpha: 0.5,
    overwrite: true,
  });
  TweenMax.to(cardB, gameSettings.matchSpeed, {
    x: centerPos.x,
    y: centerPos.y,
    alpha: 0.5,
    overwrite: true,
    onComplete: function () {
      matchCardFinal(cardA, cardB);
    },
  });
}

function matchCardFinal(cardA, cardB) {
  createParticles(cardA.cardIndex, cardA.x, cardA.y);
  TweenMax.to(cardA, gameSettings.matchAlphaSpeed, {
    alpha: 0,
    overwrite: true,
  });
  TweenMax.to(cardB, gameSettings.matchAlphaSpeed, {
    alpha: 0,
    overwrite: true,
    onComplete: function () {
      if (gameData.match == stageSettings[gameData.stageNum].match) {
        gameData.stageNum++;
        gameData.stageNum =
          gameData.stageNum > stageSettings.length - 1
            ? stageSettings.length - 1
            : gameData.stageNum;

        checkComboScore();
        buildCards();
      }
    },
  });
}

/*!
 *
 * PLAYER SCORE - This is the function that runs to add player score
 *
 */
function addScore() {
  playerData.score += gameSettings.score;
  animateScore();
}

function checkComboScore() {
  var calScore = 0;
  if (gameData.combo == 1) {
    calScore = 0;
  } else {
    calScore = gameSettings.score * gameData.combo;
  }

  playerData.score += calScore;

  animateScore();
}

/*!
 *
 * ANIMATE COMBO - This is the function that runs to animate combo
 *
 */
function animateCombo(con) {
  var alphaNum = 0;
  if (con) {
    alphaNum = 1;
    if (gameData.combo <= 1) {
      return;
    }

    comboTxt.text = "x" + gameData.combo;
    comboTxt.scaleX = comboTxt.scaleY = 0.5;
    TweenMax.to(comboTxt, 1, {
      scaleX: 1,
      scaleY: 1,
      ease: Elastic.easeOut,
      overwrite: true,
    });
  }
  TweenMax.to(comboContainer, 0.5, {
    alpha: alphaNum,
    overwrite: true,
  });
}

/*!
 *
 * ANIMATE STATUS - This is the function that runs to animate status
 *
 */
function animateScore() {
  if (gameData.paused) {
    return;
  }

  statusContainer.alpha = 1;
  TweenMax.to(tweenData, 0.5, {
    tweenScore: playerData.score,
    overwrite: true,
    onUpdate: function () {
      statusTxt.text = textDisplay.score.replace(
        "[NUMBER]",
        Math.floor(tweenData.tweenScore)
      );
    },
  });
}

function animateStatus() {
  statusTxt.text = textDisplay.timeUp;
  statusContainer.alpha = 0;
  TweenMax.to(statusContainer, 0.5, {
    alpha: 1,
    overwrite: true,
    onComplete: function () {
      TweenMax.to(statusContainer, 0.5, {
        delay: 2,
        alpha: 0,
        overwrite: true,
      });
    },
  });
}

/*!
 *
 * CREATE PARTICLES - This is the function that runs to create particles
 *
 */
function createParticles(index, x, y) {
  for (var n = 0; n < gravityData.total; n++) {
    gameData.particles.push(index);

    var currentIndex = gameData.particles.length - 1;
    $.particles[currentIndex] = new createjs.Bitmap(
      loader.getResult("particles" + index)
    );
    centerReg($.particles[currentIndex]);
    resetParticles(currentIndex, x, y);
    $.particles[currentIndex].active = true;

    particlesContainer.addChild($.particles[currentIndex]);
  }
}

function resetParticles(index, x, y) {
  $.particles[index].x = x;
  $.particles[index].y = y;

  $.particles[index].xspeed = randomIntFromInterval(-10, 10);
  $.particles[index].yspeed = randomIntFromInterval(-15, -25);

  $.particles[index].scaleX = $.particles[index].scaleY =
    randomIntFromInterval(5, 10) * 0.1;
  $.particles[index].alpha = randomIntFromInterval(6, 10) * 0.1;
}

function loopParticles() {
  for (var n = 0; n < gameData.particles.length; n++) {
    if ($.particles[n].active) {
      $.particles[n].y = $.particles[n].y + $.particles[n].yspeed;
      $.particles[n].x = $.particles[n].x + $.particles[n].xspeed;
      $.particles[n].rotation = $.particles[n].rotation + $.particles[n].xspeed;

      $.particles[n].yspeed =
        $.particles[n].yspeed * gravityData.drag + gravityData.gravity;
      $.particles[n].xspeed = $.particles[n].xspeed * gravityData.drag;

      if ($.particles[n].y > canvasH + gravityData.range * 2) {
        $.particles[n].active = false;
      }
    }
  }

  for (var n = 0; n < gameData.particles.length; n++) {
    if (!$.particles[n].active) {
      gameData.particles.splice(n, 1);
    }
  }
}

/*!
 *
 * GAME TIMER - This is the function that runs for game timer
 *
 */
function toggleGameTimer(con) {
  if (con) {
    timeData.startDate = new Date();
  } else {
  }
  timeData.enable = con;
}

/*!
 *
 * UPDATE GAME - This is the function that runs to loop game update
 *
 */
function updateGame() {
  if (!gameData.paused) {
    if (timeData.enable) {
      timeData.nowDate = new Date();
      timeData.elapsedTime = Math.floor(
        timeData.nowDate.getTime() - timeData.startDate.getTime()
      );
      timeData.timer = Math.floor(timeData.countdown - timeData.elapsedTime);

      if (timeData.oldTimer == -1) {
        timeData.oldTimer = timeData.timer;
      }

      if (timeData.timer <= 0) {
        //stop
        endGame();
      } else {
        if (timeData.oldTimer - timeData.timer > 1000) {
          if (timeData.timer < 1000) {
            animateTimer();
            playSound("soundCountdownEnd");
          } else if (timeData.timer < 6000) {
            animateTimer();
            playSound("soundCountdown");
          }
          timeData.oldTimer = timeData.timer;
        }

        timerTxt.text = timerRedTxt.text = millisecondsToTimeGame(
          timeData.timer
        );
      }
    }

    loopParticles();
  }
}

/*!
 *
 * ANIMATE TIMER - This is the function that runs to animate countdown
 *
 */
function animateTimer() {
  timerRedTxt.alpha = 0;
  TweenMax.to(timerRedTxt, 0.5, {
    alpha: 1,
    overwrite: true,
  });
}

/*!
 *
 * END GAME - This is the function that runs for game end
 *
 */
function endGame() {
  gameData.paused = true;

  checkComboScore();
  toggleGameTimer(false);
  animateStatus();

  TweenMax.to(gameContainer, 2.5, {
    overwrite: true,
    onComplete: function () {
      goPage("result");
    },
  });
}

/*!
 *
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 *
 */
function millisecondsToTimeGame(milli) {
  var milliseconds = milli % 1000;
  var seconds = Math.floor((milli / 1000) % 60);
  var minutes = Math.floor((milli / (60 * 1000)) % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}

/*!
 *
 * OPTIONS - This is the function that runs to toggle options
 *
 */

function toggleOption() {
  if (optionsContainer.visible) {
    optionsContainer.visible = false;
  } else {
    optionsContainer.visible = true;
  }
}

/*!
 *
 * OPTIONS - This is the function that runs to toggle Instructions
 *
 */

function toggleInstructions() {
  if (instructionsPop.visible) {
    instructionsPop.visible = false;
    instructionsExit.visible = false;
    buttonStart.visible = true;
    logo.visible = true;
    bg.alpha = 1;
  } else {
    instructionsPop.visible = true;
    instructionsExit.visible = true;
    buttonStart.visible = false;
    logo.visible = false;
    bg.alpha = 0.3;
  }
}

/*!
 *
 * OPTIONS - This is the function that runs to mute and fullscreen
 *
 */
function toggleGameMute(con) {
  buttonSoundOff.visible = false;
  buttonSoundOn.visible = false;
  toggleMute(con);
  if (con) {
    buttonSoundOn.visible = true;
  } else {
    buttonSoundOff.visible = true;
  }
}

function toggleFullScreen() {
  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/*!
 *
 * SHARE - This is the function that runs to open share url
 *
 */
function share(action) {
  gtag("event", "click", {
    event_category: "share",
    event_label: action,
  });

  var loc = location.href;
  loc = loc.substring(0, loc.lastIndexOf("/") + 1);

  var title = "";
  var text = "";

  title = shareTitle.replace("[SCORE]", playerData.score);
  text = shareMessage.replace("[SCORE]", playerData.score);

  var shareurl = "";

  if (action == "twitter") {
    shareurl = "https://twitter.com/intent/tweet?url=" + loc + "&text=" + text;
  } else if (action == "facebook") {
    shareurl =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(
        loc +
          "share.php?desc=" +
          text +
          "&title=" +
          title +
          "&url=" +
          loc +
          "&thumb=" +
          loc +
          "share.jpg&width=590&height=300"
      );
  } else if (action == "google") {
    shareurl = "https://plus.google.com/share?url=" + loc;
  } else if (action == "whatsapp") {
    shareurl =
      "whatsapp://send?text=" +
      encodeURIComponent(text) +
      " - " +
      encodeURIComponent(loc);
  }

  window.open(shareurl);
}
