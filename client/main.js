$.getScript("https://cdn.tiny.cloud/1/uxh471978q9jgw7y107j4cuzopr9tsqh5ytfj1ajjhywc89m/tinymce/5/tinymce.min.js");

//$.getScript("https://cdn.tiny.cloud/1/uxh471978q9jgw7y107j4cuzopr9tsqh5ytfj1ajjhywc89m/tinymce/5/jquery.tinymce.min.js");
Meteor.startup(function () {
  //$.getScript("https://cdn.tiny.cloud/1/uxh471978q9jgw7y107j4cuzopr9tsqh5ytfj1ajjhywc89m/tinymce/5/tinymce.min.js");
  console.log(location);
  if ( location.host !== 'localhost:8000' ) {
    if (location.origin !== 'https://www.myclassgame.es') {
        location.href = 'https://www.myclassgame.es/';
        //location.href = 'https://www.myclassgame.tk/';
        // loc=location.href;
        // if (loc.includes('myclassgame.tk')) {
        //     location.href = 'https://www.myclassgame.tk/';
        // }
        // if (loc.includes('mcgdeploy.tk')) {
        //     location.href = 'https://www.mcgdeploy.tk/';
        // }
    }
  }
  // This is the "Offline page" service worker

  $.getScript('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

  const CACHE = "pwabuilder-page";

  // TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
  const offlineFallbackPage = "/privacy/privacidad.html";

  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });

  self.addEventListener('install', async (event) => {
    event.waitUntil(
      caches.open(CACHE)
        .then((cache) => cache.add(offlineFallbackPage))
    );
  });

  if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
  }

  self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
      event.respondWith((async () => {
        try {
          const preloadResp = await event.preloadResponse;

          if (preloadResp) {
            return preloadResp;
          }

          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (error) {

          const cache = await caches.open(CACHE);
          const cachedResp = await cache.match(offlineFallbackPage);
          return cachedResp;
        }
      })());
    }
  });

  $.getScript('https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate');

  const el = document.createElement('pwa-update');
  document.body.appendChild(el);

});
