const CACHE_NAME = 'sbe-web-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './firebase-config.js',
    './360_F_204812227_fVnI2OTNSY7FYF5ZaFU5kuZjNst0kpBF-removebg-preview.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        }).catch(() => {
            // Fallback for offline if not in cache
            return caches.match('./index.html');
        })
    );
});
