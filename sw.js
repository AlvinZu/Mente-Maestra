const CACHE_NAME = 'mente-maestra-cache-v1';
// Lista de todos los archivos que tu app necesita para funcionar offline.
const urlsToCache = [
    '/',
    'index.html',
    'manifest.json',
    'Icon-Mente-Maestra.png',
    'Icon-Mente-Maestra-500x500.png',
    // Recursos externos (Scripts y Fuentes)
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://unpkg.com/lucide@latest',
    // Paisajes Sonoros ( crucial para el Santuario offline )
    'https://www.soundjay.com/nature/rain-01.mp3',
    'https://www.soundjay.com/nature/ocean-wave-1.mp3',
    'https://cdn.pixabay.com/audio/2022/03/15/audio_5463b22b17.mp3',
    'https://cdn.pixabay.com/audio/2022/10/20/audio_2903333c1c.mp3',
    'https://cdn.pixabay.com/audio/2023/10/01/audio_51c6c97a8e.mp3'
];

// Evento de instalación: se abre el caché y se guardan los recursos.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de "fetch": intercepta las peticiones de la app.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el recurso está en el caché, lo sirve desde ahí.
                if (response) {
                    return response;
                }
                // Si no, intenta buscarlo en la red.
                return fetch(event.request);
            }
        )
    );
});
