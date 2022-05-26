////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage;
var canvasW = 0;
var canvasH = 0;

/*!
 *
 * START GAME CANVAS - This is the function that runs to setup game canvas
 *
 */
function initGameCanvas(w, h) {
  var gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.width = w;
  gameCanvas.height = h;

  canvasW = w;
  canvasH = h;
  stage = new createjs.Stage("gameCanvas");

  createjs.Touch.enable(stage);
  stage.enableMouseOver(20);
  stage.mouseMoveOutside = true;

  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener("tick", tick);
}

var guide = false;
var canvasContainer,
  mainContainer,
  gameContainer,
  instructionContainer,
  resultContainer,
  moveContainer,
  confirmContainer,
  timerContainer,
  comboContainer,
  instructions,
  instructionsPop,
  instructionsExit;
var guideline,
  bg,
  logo,
  buttonOk,
  result,
  shadowResult,
  buttonReplay,
  buttonFacebook,
  buttonTwitter,
  buttonWhatsapp,
  buttonFullscreen,
  buttonSoundOn,
  buttonSoundOff,
  eee;

$.cards = {};
$.particles = {};

/*!
 *
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 *
 */
function buildGameCanvas() {
  canvasContainer = new createjs.Container();
  mainContainer = new createjs.Container();
  gameContainer = new createjs.Container();
  timerContainer = new createjs.Container();
  comboContainer = new createjs.Container();
  statusContainer = new createjs.Container();
  cardsContainer = new createjs.Container();
  particlesContainer = new createjs.Container();
  resultContainer = new createjs.Container();
  confirmContainer = new createjs.Container();

  bg = new createjs.Bitmap(loader.getResult("background"));
  bgP = new createjs.Bitmap(loader.getResult("backgroundP"));

  logo = new createjs.Bitmap(loader.getResult("logo"));
  eee = new createjs.Bitmap(loader.getResult("eee"));
  logoP = new createjs.Bitmap(loader.getResult("logoP"));
  buttonStart = new createjs.Bitmap(loader.getResult("buttonStart"));
  instructions = new createjs.Bitmap(loader.getResult("instructions"));
  instructionsPop = new createjs.Bitmap(loader.getResult("instructionsPop"));
  instructionsExit = new createjs.Bitmap(loader.getResult("instructionsExit"));

  centerReg(buttonStart);

  logo.x = canvasW / 4;
  logo.y = canvasH / 5;
  eee.x = 20;
  eee.y = 20;
  instructions.x = 20;
  instructions.y = (canvasH / 100) * 80;

  instructionsPop.x = canvasW / 4;
  instructionsPop.y = canvasH / 5;
  instructionsExit.x = (canvasW / 100) * 59;
  instructionsExit.y = (canvasH / 100) * 28;
  instructionsPop.visible = false;
  instructionsExit.visible = false;

  itemMainBubble1 = new createjs.Bitmap(loader.getResult("itemBubble"));
  centerReg(itemMainBubble1);
  itemMainBubble2 = new createjs.Bitmap(loader.getResult("itemBubble"));
  centerReg(itemMainBubble2);
  itemMainBubble3 = new createjs.Bitmap(loader.getResult("itemBubble"));
  centerReg(itemMainBubble3);
  itemMainBubble4 = new createjs.Bitmap(loader.getResult("itemBubble"));
  centerReg(itemMainBubble4);

  //game
  itemTimerBubble = new createjs.Bitmap(loader.getResult("itemBubble"));
  centerReg(itemTimerBubble);
  itemTimerBubble.scaleX = itemTimerBubble.scaleY = 0.7;

  timerTxt = new createjs.Text();
  timerTxt.font = "45px wild_rideregular";
  timerTxt.color = "#fff";
  timerTxt.textAlign = "center";
  timerTxt.textBaseline = "alphabetic";
  timerTxt.text = "00:00";
  timerTxt.y = 20;

  timerRedTxt = new createjs.Text();
  timerRedTxt.font = "45px wild_rideregular";
  timerRedTxt.color = "#B70000";
  timerRedTxt.textAlign = "center";
  timerRedTxt.textBaseline = "alphabetic";
  timerRedTxt.text = "00:00";
  timerRedTxt.x = timerTxt.x;
  timerRedTxt.y = timerTxt.y;

  timerContainer.addChild(itemTimerBubble, timerTxt, timerRedTxt);

  itemComboBubble = new createjs.Bitmap(loader.getResult("itemBubble"));
  centerReg(itemComboBubble);

  comboTxt = new createjs.Text();
  comboTxt.font = "110px wild_rideregular";
  comboTxt.color = "#fff";
  comboTxt.textAlign = "center";
  comboTxt.textBaseline = "alphabetic";
  comboTxt.text = "x2";
  comboTxt.y = 20;

  comboContainer.addChild(itemComboBubble, comboTxt);

  statusTxt = new createjs.Text();
  statusTxt.font = "80px wild_rideregular";
  statusTxt.color = "#0059B2";
  statusTxt.textAlign = "center";
  statusTxt.textBaseline = "alphabetic";
  statusTxt.text = textDisplay.timeUp;

  statusContainer.addChild(statusTxt);

  //result
  itemResult = new createjs.Bitmap(loader.getResult("itemPop"));

  // itemResult.x = (canvasW / 100) * 28;
  // itemResult.y = (canvasH / 100) * 15;
  itemResultP = new createjs.Bitmap(loader.getResult("itemPopP"));

  buttonContinue = new createjs.Bitmap(loader.getResult("buttonContinue"));
  centerReg(buttonContinue);

  resultShareTxt = new createjs.Text();
  resultShareTxt.font = "60px wild_rideregular";
  resultShareTxt.color = "#0059B2";
  resultShareTxt.textAlign = "center";
  resultShareTxt.textBaseline = "alphabetic";
  resultShareTxt.text = textDisplay.share;

  resultTitleTxt = new createjs.Text();
  resultTitleTxt.font = "130px wild_rideregular";
  resultTitleTxt.color = "#0059B2";
  resultTitleTxt.textAlign = "center";
  resultTitleTxt.textBaseline = "alphabetic";
  resultTitleTxt.text = textDisplay.resultTitle;

  resultDescTxt = new createjs.Text();
  resultDescTxt.font = "90px wild_rideregular";
  resultDescTxt.lineHeight = 35;
  resultDescTxt.color = "#157DBC";
  resultDescTxt.textAlign = "center";
  resultDescTxt.textBaseline = "alphabetic";
  resultDescTxt.text = "";

  buttonFacebook = new createjs.Bitmap(loader.getResult("buttonFacebook"));
  buttonTwitter = new createjs.Bitmap(loader.getResult("buttonTwitter"));
  buttonWhatsapp = new createjs.Bitmap(loader.getResult("buttonWhatsapp"));
  centerReg(buttonFacebook);
  createHitarea(buttonFacebook);
  centerReg(buttonTwitter);
  createHitarea(buttonTwitter);
  centerReg(buttonWhatsapp);
  createHitarea(buttonWhatsapp);

  buttonFullscreen = new createjs.Bitmap(loader.getResult("buttonFullscreen"));
  centerReg(buttonFullscreen);
  buttonSoundOn = new createjs.Bitmap(loader.getResult("buttonSoundOn"));
  centerReg(buttonSoundOn);
  buttonSoundOff = new createjs.Bitmap(loader.getResult("buttonSoundOff"));
  centerReg(buttonSoundOff);
  buttonSoundOn.visible = false;

  buttonExit = new createjs.Bitmap(loader.getResult("buttonExit"));
  centerReg(buttonExit);
  buttonSettings = new createjs.Bitmap(loader.getResult("buttonSettings"));
  centerReg(buttonSettings);

  createHitarea(buttonFullscreen);
  createHitarea(buttonSoundOn);
  createHitarea(buttonSoundOff);
  createHitarea(buttonExit);
  createHitarea(buttonSettings);
  optionsContainer = new createjs.Container();
  optionsContainer.addChild(
    buttonFullscreen,
    buttonSoundOn,
    buttonSoundOff,
    buttonExit
  );
  optionsContainer.visible = false;

  //exit
  itemExit = new createjs.Bitmap(loader.getResult("itemPop"));
  itemExitP = new createjs.Bitmap(loader.getResult("itemPopP"));

  buttonConfirm = new createjs.Bitmap(loader.getResult("buttonConfirm"));
  centerReg(buttonConfirm);

  buttonCancel = new createjs.Bitmap(loader.getResult("buttonCancel"));
  centerReg(buttonCancel);

  popTitleTxt = new createjs.Text();
  popTitleTxt.font = "130px wild_rideregular";
  popTitleTxt.color = "#0059B2";
  popTitleTxt.textAlign = "center";
  popTitleTxt.textBaseline = "alphabetic";
  popTitleTxt.text = textDisplay.exitTitle;

  popDescTxt = new createjs.Text();
  popDescTxt.font = "70px wild_rideregular";
  popDescTxt.lineHeight = 40;
  popDescTxt.color = "#0059B2";
  popDescTxt.textAlign = "center";
  popDescTxt.textBaseline = "alphabetic";
  popDescTxt.text = textDisplay.exitMessage;

  confirmContainer.addChild(
    itemExit,
    itemExitP,
    popTitleTxt,
    popDescTxt,
    buttonConfirm,
    buttonCancel
  );
  confirmContainer.visible = false;

  if (guide) {
    guideline = new createjs.Shape();
    guideline.graphics
      .setStrokeStyle(2)
      .beginStroke("red")
      .drawRect(
        (stageW - contentW) / 2,
        (stageH - contentH) / 2,
        contentW,
        contentH
      );
  }

  mainContainer.addChild(
    eee,
    logo,
    logoP,
    instructions,
    instructionsPop,
    instructionsExit,
    itemMainBubble1,
    itemMainBubble2,
    itemMainBubble3,
    itemMainBubble4,
    buttonStart
  );
  gameContainer.addChild(
    cardsContainer,
    timerContainer,
    comboContainer,
    particlesContainer,
    statusContainer
  );
  resultContainer.addChild(
    itemResult,
    itemResultP,
    buttonContinue,
    resultTitleTxt,
    resultDescTxt
  );

  if (shareEnable) {
    resultContainer.addChild(
      resultShareTxt,
      buttonFacebook,
      buttonTwitter,
      buttonWhatsapp
    );
  }

  canvasContainer.addChild(
    bg,
    bgP,
    mainContainer,
    gameContainer,
    resultContainer,
    confirmContainer,
    optionsContainer,
    buttonSettings,
    guideline
  );
  stage.addChild(canvasContainer);

  changeViewport(viewport.isLandscape);
  resizeGameFunc();
}

