////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

/*!
 *
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 *
 */
function initPreload() {
  toggleLoader(true);

  checkMobileEvent();

  $(window).resize(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkMobileOrientation, 1000);
  });
  resizeGameFunc();

  loader = new createjs.LoadQueue(false);
  manifest = [
    { src: "assets/background.png", id: "background" },
    { src: "assets/background_p.png", id: "backgroundP" },
    { src: "assets/logo.png", id: "logo" },
    { src: "assets/eee.png", id: "eee" },
    { src: "assets/logo_p.png", id: "logoP" },
    { src: "assets/button_start.png", id: "buttonStart" },

    { src: "assets/instructions.png", id: "instructions" },
    { src: "assets/item_pop1.png", id: "instructionsPop" },
    { src: "assets/instruction_exit.png", id: "instructionsExit" },

    { src: "assets/item_card.png", id: "itemCard" },
    { src: "assets/item_bubble.png", id: "itemBubble" },

    { src: "assets/button_facebook.png", id: "buttonFacebook" },
    { src: "assets/button_twitter.png", id: "buttonTwitter" },
    { src: "assets/button_whatsapp.png", id: "buttonWhatsapp" },
    { src: "assets/button_continue.png", id: "buttonContinue" },
    { src: "assets/item_pop.png", id: "itemPop" },
    { src: "assets/item_pop_p.png", id: "itemPopP" },
    { src: "assets/button_confirm.png", id: "buttonConfirm" },
    { src: "assets/button_cancel.png", id: "buttonCancel" },
    { src: "assets/button_fullscreen.png", id: "buttonFullscreen" },
    { src: "assets/button_sound_on.png", id: "buttonSoundOn" },
    { src: "assets/button_sound_off.png", id: "buttonSoundOff" },
    { src: "assets/button_exit.png", id: "buttonExit" },
    { src: "assets/button_settings.png", id: "buttonSettings" },
  ];

  for (var n = 0; n < cards_arr.length; n++) {
    manifest.push({ src: cards_arr[n].srcA, id: "cardA" + n });
    manifest.push({ src: cards_arr[n].srcB, id: "cardB" + n });
    manifest.push({ src: cards_arr[n].particles, id: "particles" + n });
  }

  if (typeof addScoreboardAssets == "function") {
    addScoreboardAssets();
  }

  soundOn = true;
  if ($.browser.mobile || isTablet) {
    if (!enableMobileSound) {
      soundOn = false;
    }
  }

  if (soundOn) {
    manifest.push({ src: "assets/sounds/sound_click.ogg", id: "soundButton" });
    manifest.push({
      src: "assets/sounds/sound_complete.ogg",
      id: "soundComplete",
    });
    manifest.push({
      src: "assets/sounds/sound_flip_in.ogg",
      id: "soundFlipIn",
    });
    manifest.push({
      src: "assets/sounds/sound_flip_out.ogg",
      id: "soundFlipOut",
    });
    manifest.push({ src: "assets/sounds/sound_result.ogg", id: "soundResult" });
    manifest.push({
      src: "assets/sounds/sound_shuffle.ogg",
      id: "soundShuffle",
    });
    manifest.push({
      src: "assets/sounds/sound_timer.ogg",
      id: "soundCountdown",
    });
    manifest.push({
      src: "assets/sounds/sound_timer_end.ogg",
      id: "soundCountdownEnd",
    });
    manifest.push({ src: "assets/sounds/music_main.ogg", id: "musicMain" });
    manifest.push({ src: "assets/sounds/music_game.ogg", id: "musicGame" });

    createjs.Sound.alternateExtensions = ["mp3"];
    loader.installPlugin(createjs.Sound);
  }

  loader.addEventListener("complete", handleComplete);
  loader.addEventListener("fileload", fileComplete);
  loader.addEventListener("error", handleFileError);
  loader.on("progress", handleProgress, this);
  loader.loadManifest(manifest);
}

/*!
 *
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 *
 */
function fileComplete(evt) {
  var item = evt.item;
  //console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 *
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 *
 */
function handleFileError(evt) {
  console.log("error ", evt);
}

/*!
 *
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 *
 */
function handleProgress() {
  $("#mainLoader span").html(Math.round((loader.progress / 1) * 100) + "%");
}

/*!
 *
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 *
 */
function handleComplete() {
  toggleLoader(false);
  initMain();
}

/*!
 *
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 *
 */
function toggleLoader(con) {
  if (con) {
    $("#mainLoader").show();
  } else {
    $("#mainLoader").hide();
  }
}
