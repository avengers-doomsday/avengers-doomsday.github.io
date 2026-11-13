// Doomsday Countdown: live timer to Dec 18, 2026 (viewer's local midnight) + click-to-play official trailer.
(function () {
  var clock = document.getElementById("clock");
  if (clock) {
    var target = new Date(clock.dataset.target).getTime(); // no zone in the string = viewer's local time
    var cells = {};
    clock.querySelectorAll("[data-u]").forEach(function (b) { cells[b.dataset.u] = b; });
    var pad = function (n) { return n < 10 ? "0" + n : String(n); };
    var tick = function () {
      var left = Math.max(0, target - Date.now());
      var s = Math.floor(left / 1000);
      cells.d.textContent = Math.floor(s / 86400);
      cells.h.textContent = pad(Math.floor((s % 86400) / 3600));
      cells.m.textContent = pad(Math.floor((s % 3600) / 60));
      cells.s.textContent = pad(s % 60);
      if (!left) { document.getElementById("done").hidden = false; return; }
      setTimeout(tick, 1000 - (Date.now() % 1000));
    };
    tick();
  }
  document.querySelectorAll(".yt[data-yt]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + btn.dataset.yt + "?autoplay=1&rel=0";
      f.title = "Avengers: Doomsday official trailer";
      f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      btn.replaceChildren(f);
    }, { once: true });
  });
  // Ad slots (data-slot="hero" / "mid") stay empty until Adsterra zones for this site are added in ads.js.
})();