function changeViewport(isLandscape) {
  if (isLandscape) {
    //landscape
    stageW = landscapeSize.w;
    stageH = landscapeSize.h;
    contentW = landscapeSize.cW;
    contentH = landscapeSize.cH;
  } else {
    //portrait
    stageW = portraitSize.w;
    stageH = portraitSize.h;
    contentW = portraitSize.cW;
    contentH = portraitSize.cH;
  }

  gameCanvas.width = stageW;
  gameCanvas.height = stageH;

  canvasW = stageW;
  canvasH = stageH;

  changeCanvasViewport();
}

function changeCanvasViewport() {
  if (canvasContainer != undefined) {
    cardsContainer.x = canvasW / 2;
    cardsContainer.y = canvasH / 2;

    particlesContainer.x = canvasW / 2;
    particlesContainer.y = canvasH / 2;

    if (viewport.isLandscape) {
      bg.visible = true;
      bgP.visible = false;

      logo.visible = true;
      logoP.visible = false;

      buttonStart.x = canvasW / 2;
      buttonStart.y = (canvasH / 100) * 80;

      itemMainBubble1.x = (canvasW / 100) * 80;
      itemMainBubble1.y = (canvasH / 100) * 70;

      itemMainBubble2.x = (canvasW / 100) * 85;
      itemMainBubble2.y = (canvasH / 100) * 65;
      itemMainBubble2.scaleX = itemMainBubble2.scaleY = 0.5;

      itemMainBubble3.x = (canvasW / 100) * 15;
      itemMainBubble3.y = (canvasH / 100) * 55;
      itemMainBubble3.scaleX = itemMainBubble3.scaleY = 0.7;

      itemMainBubble4.x = (canvasW / 100) * 75;
      itemMainBubble4.y = (canvasH / 100) * 25;
      itemMainBubble4.scaleX = itemMainBubble4.scaleY = 0.3;

      //result
      itemResult.visible = true;
      itemResultP.visible = false;

      buttonFacebook.x = (canvasW / 100) * 43;
      buttonFacebook.y = (canvasH / 100) * 60;
      buttonTwitter.x = canvasW / 2;
      buttonTwitter.y = (canvasH / 100) * 60;
      buttonWhatsapp.x = (canvasW / 100) * 57;
      buttonWhatsapp.y = (canvasH / 100) * 60;

      buttonContinue.x = canvasW / 2;
      buttonContinue.y = (canvasH / 100) * 60;

      resultShareTxt.x = canvasW / 2;
      resultShareTxt.y = (canvasH / 100) * 54;

      resultTitleTxt.x = canvasW / 2;
      resultTitleTxt.y = (canvasH / 100) * 39;

      resultDescTxt.x = canvasW / 2;
      resultDescTxt.y = (canvasH / 100) * 47;

      //exit
      itemExit.visible = true;
      itemExitP.visible = false;

      buttonConfirm.x = canvasW / 2 - 60;
      buttonConfirm.y = (canvasH / 100) * 70;

      buttonCancel.x = canvasW / 2 + 60;
      buttonCancel.y = (canvasH / 100) * 70;

      popTitleTxt.x = canvasW / 2;
      popTitleTxt.y = (canvasH / 100) * 39;

      popDescTxt.x = canvasW / 2;
      popDescTxt.y = (canvasH / 100) * 52;
    } else {
      bg.visible = false;
      bgP.visible = true;

      logo.visible = false;
      logoP.visible = true;

      buttonStart.x = canvasW / 2;
      buttonStart.y = (canvasH / 100) * 68;

      itemMainBubble1.x = (canvasW / 100) * 80;
      itemMainBubble1.y = (canvasH / 100) * 70;

      itemMainBubble2.x = (canvasW / 100) * 85;
      itemMainBubble2.y = (canvasH / 100) * 65;
      itemMainBubble2.scaleX = itemMainBubble2.scaleY = 0.5;

      itemMainBubble3.x = (canvasW / 100) * 15;
      itemMainBubble3.y = (canvasH / 100) * 55;
      itemMainBubble3.scaleX = itemMainBubble3.scaleY = 0.7;

      itemMainBubble4.x = (canvasW / 100) * 75;
      itemMainBubble4.y = (canvasH / 100) * 25;
      itemMainBubble4.scaleX = itemMainBubble4.scaleY = 0.3;

      //result
      itemResult.visible = false;
      itemResultP.visible = true;

      buttonFacebook.x = (canvasW / 100) * 39;
      buttonFacebook.y = (canvasH / 100) * 58;
      buttonTwitter.x = canvasW / 2;
      buttonTwitter.y = (canvasH / 100) * 58;
      buttonWhatsapp.x = (canvasW / 100) * 61;
      buttonWhatsapp.y = (canvasH / 100) * 58;

      buttonContinue.x = canvasW / 2;
      buttonContinue.y = (canvasH / 100) * 67;

      resultShareTxt.x = canvasW / 2;
      resultShareTxt.y = (canvasH / 100) * 52;

      resultTitleTxt.x = canvasW / 2;
      resultTitleTxt.y = (canvasH / 100) * 39;

      resultDescTxt.x = canvasW / 2;
      resultDescTxt.y = (canvasH / 100) * 46;

      //exit
      itemExit.visible = false;
      itemExitP.visible = true;

      buttonConfirm.x = canvasW / 2 - 60;
      buttonConfirm.y = (canvasH / 100) * 62;

      buttonCancel.x = canvasW / 2 + 60;
      buttonCancel.y = (canvasH / 100) * 62;

      popTitleTxt.x = canvasW / 2;
      popTitleTxt.y = (canvasH / 100) * 39;

      popDescTxt.x = canvasW / 2;
      popDescTxt.y = (canvasH / 100) * 48;
    }

    initAnimateBubble(itemMainBubble1, 20);
    initAnimateBubble(itemMainBubble2, 20);
    initAnimateBubble(itemMainBubble3, 20);
    initAnimateBubble(itemMainBubble4, 20);

    if (curPage == "game") {
      positionCards();
    }
  }
}

