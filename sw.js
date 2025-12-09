/* sw.js - 根目录 */
const CACHE_NAME = 'mathbook-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/js/init.js',
  './assets/js/config.js',
  './assets/js/theme.js',
  './assets/js/chapterAPI.js',
  './assets/js/renderer.js',
  './assets/js/toc.js',
  './assets/js/mathJaxConfig.js',
  './chapters/chapter01.js',
  './chapters/chapter02.js'
  // 注意：CDN 资源通常有跨域缓存策略，这里主要缓存本地核心代码
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});