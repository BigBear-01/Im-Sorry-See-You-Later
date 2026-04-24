/* ============================================================
   LANDING PAGE — password gate + background music
   ============================================================ */

(function () {
  'use strict';

  /* ── Config ── */
  var PASSWORD    = 'mylilbat';
  var MUSIC_URL   = 'https://cdn.pixabay.com/audio/2024/02/15/audio_b0e26e74e0.mp3';
  var MUSIC_VOL   = 0.8;
  var FADE_OUT_MS = 950;

  /* ── Elements (resolved after DOM ready) ── */
  var landing, pwInput, errMsg, musicToggle, bgm;

  /* ──────────────────────────────────────────
     Password check
  ────────────────────────────────────────── */
  function checkPw() {
    if (pwInput.value === PASSWORD) {
      unlockSite();
    } else {
      showError();
    }
  }

  function unlockSite() {
    /* 1. Fade out landing overlay */
    landing.classList.add('hide');
    setTimeout(function () {
      landing.style.display = 'none';
    }, FADE_OUT_MS);

    /* 2. Start music */
    startMusic();

    /* 3. Show music toggle button */
    musicToggle.style.display = 'block';
  }

  function showError() {
    errMsg.classList.add('show');
    pwInput.style.borderBottomColor = '#c9826a';

    setTimeout(function () {
      errMsg.classList.remove('show');
      pwInput.style.borderBottomColor = '';
    }, 2600);
  }

  /* ──────────────────────────────────────────
     Background music
  ────────────────────────────────────────── */
  function startMusic() {
    bgm.volume = MUSIC_VOL;
    bgm.loop   = true;
    bgm.play().catch(function () {
      /* autoplay blocked — user can resume via toggle button */
    });
  }

  function toggleMusic() {
    if (bgm.paused) {
      bgm.play();
      musicToggle.innerHTML = '&#9835; pause';
    } else {
      bgm.pause();
      musicToggle.innerHTML = '&#9835; play';
    }
  }

  /* ──────────────────────────────────────────
     Landing page floating petals
  ────────────────────────────────────────── */
  function spawnPetals() {
    var wrap    = document.getElementById('lp-petals');
    var symbols = ['✿', '❀', '✾', '❁'];

    for (var i = 0; i < 16; i++) {
      var p = document.createElement('div');
      p.className   = 'petal';
      p.textContent = symbols[i % 4];

      p.style.left              = (Math.random() * 100) + 'vw';
      p.style.animationDuration = (9 + Math.random() * 13) + 's';
      p.style.animationDelay    = (Math.random() * 12) + 's';
      p.style.fontSize          = (0.55 + Math.random() * 0.75) + 'rem';
      p.style.color             = 'hsl(' + (8 + Math.random() * 22) + ',58%,' + (68 + Math.random() * 16) + '%)';

      wrap.appendChild(p);
    }
  }

  /* ──────────────────────────────────────────
     Init (runs after DOM is ready)
  ────────────────────────────────────────── */
  function init() {
    landing      = document.getElementById('landing');
    pwInput      = document.getElementById('lp-pw');
    errMsg       = document.getElementById('lp-err');
    musicToggle  = document.getElementById('music-toggle');
    bgm          = document.getElementById('bgm');

    /* Wire up enter key on input */
    pwInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') checkPw();
    });

    /* Wire up unlock button */
    document.getElementById('lp-unlock-btn')
      .addEventListener('click', checkPw);

    /* Wire up music toggle */
    musicToggle.addEventListener('click', toggleMusic);

    /* Spawn landing petals */
    spawnPetals();
  }

  /* Expose checkPw globally for inline onclick fallback */
  window.checkPw     = checkPw;
  window.toggleMusic = toggleMusic;

  /* Boot */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();