/*!
 *
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 *
 */
function resizeCanvas() {
  if (canvasContainer != undefined) {
    buttonSettings.x = canvasW - offset.x - 50;
    buttonSettings.y = offset.y + 45;

    var distanceNum = 60;
    if (curPage != "game") {
      buttonExit.visible = false;
      buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;
      buttonSoundOn.x = buttonSoundOff.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;

      buttonFullscreen.x = buttonSettings.x;
      buttonFullscreen.y = buttonSettings.y + distanceNum * 2;
    } else {
      buttonExit.visible = true;
      buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;
      buttonSoundOn.x = buttonSoundOff.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;

      buttonFullscreen.x = buttonSettings.x;
      buttonFullscreen.y = buttonSettings.y + distanceNum * 2;

      buttonExit.x = buttonSettings.x;
      buttonExit.y = buttonSettings.y + distanceNum * 3;

      timerContainer.x = offset.x + 70;
      timerContainer.y = offset.y + 60;

      comboContainer.x = canvasW - offset.x - 110;
      comboContainer.y = canvasH - offset.y - 110;

      statusContainer.x = canvasW / 2;
      statusContainer.y = offset.y + 70;
    }
  }
}

/*!
 *
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 *
 */
function removeGameCanvas() {
  stage.autoClear = true;
  stage.removeAllChildren();
  stage.update();
  createjs.Ticker.removeEventListener("tick", tick);
  createjs.Ticker.removeEventListener("tick", stage);
}

/*!
 *
 * CANVAS LOOP - This is the function that runs for canvas loop
 *
 */
function tick(event) {
  updateGame();
  stage.update(event);
}

/*!
 *
 * CANVAS MISC FUNCTIONS
 *
 */
function centerReg(obj) {
  obj.regX = obj.image.naturalWidth / 2;
  obj.regY = obj.image.naturalHeight / 2;
}

function createHitarea(obj) {
  obj.hitArea = new createjs.Shape(
    new createjs.Graphics()
      .beginFill("#000")
      .drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight)
  );
}
